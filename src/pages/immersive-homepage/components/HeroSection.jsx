import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const HeroSection = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 2 + 1,
    }));
    setParticles(initialParticles);

    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePosition({ x: e?.clientX, y: e?.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleVoiceActivation = () => {
    setIsVoiceActive(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsVoiceActive(false);
      // Voice command processed
    }, 3000);
  };

  const ParticleSystem = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles?.map((particle) => (
        <motion.div
          key={particle?.id}
          className="absolute w-1 h-1 bg-secondary rounded-full"
          style={{
            left: particle?.x,
            top: particle?.y,
            opacity: particle?.opacity,
          }}
          animate={{
            x: [0, Math.sin(Date.now() * 0.001 + particle?.id) * 20],
            y: [0, Math.cos(Date.now() * 0.001 + particle?.id) * 15],
          }}
          transition={{
            duration: particle?.speed,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );

  const ForestCanopy = () => (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition?.x}px ${mousePosition?.y}px, 
            rgba(45, 90, 39, 0.1) 0%, 
            rgba(45, 90, 39, 0.3) 50%, 
            rgba(45, 90, 39, 0.6) 100%)`,
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,400 Q300,200 600,400 T1200,400 L1200,0 L0,0 Z"
          fill="var(--color-primary)"
          opacity="0.8"
          animate={{
            d: [
              "M0,400 Q300,200 600,400 T1200,400 L1200,0 L0,0 Z",
              "M0,420 Q300,180 600,420 T1200,420 L1200,0 L0,0 Z",
              "M0,400 Q300,200 600,400 T1200,400 L1200,0 L0,0 Z",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,450 Q400,250 800,450 T1200,450 L1200,0 L0,0 Z"
          fill="var(--color-secondary)"
          opacity="0.6"
          animate={{
            d: [
              "M0,450 Q400,250 800,450 T1200,450 L1200,0 L0,0 Z",
              "M0,470 Q400,230 800,470 T1200,470 L1200,0 L0,0 Z",
              "M0,450 Q400,250 800,450 T1200,450 L1200,0 L0,0 Z",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-background via-surface to-muted overflow-hidden"
      style={{ y }}
    >
      <ForestCanopy />
      <ParticleSystem />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm organic-shadow">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse-gentle"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="var(--color-primary)"
                />
                <path
                  d="M14 32C14 28 16 24 24 20C32 24 34 28 34 32"
                  stroke="var(--color-secondary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="16"
                  r="4"
                  fill="var(--color-secondary)"
                />
                <path
                  d="M19 26L21 28L29 20"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-poppins font-bold text-primary mb-6 leading-tight"
          >
            Every Action Creates
            <br />
            <span className="text-secondary">Ripples of Change</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your environmental impact through immersive experiences, 
            community challenges, and real-time visualization of your contribution 
            to a sustainable future.
          </motion.p>

          {/* Voice Activation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-12"
          >
            <div className="inline-flex items-center space-x-4 bg-card/80 backdrop-blur-sm rounded-full px-8 py-4 organic-shadow">
              <motion.div
                animate={isVoiceActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, repeat: isVoiceActive ? Infinity : 0 }}
                className={`w-4 h-4 rounded-full ${
                  isVoiceActive ? 'bg-conversion-accent' : 'bg-secondary'
                }`}
              />
              <span className="text-foreground font-medium">
                {isVoiceActive ? 'Listening...' : 'Say "Hello" to begin your journey'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName="Mic"
                onClick={handleVoiceActivation}
                className={`${isVoiceActive ? 'text-conversion-accent' : 'text-secondary'}`}
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button
              variant="default"
              size="lg"
              iconName="Leaf"
              iconPosition="left"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg organic-transition hover:scale-105 organic-shadow"
            >
              Start Your Impact Journey
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              iconName="Users"
              iconPosition="left"
              className="px-8 py-4 text-lg organic-transition hover:scale-105"
            >
              Explore Community Forest
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              iconName="Target"
              iconPosition="left"
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 text-lg organic-transition hover:scale-105"
            >
              Take a Challenge
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-text-secondary"
            >
              <span className="text-sm mb-2">Discover Your Impact</span>
              <Icon name="ChevronDown" size={24} />
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Ambient Sound Visualization */}
      <div className="absolute bottom-4 right-4 z-20">
        <motion.div
          className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 organic-shadow"
          whileHover={{ scale: 1.05 }}
        >
          <Icon name="Volume2" size={16} className="text-secondary" />
          <div className="flex space-x-1">
            {[1, 2, 3, 4]?.map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-secondary rounded-full"
                animate={{
                  height: [4, 12, 4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary">Nature Sounds</span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;