import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const ImpactTree = ({ impactScore, season, isVoiceActive }) => {
  const canvasRef = useRef(null);
  const [treeGrowth, setTreeGrowth] = useState(0);

  useEffect(() => {
    const growth = Math.min(impactScore / 1000, 1);
    setTreeGrowth(growth);
  }, [impactScore]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const rect = canvas?.getBoundingClientRect();
    canvas.width = rect?.width * window.devicePixelRatio;
    canvas.height = rect?.height * window.devicePixelRatio;
    ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);

    let localParticles = [];
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles?.push({
          x: Math.random() * rect?.width,
          y: Math.random() * rect?.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: Math.random() * 100,
          maxLife: 100,
          color: season === 'spring' ? '#7CB342' : season === 'summer' ? '#4CAF50' : season === 'autumn' ? '#FF9800' : '#29B6F6'
        });
      }
      localParticles = newParticles;
    };

    createParticles();
    
    let animationFrameId;

    const animate = () => {
      ctx?.clearRect(0, 0, rect?.width, rect?.height);
      
      // Draw tree trunk
      const trunkHeight = 80 * treeGrowth;
      ctx.fillStyle = '#8D6E63';
      ctx?.fillRect(rect?.width / 2 - 8, rect?.height - trunkHeight, 16, trunkHeight);

      // Draw tree crown
      const crownRadius = 60 * treeGrowth;
      ctx?.beginPath();
      ctx?.arc(rect?.width / 2, rect?.height - trunkHeight, crownRadius, 0, Math.PI * 2);
      ctx.fillStyle = season === 'spring' ? '#7CB342' : season === 'summer' ? '#4CAF50' : season === 'autumn' ? '#FF9800' : '#2D5A27';
      ctx?.fill();

      // Draw particles
      localParticles?.forEach((particle, index) => {
        particle.x += particle?.vx;
        particle.y += particle?.vy;
        particle.life--;

        if (particle?.life <= 0) {
          particle.x = Math.random() * rect?.width;
          particle.y = Math.random() * rect?.height;
          particle.life = particle?.maxLife;
        }

        const alpha = particle?.life / particle?.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle?.color;
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, 2, 0, Math.PI * 2);
        ctx?.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [season, treeGrowth]);

  const getSeasonIcon = () => {
    switch (season) {
      case 'spring': return 'Flower';
      case 'summer': return 'Sun';
      case 'autumn': return 'Leaf';
      case 'winter': return 'Snowflake';
      default: return 'TreePine';
    }
  };

  return (
    <div className="relative w-full h-80 bg-gradient-to-b from-sky-100 to-green-50 rounded-organic overflow-hidden organic-shadow">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Voice indicator */}
      {isVoiceActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 bg-accent text-white p-2 rounded-full organic-shadow"
        >
          <Icon name="Mic" size={16} />
        </motion.div>
      )}
      {/* Season indicator */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-organic">
        <Icon name={getSeasonIcon()} size={16} className="text-primary" />
        <span className="text-sm font-medium capitalize text-foreground">{season}</span>
      </div>
      {/* Growth percentage */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-organic">
        <span className="text-sm font-medium text-foreground">
          Growth: {Math.round(treeGrowth * 100)}%
        </span>
      </div>
      {/* Impact score */}
      <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-organic organic-shadow">
        <span className="text-sm font-bold">{impactScore?.toLocaleString()} pts</span>
      </div>
    </div>
  );
};

export default ImpactTree;