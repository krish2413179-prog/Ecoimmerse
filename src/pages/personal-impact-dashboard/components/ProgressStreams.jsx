import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const ProgressStreams = ({ weeklyData }) => {
  const carbonRef = useRef(null);
  const wasteRef = useRef(null);
  const energyRef = useRef(null);

  useEffect(() => {
    const createParticleStream = (canvas, color, intensity) => {
      if (!canvas) return;
      
      const ctx = canvas?.getContext('2d');
      const rect = canvas?.getBoundingClientRect();
      canvas.width = rect?.width * window.devicePixelRatio;
      canvas.height = rect?.height * window.devicePixelRatio;
      ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);

      const particles = [];
      
      const animate = () => {
        ctx?.clearRect(0, 0, rect?.width, rect?.height);
        
        // Create new particles
        if (Math.random() < intensity / 100) {
          particles?.push({
            x: 0,
            y: Math.random() * rect?.height,
            vx: 2 + Math.random() * 3,
            vy: (Math.random() - 0.5) * 2,
            life: 100,
            size: 2 + Math.random() * 3
          });
        }

        // Update and draw particles
        for (let i = particles?.length - 1; i >= 0; i--) {
          const particle = particles?.[i];
          particle.x += particle?.vx;
          particle.y += particle?.vy;
          particle.life--;

          if (particle?.life <= 0 || particle?.x > rect?.width) {
            particles?.splice(i, 1);
            continue;
          }

          const alpha = particle?.life / 100;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          ctx?.beginPath();
          ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
          ctx?.fill();
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
      };

      animate();
    };

    createParticleStream(carbonRef?.current, '#29B6F6', weeklyData?.carbonReduction);
    createParticleStream(wasteRef?.current, '#7CB342', weeklyData?.wasteReduction);
    createParticleStream(energyRef?.current, '#FF9800', weeklyData?.energySavings);
  }, [weeklyData]);

  const streamData = [
    {
      title: 'Carbon Reduction',
      value: weeklyData?.carbonReduction,
      unit: 'kg CO₂',
      icon: 'Cloud',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      ref: carbonRef
    },
    {
      title: 'Waste Reduction',
      value: weeklyData?.wasteReduction,
      unit: 'kg',
      icon: 'Recycle',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      ref: wasteRef
    },
    {
      title: 'Energy Savings',
      value: weeklyData?.energySavings,
      unit: 'kWh',
      icon: 'Zap',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      ref: energyRef
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Progress Streams</h3>
      {streamData?.map((stream, index) => (
        <motion.div
          key={stream?.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative ${stream?.bgColor} rounded-organic p-4 organic-shadow overflow-hidden`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-white rounded-organic ${stream?.color}`}>
                <Icon name={stream?.icon} size={20} />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{stream?.title}</h4>
                <p className="text-sm text-muted-foreground">This week</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{stream?.value}</p>
              <p className="text-sm text-muted-foreground">{stream?.unit}</p>
            </div>
          </div>
          
          <canvas
            ref={stream?.ref}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          />
          
          {/* Progress bar */}
          <div className="relative mt-3">
            <div className="w-full bg-white/50 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(stream?.value, 100)}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressStreams;