import React, { useEffect, useRef } from 'react';

const InfinityParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 160;
    canvas.height = 80;

    // Particle system
    const particles: Particle[] = [];
    const particleCount = 20;

    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      t: number;
      color: string;

      constructor() {
        this.t = Math.random() * Math.PI * 2;
        this.size = Math.random() * 3 + 1.5;
        this.speed = Math.random() * 0.02 + 0.01;
        this.angle = 0;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.updatePosition();
      }

      updatePosition() {
        // Infinity sign parametric equations
        const scale = 35;
        const offsetX = canvas.width / 2;
        const offsetY = canvas.height / 2;
        
        this.x = offsetX + scale * Math.sin(this.t) / (1 + Math.pow(Math.cos(this.t), 2));
        this.y = offsetY + scale * Math.sin(this.t) * Math.cos(this.t) / (1 + Math.pow(Math.cos(this.t), 2));
        
        this.t += this.speed;
        if (this.t > Math.PI * 4) {
          this.t = 0;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw infinity sign
    const drawInfinity = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw infinity sign path
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.lineWidth = 2;
      
      const scale = 35;
      const offsetX = canvas.width / 2;
      const offsetY = canvas.height / 2;
      
      for (let t = 0; t <= Math.PI * 2; t += 0.05) {
        const x = offsetX + scale * Math.sin(t) / (1 + Math.pow(Math.cos(t), 2));
        const y = offsetY + scale * Math.sin(t) * Math.cos(t) / (1 + Math.pow(Math.cos(t), 2));
        
        if (t === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.updatePosition();
        particle.draw();
      });
      
      requestAnimationFrame(drawInfinity);
    };

    drawInfinity();
  }, []);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        className="w-40 h-20"
      />
    </div>
  );
};

export default InfinityParticles;