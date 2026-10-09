"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-viewport "liquid aurora": four soft colour fields drifting through a
 * domain-warped simplex noise field, rendered by a single-triangle WebGL pass.
 *
 * Performance budget:
 *  - renders at ~0.5× device pixels (the field is smooth, so this is invisible)
 *  - capped at 30 fps in the hero and 20 fps once scrolled past it
 *  - pauses when the tab is hidden; draws one static frame for reduced-motion
 *    or data-saver users; falls back to CSS gradients without WebGL
 *  - all time-dependent maths runs in JS (doubles), so the shader only ever
 *    sees small numbers and stays stable on mediump mobile GPUs
 */

const VERT = `attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.0,1.0);}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec2 u_c1, u_c2, u_c3, u_c4;
uniform vec2 u_wa, u_wb, u_wd;
uniform vec3 u_bg, u_k1, u_k2, u_k3, u_k4;
uniform float u_int;

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

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  vec2 p=uv-0.5;
  float aspect=u_res.x/u_res.y;
  p.x*=aspect;
  vec2 q=vec2(snoise(p*0.75+u_wa),snoise(p*0.75+u_wb));
  vec2 w=p+0.5*q-(u_mouse-0.5)*vec2(aspect,1.0)*0.12;
  vec2 d1=w-u_c1, d2=w-u_c2, d3=w-u_c3, d4=w-u_c4;
  float b1=exp(-2.1*dot(d1,d1));
  float b2=exp(-2.0*dot(d2,d2));
  float b3=exp(-2.4*dot(d3,d3));
  float b4=exp(-2.7*dot(d4,d4));
  float n=0.5+0.5*snoise(w*2.0+u_wd);
  vec3 col=u_bg;
  col=mix(col,u_k1,min(1.0,b1*(0.7+0.5*n))*u_int);
  col=mix(col,u_k2,min(1.0,b2*(0.8+0.4*(1.0-n)))*u_int);
  col=mix(col,u_k3,min(1.0,b3*(0.7+0.5*n))*u_int);
  col=mix(col,u_k4,min(1.0,b4*0.7)*u_int*0.85);
  float v=smoothstep(1.5,0.3,length(p));
  col=mix(u_bg,col,0.4+0.6*v);
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
    bg: get("--background", [0.03, 0.04, 0.07]),
    colors: [
      get("--aurora-1", [0.14, 0.34, 0.84]),
      get("--aurora-2", [0.43, 0.23, 0.84]),
      get("--aurora-3", [0.06, 0.54, 0.5]),
      get("--aurora-4", [0.69, 0.15, 0.42]),
    ] as const,
  };
}

/** Everything that moves is a smooth, periodic function of `t`, computed here. */
function fieldAt(t: number) {
  return {
    c1: [-0.55 + 0.25 * Math.sin(t * 1.1), 0.35 + 0.2 * Math.cos(t * 0.9)],
    c2: [
      0.6 + 0.2 * Math.cos(t * 0.8 + 1),
      0.25 + 0.25 * Math.sin(t * 1.2 + 2),
    ],
    c3: [0.1 + 0.3 * Math.sin(t * 0.7 + 4), -0.5 + 0.2 * Math.cos(t + 1.5)],
    c4: [
      -0.3 + 0.25 * Math.cos(t * 0.9 + 2.5),
      -0.25 + 0.3 * Math.sin(t * 0.6 + 0.5),
    ],
    wa: [4 * Math.sin(t * 0.3), 4 * Math.cos(t * 0.3)],
    wb: [4 * Math.cos(t * 0.25 + 1) + 3.1, 4 * Math.sin(t * 0.25 + 2)],
    wd: [3 * Math.sin(t * 0.2), 3 * Math.cos(t * 0.2)],
  } as const;
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
      res: u("u_res"),
      mouse: u("u_mouse"),
      c1: u("u_c1"),
      c2: u("u_c2"),
      c3: u("u_c3"),
      c4: u("u_c4"),
      wa: u("u_wa"),
      wb: u("u_wb"),
      wd: u("u_wd"),
      bg: u("u_bg"),
      k1: u("u_k1"),
      k2: u("u_k2"),
      k3: u("u_k3"),
      k4: u("u_k4"),
      int: u("u_int"),
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    const isStatic = () => reduceMotion.matches || saveData;

    const applyPalette = () => {
      const pal = readPalette();
      gl.uniform3fv(loc.bg, pal.bg);
      gl.uniform3fv(loc.k1, pal.colors[0]);
      gl.uniform3fv(loc.k2, pal.colors[1]);
      gl.uniform3fv(loc.k3, pal.colors[2]);
      gl.uniform3fv(loc.k4, pal.colors[3]);
      gl.uniform1f(loc.int, pal.dark ? 0.62 : 0.82);
    };

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
      if (canvas.width === w && canvas.height === h) return false;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(loc.res, w, h);
      return true;
    };

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };

    const draw = (t: number) => {
      const f = fieldAt(t);
      gl.uniform2f(loc.c1, f.c1[0], f.c1[1]);
      gl.uniform2f(loc.c2, f.c2[0], f.c2[1]);
      gl.uniform2f(loc.c3, f.c3[0], f.c3[1]);
      gl.uniform2f(loc.c4, f.c4[0], f.c4[1]);
      gl.uniform2f(loc.wa, f.wa[0], f.wa[1]);
      gl.uniform2f(loc.wb, f.wb[0], f.wb[1]);
      gl.uniform2f(loc.wd, f.wd[0], f.wd[1]);
      gl.uniform2f(loc.mouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let last = 0;
    const start = performance.now();
    const fieldTime = (now: number) => ((now - start) / 1000) * 0.06;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // Below the hero the field is mostly covered by content: 20 fps is plenty.
      // The 4ms tolerance keeps a steady every-2nd/3rd-frame cadence on 60Hz
      // displays instead of flapping on the exact vsync multiple.
      const minInterval = window.scrollY > window.innerHeight ? 50 : 33;
      const elapsed = now - last;
      if (elapsed < minInterval - 4) return;
      last = now - (elapsed % minInterval);
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      draw(fieldTime(now));
    };

    const renderStatic = () => {
      mouse.x = mouse.tx = 0.5;
      mouse.y = mouse.ty = 0.5;
      draw(7.3);
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

    applyPalette();
    resize();
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
        else draw(fieldTime(performance.now()));
      }, 120);
    };
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
      setFailed(true);
    };
    const themeObserver = new MutationObserver(() => {
      applyPalette();
      if (isStatic()) renderStatic();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
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

  if (failed) return <AuroraFallback />;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-lvh w-full"
    />
  );
}

/** CSS-only stand-in for browsers without WebGL. Transform-only animation. */
function AuroraFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -top-[10%] -left-[10%] h-[70vmax] w-[70vmax] animate-float rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--aurora-1), transparent 70%)",
        }}
      />
      <div
        className="absolute top-[5%] -right-[15%] h-[65vmax] w-[65vmax] animate-float rounded-full opacity-60 blur-3xl [animation-delay:-3s]"
        style={{
          background:
            "radial-gradient(closest-side, var(--aurora-2), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-[25%] left-[20%] h-[70vmax] w-[70vmax] animate-float rounded-full opacity-60 blur-3xl [animation-delay:-6s]"
        style={{
          background:
            "radial-gradient(closest-side, var(--aurora-3), transparent 70%)",
        }}
      />
    </div>
  );
}
