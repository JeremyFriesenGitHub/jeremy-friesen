"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  darkColor: string;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

// Dark mode: pure whites. Light mode: near-black
const DARK_COLORS = [
  "255, 255, 255",
  "255, 255, 255",
  "245, 248, 255",
  "240, 245, 255",
  "250, 250, 255",
  "255, 252, 245",
];
const LIGHT_COLORS = [
  "0, 0, 0",
  "10, 10, 15",
  "5, 5, 10",
  "15, 15, 25",
  "10, 8, 20",
  "0, 0, 5",
];

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const prefersReducedMotion = useRef(false);
  const isDarkRef = useRef(true);
  const scrollRef = useRef(0);

  const createStars = useCallback((width: number, height: number) => {
    // Use full document height so stars span entire scrollable page
    const docHeight = Math.max(height, document.documentElement.scrollHeight);
    const count = width < 480 ? 200 : width < 768 ? 350 : 600;
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      const isBright = Math.random() < 0.15;
      const colorIdx = Math.floor(Math.random() * DARK_COLORS.length);
      const x = Math.random() * width;
      const y = Math.random() * docHeight;
      stars.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: isBright ? Math.random() * 2.5 + 1.8 : Math.random() * 1.4 + 0.5,
        color: DARK_COLORS[colorIdx]!,
        darkColor: LIGHT_COLORS[colorIdx]!,
        baseAlpha: isBright ? Math.random() * 0.3 + 0.7 : Math.random() * 0.4 + 0.45,
        alpha: 0,
        twinkleSpeed: Math.random() * 2 + 1,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    return stars;
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;
    const motionHandler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener("change", motionHandler);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Watch for dark/light class changes on <html>
    const checkTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = createStars(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", handleMouse);

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      // Update mouse Y to track scroll position
      mouseRef.current.y = mouseRef.current.y + (window.scrollY - scrollRef.current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const dark = isDarkRef.current;
      const scroll = window.scrollY;
      const viewH = canvas.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (prefersReducedMotion.current) {
        for (const s of starsRef.current) {
          const screenY = s.y - scroll;
          if (screenY < -20 || screenY > viewH + 20) continue;
          const c = dark ? s.color : s.darkColor;
          ctx.beginPath();
          ctx.arc(s.x, screenY, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c}, ${s.baseAlpha * 0.8})`;
          ctx.fill();
        }
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Visible stars for constellation lines
      const visibleStars: { s: Star; screenY: number }[] = [];

      for (const s of starsRef.current) {
        const screenY = s.y - scroll;
        // Skip stars far off screen
        if (screenY < -50 || screenY > viewH + 50) continue;

        const c = dark ? s.color : s.darkColor;

        // Twinkle
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        s.alpha = s.baseAlpha * (0.6 + 0.4 * twinkle);

        // Snappy mouse repulsion
        const dx = mx - s.x;
        const dy = my - s.y;
        const distSq = dx * dx + dy * dy;
        const radius = 180;
        if (distSq < radius * radius && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = ((radius - dist) / radius) ** 2;
          const pushStrength = 0.35;
          s.vx -= (dx / dist) * force * pushStrength;
          s.vy -= (dy / dist) * force * pushStrength;
        }

        s.x += s.vx;
        s.y += s.vy;

        // Wrap horizontally
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;

        // Dampen
        s.vx *= 0.96;
        s.vy *= 0.96;

        // Bright star glow halo
        if (s.radius > 1.5) {
          const gradient = ctx.createRadialGradient(s.x, screenY, 0, s.x, screenY, s.radius * 5);
          gradient.addColorStop(0, `rgba(${c}, ${s.alpha * 0.8})`);
          gradient.addColorStop(0.3, `rgba(${c}, ${s.alpha * 0.35})`);
          gradient.addColorStop(0.6, `rgba(${c}, ${s.alpha * 0.1})`);
          gradient.addColorStop(1, `rgba(${c}, 0)`);
          ctx.beginPath();
          ctx.arc(s.x, screenY, s.radius * 5, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(s.x, screenY, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c}, ${s.alpha})`;
        ctx.fill();

        if (s.radius >= 0.5) {
          visibleStars.push({ s, screenY });
        }
      }

      // Constellation lines — connect nearby visible stars
      const lineColor = dark ? "255, 255, 255" : "0, 0, 0";
      const maxDist = 150;
      const maxDistSq = maxDist * maxDist;
      for (let i = 0; i < visibleStars.length; i++) {
        const a = visibleStars[i]!;
        let connections = 0;
        for (let j = i + 1; j < visibleStars.length; j++) {
          const b = visibleStars[j]!;
          const ddx = a.s.x - b.s.x;
          const ddy = a.screenY - b.screenY;
          const dSq = ddx * ddx + ddy * ddy;
          if (dSq < maxDistSq) {
            const d = Math.sqrt(dSq);
            const opacity = 0.2 * (1 - d / maxDist);
            ctx.beginPath();
            ctx.moveTo(a.s.x, a.screenY);
            ctx.lineTo(b.s.x, b.screenY);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            connections++;
            if (connections > 4) break;
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      mql.removeEventListener("change", motionHandler);
      observer.disconnect();
    };
  }, [createStars]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
