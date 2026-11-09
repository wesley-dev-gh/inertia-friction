"use client";

import { useEffect, useRef } from "react";

const useHome = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = null;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: -1000,
      y: -1000,
      px: -1000,
      py: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
    };

    // Desktop / tablet
    const columns = [7, 8, 6, 7, 5, 6, 5, 4, 6, 6, 4, 5];
    // Mobile: menos colunas = pontos maiores e mais legíveis
    const columnsCompact = [6, 8, 5, 7, 4, 6, 5, 4];

    // Pontos isolados na parte superior.
    const floatingDots = [
      [0.03, 0.16],
      [0.37, 0.07],
      [0.96, 0.07],
      [0.18, 0.32],
      [0.27, 0.32],
      [0.27, 0.39],
      [0.87, 0.32],
      [0.87, 0.39],
      [0.6, 0.49],
      [0.95, 0.49],
    ];

    let dots = [];

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const createDots = () => {
      dots = [];

      const compact = width < 560;
      const activeColumns = compact ? columnsCompact : columns;

      const spacingX = width / activeColumns.length;

      const radius = compact
        ? clamp(spacingX * 0.34, 8, 18)
        : clamp(width * 0.031, 9, 23);

      const spacingY = radius * 2.05;
      const bottom = height - radius;

      // Colunas principais.
      activeColumns.forEach((amount, column) => {
        for (let row = 0; row < amount; row++) {
          const x = spacingX * (column + 0.5);
          const y = bottom - row * spacingY;

          dots.push({
            x,
            y,
            originX: x,
            originY: y,
            radius,
            vx: 0,
            vy: 0,
            lastHit: 0,
          });
        }
      });

      // Pontos dispersos.
      floatingDots.forEach(([x, y]) => {
        const px = x * width;
        const py = y * height;

        dots.push({
          x: px,
          y: py,
          originX: px,
          originY: py,
          radius,
          vx: 0,
          vy: 0,
          lastHit: 0,
        });
      });
    };

    let lastWidth = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      // Só reage a mudanças no eixo X.
      // No mobile, a barra do navegador altera só a altura ao rolar.
      if (lastWidth !== 0 && Math.round(rect.width) === lastWidth) return;

      lastWidth = Math.round(rect.width);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createDots();
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();

      mouse.px = mouse.x;
      mouse.py = mouse.y;

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;

      // Primeiro movimento depois de entrar: sem salto de velocidade.
      const hasPrevious = mouse.px > -500;

      const dx = hasPrevious ? mouse.x - mouse.px : 0;
      const dy = hasPrevious ? mouse.y - mouse.py : 0;

      mouse.speed = Math.hypot(dx, dy);

      mouse.vx = dx;
      mouse.vy = dy;

      if (mouse.speed < 0.5) return;

      const now = performance.now();

      dots.forEach((dot) => {
        const ddx = dot.x - mouse.x;
        const ddy = dot.y - mouse.y;

        const distance = Math.hypot(ddx, ddy);
        const hitRadius = dot.radius + 12;

        if (distance < hitRadius && now - dot.lastHit > 110) {
          const angle = Math.atan2(ddy, ddx);

          // Intensidade baseada na velocidade do ponteiro.
          const power = clamp(mouse.speed * 0.32, 2, 24);

          // Combina a direção do contato com a direção do movimento.
          const directionX =
            Math.cos(angle) * 0.75 + (mouse.vx / mouse.speed) * 0.25;

          const directionY =
            Math.sin(angle) * 0.75 + (mouse.vy / mouse.speed) * 0.25;

          dot.vx += directionX * power;
          dot.vy += directionY * power;

          dot.lastHit = now;
        }
      });
    };

    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.px = -1000;
      mouse.py = -1000;
      mouse.speed = 0;
    };

    // ───────── MOBILE: tap + shake ─────────
    const tap = { x: 0, y: 0, t: 0 };

    const burst = (cx, cy, radius, strength) => {
      dots.forEach((dot) => {
        const dx = dot.x - cx;
        const dy = dot.y - cy;
        const distance = Math.hypot(dx, dy) || 1;

        if (distance > radius) return;

        // Quanto mais perto do toque, mais forte.
        const falloff = 1 - distance / radius;
        const power = strength * falloff * falloff;

        dot.vx += (dx / distance) * power;
        dot.vy += (dy / distance) * power;
      });
    };

    const handlePointerDown = (event) => {
      if (event.pointerType !== "touch") return;

      const rect = canvas.getBoundingClientRect();
      tap.x = event.clientX - rect.left;
      tap.y = event.clientY - rect.top;
      tap.t = performance.now();
    };

    // pointerup só dispara se o navegador não assumiu o gesto como scroll,
    // então scroll vertical nunca vira "tap".
    const handlePointerUp = (event) => {
      if (event.pointerType !== "touch") return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const moved = Math.hypot(x - tap.x, y - tap.y);
      const duration = performance.now() - tap.t;

      if (moved < 12 && duration < 350) {
        burst(x, y, clamp(width * 0.45, 140, 260), 38);
        navigator.vibrate?.(8);
      }

      // iOS exige permissão do sensor dentro de um gesto do usuário.
      requestMotionPermission();
    };

    let motionEnabled = false;
    let lastShake = 0;
    let prev = null;

    const handleMotion = (event) => {
      if (!isVisible) return;

      const a = event.accelerationIncludingGravity;
      if (!a || a.x == null) return;

      if (prev) {
        const dx = a.x - prev.x;
        const dy = a.y - prev.y;
        const dz = a.z - prev.z;
        const delta = Math.hypot(dx, dy, dz);

        const now = performance.now();

        if (delta > 16 && now - lastShake > 400) {
          lastShake = now;

          const intensity = clamp(delta / 10, 1.2, 3);
          const power = 14 * intensity;

          // Direção do chacoalhar (eixo x do aparelho = x da tela,
          // eixo y do aparelho é invertido em relação à tela).
          const dirX = clamp(-dx / delta, -1, 1);
          const dirY = clamp(dy / delta, -1, 1);

          dots.forEach((dot) => {
            dot.vx += dirX * power + (Math.random() - 0.5) * power;
            // Viés para cima: os pontos "pulam" e a mola faz cair de volta.
            dot.vy += dirY * power - Math.random() * power * 1.1;
          });

          navigator.vibrate?.(15);
        }
      }

      prev = { x: a.x, y: a.y, z: a.z };
    };

    const enableMotion = () => {
      if (motionEnabled) return;
      motionEnabled = true;
      window.addEventListener("devicemotion", handleMotion);
    };

    const requestMotionPermission = async () => {
      if (motionEnabled || typeof DeviceMotionEvent === "undefined") return;

      // iOS 13+: precisa pedir permissão.
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        try {
          const result = await DeviceMotionEvent.requestPermission();
          if (result === "granted") enableMotion();
        } catch {
          /* usuário negou ou contexto sem gesto */
        }
        return;
      }

      // Android e outros: liberado direto.
      enableMotion();
    };

    const animate = () => {
      if (!isVisible) {
        animationFrame = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        // Força elástica de retorno.
        const spring = 0.035;
        const friction = 0.91;

        dot.vx += (dot.originX - dot.x) * spring;
        dot.vy += (dot.originY - dot.y) * spring;

        // Dissipação de energia.
        dot.vx *= friction;
        dot.vy *= friction;

        // Atualização da posição.
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Desenho.
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pausa o loop quando a seção sai da tela.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;

      if (isVisible && animationFrame === null) {
        animationFrame = requestAnimationFrame(animate);
      }
    });
    visibilityObserver.observe(canvas);

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("pointercancel", handlePointerLeave);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);

    // Android não precisa de gesto, então já ativa de cara.
    if (
      window.matchMedia("(pointer: coarse)").matches &&
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission !== "function"
    ) {
      enableMotion();
    }

    resize();
    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);

      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointercancel", handlePointerLeave);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);
  return { canvasRef };
};

export default useHome;
