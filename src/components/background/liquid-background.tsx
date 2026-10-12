"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-viewport lava lamp: six blobs of coloured "wax" rise and sink through a
 * metaball field, stretching as they move and merging when they meet, rendered
 * by a single-triangle WebGL pass.
 *
 * Performance budget:
 *  - renders at ~0.5× device pixels (the field is smooth, so this is invisible)
 *  - capped at 30 fps in the hero and 20 fps once scrolled past it
 *  - pauses when the tab is hidden; draws one static frame for reduced-motion
 *    or data-saver users; falls back to CSS blobs without WebGL
 *  - blob motion is computed in JS (doubles) every frame; the shader needs
 *    fragment highp, so GPUs without it get the CSS fallback instead
 *  - fades to 38% once the hero scrolls away so card text stays readable
 *  - uniforms are packed into 13 vec4 slots, under the 16 that WebGL 1
 *    guarantees for fragment shaders
 */

const BLOB_COUNT = 6;

const VERT = `attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.0,1.0);}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec4 u_rm;      // res.xy, mouse.xy
uniform vec4 u_bgi;     // background rgb, intensity
uniform vec4 u_warp;    // two noise offsets (xy, zw)
uniform vec3 u_k[4];    // palette
uniform vec4 u_b[${BLOB_COUNT}];  // x, y, radius, vertical stretch

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

// Blob i takes its colour from the palette (aurora 1 to 4): 1, 2, 3, 2, 1, 4.
vec3 blobColor(int i){
  if(i==0)return u_k[0];
  if(i==1)return u_k[1];
  if(i==2)return u_k[2];
  if(i==3)return u_k[1];
  if(i==4)return u_k[0];
  return u_k[3];
}

void main(){
  vec2 res=u_rm.xy;
  vec2 uv=gl_FragCoord.xy/res;
  vec2 p=uv-0.5;
  float aspect=res.x/res.y;
  p.x*=aspect;
  // A little domain warp keeps the wax from looking like perfect circles.
  vec2 q=vec2(snoise(p*1.6+u_warp.xy),snoise(p*1.6+u_warp.zw));
  vec2 w=p+0.045*q-(u_rm.zw-0.5)*vec2(aspect,1.0)*0.05;

  // Steep metaball kernel (r^4 / d^4): blobs only merge when they nearly
  // touch, and distant wax never tints the whole screen on narrow phones.
  // Distances are scaled by 4 and the gradient is normalised by (1+f) inside
  // the loop to keep the intermediates well conditioned.
  float f=0.0;
  for(int i=0;i<${BLOB_COUNT};i++){
    vec4 b=u_b[i];
    vec2 d=(w-b.xy)*4.0;
    d.y/=b.w;
    float dd=dot(d,d)+0.01;
    float r2=b.z*b.z*16.0;
    f+=(r2*r2)/(dd*dd);
  }
  float inv=1.0/(1.0+f);
  float wsum=0.0;
  vec3 csum=vec3(0.0);
  vec2 grad=vec2(0.0);
  for(int i=0;i<${BLOB_COUNT};i++){
    vec4 b=u_b[i];
    vec2 d=(w-b.xy)*4.0;
    d.y/=b.w;
    float dd=dot(d,d)+0.01;
    float r2=b.z*b.z*16.0;
    float fi=(r2*r2)/(dd*dd);
    float wi=min(fi,64.0);
    wi*=wi;
    wsum+=wi;
    csum+=wi*blobColor(i);
    grad+=-4.0*(fi*inv)*(d/dd)*inv;
  }
  vec3 wax=csum/max(wsum,1e-6);

  // Soft boundary around the metaball threshold, plus a glow halo outside it.
  float body=smoothstep(0.7,1.5,f);
  float halo=smoothstep(0.04,0.7,f)*(1.0-body);

  // Dome shading from a bounded height map h = f/(1+f): its gradient fades to
  // zero at the blob centre, so the top is rounded instead of a cusp.
  vec3 n=normalize(vec3(-grad*1.8,1.0));
  vec3 L=normalize(vec3(-0.45,0.7,0.6));
  float diff=0.72+0.28*max(dot(n,L),0.0);
  float spec=pow(max(dot(reflect(-L,n),vec3(0.0,0.0,1.0)),0.0),10.0);
  float core=smoothstep(1.5,6.0,f)*0.06;
  vec3 lit=wax*diff+(core+spec*0.18)*mix(vec3(1.0),wax,0.4);

  vec3 bg=u_bgi.rgb;
  float k=u_bgi.a;
  vec3 col=bg;
  col=mix(col,mix(bg,wax,0.5),halo*k*0.8);
  col=mix(col,lit,body*k);
  float v=smoothstep(1.7,0.45,length(p));
  col=mix(bg,col,0.55+0.45*v);
  float dither=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
  col+=(dither-0.5)*(1.0/255.0);
  gl_FragColor=vec4(col,1.0);
}
`;

type Rgb = [number, number, number];

function hexToRgb(hex: string, fallback: Rgb): Rgb {
  const h = hex.trim().replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  if (!/^[0-9a-f]{6}$/i.test(full)) return fallback;
  const n = parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function readPalette() {
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  const get = (name: string, fallback: Rgb) =>
    hexToRgb(cs.getPropertyValue(name), fallback);
  return {
    dark: root.classList.contains("dark"),
    bg: get("--background", [0.03, 0.03, 0.05]),
    colors: [
      get("--aurora-1", [0.23, 0.42, 1.0]),
      get("--aurora-2", [0.18, 0.83, 0.75]),
      get("--aurora-3", [0.65, 0.55, 0.98]),
      get("--aurora-4", [0.22, 0.74, 0.97]),
    ] as const,
  };
}

/**
 * Each blob bobs on its own slow sine wave (periods of 29 to 52 seconds) so
 * they drift past each other and merge now and then, like wax in a lamp.
 * x: resting column (fraction of the width), ax: sway amplitude,
 * py: vertical period in seconds, ph: phase, r: radius (fraction of height).
 */
const BLOBS = [
  { x: -0.36, ax: 0.05, py: 51, ph: 0.0, r: 0.2 },
  { x: -0.13, ax: 0.04, py: 41, ph: 2.1, r: 0.16 },
  { x: 0.1, ax: 0.06, py: 59, ph: 4.0, r: 0.23 },
  { x: 0.31, ax: 0.05, py: 36, ph: 1.2, r: 0.14 },
  { x: 0.4, ax: 0.04, py: 47, ph: 5.1, r: 0.19 },
  { x: -0.42, ax: 0.03, py: 65, ph: 3.3, r: 0.13 },
] as const;

const TAU = Math.PI * 2;

/** Writes x, y, radius and vertical stretch for every blob at time t (seconds). */
function fillBlobs(out: Float32Array, t: number, aspect: number) {
  // Wide screens spread the columns out; portrait phones pull them in and
  // shrink the wax so a single blob can never swallow the whole viewport.
  const spread = aspect < 0.9 ? aspect * 1.1 : aspect;
  const shrink = Math.pow(Math.min(Math.max(aspect, 0.5), 1), 0.8);
  const count = aspect < 0.7 ? 4 : BLOBS.length;
  for (let i = 0; i < BLOBS.length; i++) {
    const b = BLOBS[i]!;
    if (i >= count) {
      // Parked off-screen with no radius: contributes nothing to the field.
      out[i * 4] = 9;
      out[i * 4 + 1] = 9;
      out[i * 4 + 2] = 0;
      out[i * 4 + 3] = 1;
      continue;
    }
    const wy = TAU / b.py;
    const phase = t * wy + b.ph;
    const y = 0.6 * Math.sin(phase);
    const vy = 0.6 * wy * Math.cos(phase);
    const x = (b.x + b.ax * Math.sin(t * (TAU / (b.py * 0.8)) + b.ph)) * spread;
    const r = b.r * shrink * (1 + 0.08 * Math.sin(t * 0.7 + b.ph));
    out[i * 4] = x;
    out[i * 4 + 1] = y;
    out[i * 4 + 2] = r;
    out[i * 4 + 3] = 1 + 3 * Math.abs(vy);
  }
}

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Once failed, the fallback is rendered and there is nothing to set up.
    // Depending on `failed` also makes React tear down every listener below
    // the moment a real context loss flips it.
    if (failed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      setFailed(true);
      return;
    }
    // The metaball maths overflows fp16: without fragment highp the GPU would
    // paint NaN, so those devices get the CSS lamp instead.
    const highp = gl.getShaderPrecisionFormat(
      gl.FRAGMENT_SHADER,
      gl.HIGH_FLOAT,
    );
    if (!highp || highp.precision === 0) {
      setFailed(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("createShader failed");
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader) ?? "unknown shader error";
        gl.deleteShader(shader);
        throw new Error(log);
      }
      return shader;
    };

    let program: WebGLProgram;
    try {
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      const p = gl.createProgram();
      if (!p) throw new Error("createProgram failed");
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(p) ?? "link failed");
      }
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      program = p;
    } catch {
      setFailed(true);
      return;
    }

    gl.useProgram(program);

    // One triangle that covers the whole clip space; cheaper than a quad.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const loc = {
      rm: u("u_rm"),
      bgi: u("u_bgi"),
      warp: u("u_warp"),
      k: u("u_k"),
      b: u("u_b"),
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    // Also still when the visitor pauses effects with the navbar toggle.
    const root = document.documentElement;
    const isStatic = () =>
      reduceMotion.matches ||
      saveData ||
      root.classList.contains("reduce-effects");

    const applyPalette = () => {
      const pal = readPalette();
      gl.uniform4f(
        loc.bgi,
        pal.bg[0],
        pal.bg[1],
        pal.bg[2],
        pal.dark ? 0.78 : 0.72,
      );
      gl.uniform3fv(loc.k, new Float32Array(pal.colors.flat()));
    };

    let aspect = 1;
    // Starts from the canvas's current buffer: in development React runs this
    // effect twice on the same, already-sized canvas, and the second resize()
    // takes the early return below without touching it.
    const size = { w: canvas.width, h: canvas.height };
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    /**
     * Sizes the drawing buffer from the canvas's own CSS box (100lvh, so the
     * mobile URL bar showing/hiding does not reallocate it). Returns true when
     * the buffer was reallocated, which also clears it: the caller must redraw
     * immediately or the compositor presents a black frame.
     */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const scale = (coarsePointer ? 0.45 : 0.55) * dpr;
      const cssW = canvas.clientWidth || window.innerWidth;
      const cssH = canvas.clientHeight || window.innerHeight;
      const w = Math.max(1, Math.floor(cssW * scale));
      const h = Math.max(1, Math.floor(cssH * scale));
      aspect = cssW / cssH;
      size.w = w;
      size.h = h;
      if (canvas.width === w && canvas.height === h) return false;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      return true;
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };

    const blobs = new Float32Array(BLOB_COUNT * 4);
    const draw = (t: number) => {
      fillBlobs(blobs, t, aspect);
      gl.uniform4fv(loc.b, blobs);
      gl.uniform4f(loc.rm, size.w, size.h, mouse.x, mouse.y);
      gl.uniform4f(
        loc.warp,
        2 * Math.sin(t * 0.05),
        2 * Math.cos(t * 0.05),
        2 * Math.cos(t * 0.04 + 1) + 3.1,
        2 * Math.sin(t * 0.04 + 2),
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let last = 0;
    const start = performance.now();
    const seconds = (now: number) => (now - start) / 1000 + 11;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // Below the hero the field is mostly covered by content: 20 fps is plenty.
      // The 4ms tolerance keeps a steady every-2nd/3rd-frame cadence on 60Hz
      // displays instead of flapping on the exact vsync multiple.
      const minInterval = window.scrollY > window.innerHeight ? 50 : 33;
      if (now - last < minInterval - 4) return;
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      draw(seconds(now));
    };

    const renderStatic = () => {
      mouse.x = mouse.tx = 0.5;
      mouse.y = mouse.ty = 0.5;
      // A moment where all six blobs sit well inside the viewport.
      draw(457.5);
    };

    const play = () => {
      if (raf) return;
      if (isStatic()) {
        renderStatic();
        return;
      }
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Dim the lamp once the hero scrolls away: content sections sit on glass
    // and need the backdrop calmer. Compositor-only (opacity on the canvas).
    let fadeRaf = 0;
    const applyFade = () => {
      fadeRaf = 0;
      const t = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      canvas.style.opacity = String(1 - 0.62 * t);
    };
    const onScroll = () => {
      if (!fadeRaf) fadeRaf = requestAnimationFrame(applyFade);
    };

    applyPalette();
    resize();
    applyFade();
    play();

    const onVisibility = () => (document.hidden ? stop() : play());
    const onMotionPref = () => {
      stop();
      play();
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!resize()) return;
        // Reallocating cleared the buffer: paint it again before the next vsync.
        if (isStatic()) renderStatic();
        else draw(seconds(performance.now()));
      }, 120);
    };
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
      setFailed(true);
    };
    // The class carries both the theme and the paused-effects choice: repaint
    // with the new palette, then either resume or settle on a still frame.
    const themeObserver = new MutationObserver(() => {
      applyPalette();
      stop();
      play();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    reduceMotion.addEventListener("change", onMotionPref);
    canvas.addEventListener("webglcontextlost", onContextLost);
    if (!coarsePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (fadeRaf) cancelAnimationFrame(fadeRaf);
      window.removeEventListener("pointermove", onPointerMove);
      reduceMotion.removeEventListener("change", onMotionPref);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      themeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      // Deliberately no loseContext(): React StrictMode re-runs this effect in
      // development, and a context that was explicitly lost cannot be reused
      // on the same canvas. The context is released with the element instead.
    };
  }, [failed]);

  if (failed) return <LavaFallback />;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-lvh w-full print:hidden"
    />
  );
}

/** CSS-only stand-in for browsers without WebGL: blurred blobs bobbing up and down. */
function LavaFallback() {
  const blobs = [
    {
      left: "8%",
      size: "42vmax",
      color: "var(--aurora-1)",
      delay: "0s",
      dur: "41s",
    },
    {
      left: "38%",
      size: "36vmax",
      color: "var(--aurora-2)",
      delay: "-14s",
      dur: "33s",
    },
    {
      left: "62%",
      size: "46vmax",
      color: "var(--aurora-3)",
      delay: "-25s",
      dur: "47s",
    },
    {
      left: "80%",
      size: "32vmax",
      color: "var(--aurora-4)",
      delay: "-7s",
      dur: "29s",
    },
  ] as const;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden"
    >
      {blobs.map((b) => (
        <div
          key={b.left}
          className="absolute top-1/2 animate-lava rounded-full opacity-60 blur-3xl"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            marginTop: `calc(${b.size} / -2)`,
            background: `radial-gradient(closest-side, ${b.color}, transparent 70%)`,
            animationDelay: b.delay,
            animationDuration: b.dur,
          }}
        />
      ))}
    </div>
  );
}
