import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Cap particle count on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = prefersReducedMotion ? 0 : (isMobile ? 30 : 60);
    const connectionDistance = isMobile ? 100 : 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas!.height) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawOrb = (x: number, y: number, radius: number, color: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      if (!ctx) return;
      
      const time = Date.now() * 0.0005;

      // Base dark color (deep midnight blue/purple instead of black)
      ctx.fillStyle = '#070814';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!prefersReducedMotion) {
        // Animated Aurora Orbs
        const x1 = canvas.width * 0.5 + Math.sin(time * 0.7) * canvas.width * 0.3;
        const y1 = canvas.height * 0.5 + Math.cos(time * 0.5) * canvas.height * 0.3;
        drawOrb(x1, y1, canvas.width * 0.7, 'rgba(76, 29, 149, 0.4)'); // Deep Purple

        const x2 = canvas.width * 0.5 + Math.cos(time * 0.3) * canvas.width * 0.4;
        const y2 = canvas.height * 0.5 + Math.sin(time * 0.8) * canvas.height * 0.4;
        drawOrb(x2, y2, canvas.width * 0.6, 'rgba(16, 185, 129, 0.15)'); // Emerald

        const x3 = canvas.width * 0.5 + Math.sin(time * 0.5 + Math.PI) * canvas.width * 0.3;
        const y3 = canvas.height * 0.5 + Math.cos(time * 0.4 + Math.PI) * canvas.height * 0.3;
        drawOrb(x3, y3, canvas.width * 0.8, 'rgba(30, 58, 138, 0.3)'); // Deep Blue

        // Particles and connections
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              const opacity = 1 - distance / connectionDistance;
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      } else {
        // Static fallback for reduced motion
        drawOrb(canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.8, 'rgba(76, 29, 149, 0.3)');
        drawOrb(canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.8, 'rgba(30, 58, 138, 0.3)');
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};
