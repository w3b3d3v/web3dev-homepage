import { useEffect, useRef } from "react";

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const gridSize = 60;

    const beams: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const spawnBeam = () => {
      const horizontal = Math.random() > 0.5;
      if (horizontal) {
        const row = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        beams.push({
          x: -200,
          y: row,
          vx: 2 + Math.random() * 3,
          vy: 0,
          life: 0,
          maxLife: canvas.width / 2 + Math.random() * (canvas.width / 2),
        });
      } else {
        const col = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        beams.push({
          x: col,
          y: -200,
          vx: 0,
          vy: 2 + Math.random() * 3,
          life: 0,
          maxLife: canvas.height / 3 + Math.random() * (canvas.height / 3),
        });
      }
    };

    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Spawn beams periodically
      frameCount++;
      if (frameCount % 90 === 0 && beams.length < 6) {
        spawnBeam();
      }

      // Draw and update beams
      for (let i = beams.length - 1; i >= 0; i--) {
        const beam = beams[i];
        beam.x += beam.vx;
        beam.y += beam.vy;
        beam.life++;

        const progress = beam.life / beam.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : progress > 0.8 ? (1 - progress) * 5 : 1;

        const gradient = beam.vx !== 0
          ? ctx.createLinearGradient(beam.x - 150, beam.y, beam.x, beam.y)
          : ctx.createLinearGradient(beam.x, beam.y - 150, beam.x, beam.y);

        gradient.addColorStop(0, `rgba(0, 255, 102, 0)`);
        gradient.addColorStop(0.5, `rgba(0, 255, 102, ${0.08 * alpha})`);
        gradient.addColorStop(1, `rgba(0, 255, 102, ${0.25 * alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (beam.vx !== 0) {
          ctx.moveTo(beam.x - 150, beam.y);
          ctx.lineTo(beam.x, beam.y);
        } else {
          ctx.moveTo(beam.x, beam.y - 150);
          ctx.lineTo(beam.x, beam.y);
        }
        ctx.stroke();

        // Glow at intersections
        const nearGridX = Math.round(beam.x / gridSize) * gridSize;
        const nearGridY = Math.round(beam.y / gridSize) * gridSize;
        const distToGrid = Math.sqrt((beam.x - nearGridX) ** 2 + (beam.y - nearGridY) ** 2);

        if (distToGrid < 5) {
          const glowGradient = ctx.createRadialGradient(nearGridX, nearGridY, 0, nearGridX, nearGridY, 30);
          glowGradient.addColorStop(0, `rgba(0, 255, 102, ${0.3 * alpha})`);
          glowGradient.addColorStop(1, `rgba(0, 255, 102, 0)`);
          ctx.fillStyle = glowGradient;
          ctx.fillRect(nearGridX - 30, nearGridY - 30, 60, 60);
        }

        if (beam.life > beam.maxLife) {
          beams.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initial beams
    spawnBeam();
    spawnBeam();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default GridBackground;
