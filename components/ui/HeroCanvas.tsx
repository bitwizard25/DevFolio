'use client'
import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Initialize particles
        const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1,
        }));

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Move particle
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Mouse attraction (subtle)
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    particle.vx += (dx / dist) * 0.02;
                    particle.vy += (dy / dist) * 0.02;
                }

                // Limit velocity
                const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
                if (speed > 2) {
                    particle.vx = (particle.vx / speed) * 2;
                    particle.vy = (particle.vy / speed) * 2;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(10, 132, 255, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                particles.slice(i + 1).forEach((other) => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(10, 132, 255, ${0.15 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}
