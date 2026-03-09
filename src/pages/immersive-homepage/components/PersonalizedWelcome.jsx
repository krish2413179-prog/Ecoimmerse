import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // <-- 1. ADDED THIS IMPORT
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedWelcome = () => {
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    webgl: false,
    deviceMotion: false,
    touchSupport: false,
    screenSize: 'desktop',
  });
  
  const [userPath, setUserPath] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate(); // <-- 2. INITIALIZED THE NAVIGATE FUNCTION

  useEffect(() => {
    // Detect device capabilities
    const detectCapabilities = () => {
      const canvas = document.createElement('canvas');
      const webglSupport = !!(canvas?.getContext('webgl') || canvas?.getContext('experimental-webgl'));
      
      const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      const deviceMotionSupport = 'DeviceMotionEvent' in window;
      
      const screenWidth = window.innerWidth;
      let screenSize = 'desktop';
      if (screenWidth < 768) screenSize = 'mobile';
      else if (screenWidth < 1024) screenSize = 'tablet';

      setDeviceCapabilities({
        webgl: webglSupport,
        deviceMotion: deviceMotionSupport,
        touchSupport,
        screenSize,
      });
    };

    detectCapabilities();
    window.addEventListener('resize', detectCapabilities);
    return () => window.removeEventListener('resize', detectCapabilities);
  }, []);

  // <-- 3. CORRECTED THE ROUTES IN THIS ARRAY
  const pathOptions = [
    {
      id: 'journey',
      title: 'Start Your Impact Journey',
      description: 'Begin with personalized goals tailored to your lifestyle and track your progress.',
      icon: 'Compass',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      features: ['Personal Dashboard', 'Goal Tracking', 'Voice Journaling'],
      route: '/personal-impact-dashboard',
    },
    {
      id: 'community',
      title: 'Explore Community Forest',
      description: 'Connect with like-minded eco-warriors and see collective impact visualization.',
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      features: ['Tree Planting', 'Impact Visualization', 'Global Reach'],
      route: '/forest-dashboard', // Corrected path
    }
  ];

  const DeviceOptimizedExperience = () => {
    const { webgl, deviceMotion, touchSupport, screenSize } = deviceCapabilities;

    if (screenSize === 'mobile') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl p-6 organic-shadow mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Smartphone" size={24} className="text-trust-builder" />
            <h3 className="text-lg font-semibold text-foreground">Mobile Experience</h3>
          </div>
          <p className="text-text-secondary mb-4">
            Optimized for your mobile device with touch interactions and simplified 3D effects.
          </p>
          <div className="flex flex-wrap gap-2">
            {touchSupport && (
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                Touch Enabled
              </span>
            )}
            {deviceMotion && (
              <span className="bg-trust-builder/10 text-trust-builder px-3 py-1 rounded-full text-sm">
                Device Tilt
              </span>
            )}
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              PWA Ready
            </span>
          </div>
        </motion.div>
      );
    }

    if (screenSize === 'tablet') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl p-6 organic-shadow mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Tablet" size={24} className="text-secondary" />
            <h3 className="text-lg font-semibold text-foreground">Tablet Experience</h3>
          </div>
          <p className="text-text-secondary mb-4">
            Enhanced experience with gesture navigation and mid-complexity 3D scenes.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
              Gesture Navigation
            </span>
            {webgl && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                3D Enhanced
              </span>
            )}
            <span className="bg-trust-builder/10 text-trust-builder px-3 py-1 rounded-full text-sm">
              Landscape Optimized
            </span>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-6 organic-shadow mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Monitor" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Desktop Experience</h3>
        </div>
        <p className="text-text-secondary mb-4">
          Full immersive experience with advanced 3D scenes, spatial audio, and complex animations.
        </p>
        <div className="flex flex-wrap gap-2">
          {webgl && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              WebGL 3D
            </span>
          )}
          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
            Spatial Audio
          </span>
          <span className="bg-trust-builder/10 text-trust-builder px-3 py-1 rounded-full text-sm">
            Advanced Animations
          </span>
          <span className="bg-conversion-accent/10 text-conversion-accent px-3 py-1 rounded-full text-sm">
            Voice Commands
          </span>
        </div>
      </motion.div>
    );
  };

  const PathCard = ({ path, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-card rounded-2xl p-8 organic-shadow organic-transition cursor-pointer group"
      onClick={() => setUserPath(path)}
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${path?.bgColor} mb-6 group-hover:scale-110 organic-transition`}>
        <Icon name={path?.icon} size={32} className={path?.color} />
      </div>
      
      <h3 className="text-2xl font-poppins font-bold text-foreground mb-4">
        {path?.title}
      </h3>
      
      <p className="text-text-secondary mb-6 leading-relaxed">
        {path?.description}
      </p>
      
      <div className="space-y-2 mb-6">
        {path?.features?.map((feature, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <Icon name="Check" size={16} className={path?.color} />
            <span className="text-sm text-text-secondary">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        fullWidth
        iconName="ArrowRight"
        iconPosition="right"
        className="group-hover:bg-primary group-hover:text-white group-hover:border-primary organic-transition"
      >
        Choose This Path
      </Button>
    </motion.div>
  );

  const PathConfirmation = ({ selectedPath }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 organic-shadow"
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${selectedPath?.bgColor} mb-6`}
        >
          <Icon name={selectedPath?.icon} size={40} className={selectedPath?.color} />
        </motion.div>
        
        <h3 className="text-3xl font-poppins font-bold text-primary mb-4">
          Perfect Choice!
        </h3>
        
        <p className="text-lg text-text-secondary mb-8">
          You've selected "{selectedPath?.title}". Let's customize your experience 
          based on your device capabilities and preferences.
        </p>
      </div>

      <DeviceOptimizedExperience />
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="default"
          fullWidth
          iconName="Rocket"
          iconPosition="left"
          className="bg-primary hover:bg-primary/90 text-white"
          // <-- 4. CORRECTED THE NAVIGATION LOGIC
          onClick={() => {
            setShowWelcome(false);
            navigate(selectedPath?.route);
          }}
        >
          Start My Journey
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={() => setUserPath(null)}
        >
          Choose Different Path
        </Button>
      </div>
    </motion.div>
  );

  if (!showWelcome) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {!userPath ? (
            <div className="bg-card rounded-3xl p-8 lg:p-12 organic-shadow">
              <div className="text-center mb-12">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
                >
                  <Icon name="Sparkles" size={40} className="text-primary" />
                </motion.div>
                
                <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-primary mb-4">
                  Welcome to Ecoimmerse!
                </h2>
                
                <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                  Let's personalize your sustainability journey. Choose your preferred path and we'll optimize the experience for your device.
                </p>
              </div>

              <DeviceOptimizedExperience />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {pathOptions?.map((path, index) => (
                  <PathCard key={path?.id} path={path} index={index} />
                ))}
              </div>

              <div className="text-center">
                <Button
                  variant="ghost"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => setShowWelcome(false)}
                  className="text-text-secondary hover:text-foreground"
                >
                  Skip Personalization
                </Button>
              </div>
            </div>
          ) : (
            <PathConfirmation selectedPath={userPath} />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PersonalizedWelcome;