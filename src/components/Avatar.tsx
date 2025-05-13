import React, { useRef, useEffect } from 'react';
import { usePersonality } from '../context/PersonalityContext';
import { getDominantTraits, traitColorMap } from '../data/traits';

interface AvatarProps {
  isAnimating?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Avatar: React.FC<AvatarProps> = ({ 
  isAnimating = false,
  size = 'medium'
}) => {
  const { traitScores } = usePersonality();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<any[]>([]);
  
  // Calculate size values based on the size prop
  const dimensions = {
    small: { width: 150, height: 150 },
    medium: { width: 300, height: 300 },
    large: { width: 500, height: 500 }
  }[size];
  
  // Calculate dominant traits and their colors
  const dominantTraits = getDominantTraits(traitScores);
  const colors = dominantTraits.map(trait => traitColorMap[trait]);
  
  // Calculate personality shape parameters
  const calculateAvatarParams = () => {
    const openness = traitScores.openness / 100;
    const conscientiousness = traitScores.conscientiousness / 100;
    const extraversion = traitScores.extraversion / 100;
    const agreeableness = traitScores.agreeableness / 100;
    const neuroticism = traitScores.neuroticism / 100;
    const creativity = traitScores.creativity / 100;
    const playfulness = traitScores.playfulness / 100;
    
    // Calculate shape complexity (more spikes/nodes with higher openness/creativity)
    const nodes = Math.floor(5 + 10 * (openness + creativity) / 2);
    
    // Calculate shape irregularity (more regular with conscientiousness, more chaotic with neuroticism)
    const irregularity = 0.2 + 0.6 * (neuroticism / 100) - 0.3 * (conscientiousness / 100);
    
    // Calculate animation speed (faster with extraversion and playfulness)
    const speed = 1 + 3 * (extraversion + playfulness) / 2;
    
    // Calculate smoothness (smoother with agreeableness)
    const smoothness = 0.3 + 0.7 * agreeableness / 100;
    
    return { nodes, irregularity, speed, smoothness };
  };
  
  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const params = calculateAvatarParams();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    
    particlesRef.current = [];
    
    // Create particles around the center
    for (let i = 0; i < params.nodes; i++) {
      const angle = (i / params.nodes) * Math.PI * 2;
      const distance = radius * (1 - params.irregularity + Math.random() * params.irregularity * 2);
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      particlesRef.current.push({
        x, y,
        originX: x, originY: y,
        size: 3 + Math.random() * 7,
        color: colors[i % colors.length],
        speed: params.speed * (0.7 + Math.random() * 0.6)
      });
    }
  };
  
  const drawAvatar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const params = calculateAvatarParams();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw connecting lines first (behind particles)
    ctx.beginPath();
    particlesRef.current.forEach((particle, i) => {
      const nextParticle = particlesRef.current[(i + 1) % particlesRef.current.length];
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(nextParticle.x, nextParticle.y);
    });
    
    // Create gradient for lines
    const gradient = ctx.createLinearGradient(
      centerX - 100, centerY - 100, 
      centerX + 100, centerY + 100
    );
    
    colors.forEach((color, i) => {
      gradient.addColorStop(i / (colors.length - 1 || 1), color + '80'); // Add transparency
    });
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Fill shape with gradient
    ctx.beginPath();
    particlesRef.current.forEach((particle, i) => {
      if (i === 0) {
        ctx.moveTo(particle.x, particle.y);
      } else {
        const prevParticle = particlesRef.current[i - 1];
        
        // Use bezier curves for smoother shapes with higher agreeableness
        const cpX1 = prevParticle.x + (particle.x - prevParticle.x) * params.smoothness;
        const cpY1 = prevParticle.y;
        const cpX2 = particle.x - (particle.x - prevParticle.x) * params.smoothness;
        const cpY2 = particle.y;
        
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, particle.x, particle.y);
      }
    });
    
    // Close the shape by connecting back to the first point
    if (particlesRef.current.length > 0) {
      const firstParticle = particlesRef.current[0];
      const lastParticle = particlesRef.current[particlesRef.current.length - 1];
      
      const cpX1 = lastParticle.x + (firstParticle.x - lastParticle.x) * params.smoothness;
      const cpY1 = lastParticle.y;
      const cpX2 = firstParticle.x - (firstParticle.x - lastParticle.x) * params.smoothness;
      const cpY2 = firstParticle.y;
      
      ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, firstParticle.x, firstParticle.y);
    }
    
    const fillGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, canvas.width / 2
    );
    
    colors.forEach((color, i) => {
      fillGradient.addColorStop(i / (colors.length || 1), color + '30'); // Very transparent
    });
    
    ctx.fillStyle = fillGradient;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    // Draw particles
    particlesRef.current.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
  };
  
  const updateParticles = () => {
    const time = Date.now() * 0.001;
    const params = calculateAvatarParams();
    
    particlesRef.current.forEach((particle, i) => {
      // Calculate dynamic movement based on personality traits
      const angle = time * particle.speed + (i * Math.PI * 2) / particlesRef.current.length;
      const amplitude = 5 + params.irregularity * 15;
      
      particle.x = particle.originX + Math.cos(angle) * amplitude;
      particle.y = particle.originY + Math.sin(angle) * amplitude;
    });
  };
  
  const animate = () => {
    updateParticles();
    drawAvatar();
    animationRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set canvas size with device pixel ratio for sharp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = dimensions.width * dpr;
      canvas.height = dimensions.height * dpr;
      
      // Adjust canvas CSS size
      canvas.style.width = `${dimensions.width}px`;
      canvas.style.height = `${dimensions.height}px`;
      
      // Scale context to match device pixel ratio
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      
      initParticles();
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [traitScores, size]);
  
  // Apply a "pulse" effect when answering questions
  useEffect(() => {
    if (isAnimating) {
      initParticles(); // Reinitialize particles for transition effect
    }
  }, [isAnimating]);
  
  return (
    <div className={`relative ${isAnimating ? 'animate-pulse' : ''}`}>
      <canvas
        ref={canvasRef}
        className="transition-transform duration-500 ease-out"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: isAnimating ? 'scale(1.05)' : 'scale(1)'
        }}
      />
    </div>
  );
};