import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Icon from 'components/AppIcon';

const ImpactCounters = () => {
  const [counters, setCounters] = useState({
    forestActions: 0,
    carbonOffset: 0,
    communityMembers: 0,
    challengesCompleted: 0,
  });

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const impactData = [
    {
      id: 'forestActions',
      label: 'Forest Actions Taken',
      value: 2300000,
      suffix: '+',
      icon: 'TreePine',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Individual eco-actions contributing to global change',
    },
    {
      id: 'carbonOffset',
      label: 'Carbon Offset This Month',
      value: 450,
      suffix: ' tons',
      icon: 'Leaf',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'CO₂ equivalent reduced through community efforts',
    },
    {
      id: 'communityMembers',
      label: 'Active Community Members',
      value: 89500,
      suffix: '+',
      icon: 'Users',
      color: 'text-trust-builder',
      bgColor: 'bg-trust-builder/10',
      description: 'Eco-warriors making a difference worldwide',
    },
    {
      id: 'challengesCompleted',
      label: 'Challenges Completed',
      value: 156000,
      suffix: '+',
      icon: 'Target',
      color: 'text-conversion-accent',
      bgColor: 'bg-conversion-accent/10',
      description: 'Sustainability missions accomplished together',
    },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  const animateCounter = (key, targetValue, duration = 2000) => {
    const startTime = Date.now();
    const startValue = counters?.[key];

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);

      setCounters(prev => ({
        ...prev,
        [key]: currentValue
      }));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    if (isInView) {
      // Start counter animations with staggered delays
      impactData?.forEach((item, index) => {
        setTimeout(() => {
          animateCounter(item?.id, item?.value, 2000 + index * 200);
        }, index * 300);
      });

      // Trigger celebration particles
      controls?.start("visible");
    }
  }, [isInView, controls]);

  const ParticleBurst = ({ isActive, color }) => {
    if (!isActive) return null;

    return (
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 })?.map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${color?.replace('text-', 'bg-')} rounded-full`}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 1,
              scale: 0 
            }}
            animate={{
              x: Math.cos((i * Math.PI * 2) / 8) * 40,
              y: Math.sin((i * Math.PI * 2) / 8) * 40,
              opacity: 0,
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              ease: "easeOut"
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    );
  };

  const CounterCard = ({ item, index }) => {
    const [showBurst, setShowBurst] = useState(false);
    const currentValue = counters?.[item?.id];
    const isComplete = currentValue >= item?.value;

    useEffect(() => {
      if (isComplete && isInView) {
        setShowBurst(true);
        setTimeout(() => setShowBurst(false), 1000);
      }
    }, [isComplete, isInView]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative group"
      >
        <div className={`bg-card rounded-2xl p-8 organic-shadow organic-transition hover:scale-105 hover:-translate-y-2 ${item?.bgColor} border border-border`}>
          <div className="relative">
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${item?.bgColor} mb-6 relative`}>
              <Icon name={item?.icon} size={32} className={item?.color} />
              <ParticleBurst isActive={showBurst} color={item?.color} />
            </div>

            {/* Counter */}
            <div className="mb-4">
              <motion.div
                className={`text-4xl lg:text-5xl font-poppins font-bold ${item?.color} mb-2`}
                animate={isComplete ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {item?.id === 'carbonOffset' ? currentValue : formatNumber(currentValue)}
                {item?.suffix}
              </motion.div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item?.label}
              </h3>
              
              <p className="text-sm text-text-secondary leading-relaxed">
                {item?.description}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <motion.div
                className={`h-2 rounded-full ${item?.color?.replace('text-', 'bg-')}`}
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ duration: 2, delay: index * 0.3 }}
              />
            </div>

            {/* Real-time Indicator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <motion.div
                  className={`w-2 h-2 rounded-full ${item?.color?.replace('text-', 'bg-')}`}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-text-secondary">Live Updates</span>
              </div>
              
              <motion.div
                className="text-xs text-text-secondary"
                animate={isComplete ? { color: item?.color?.replace('text-', '') } : {}}
              >
                Updated now
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl lg:text-6xl font-poppins font-bold text-primary mb-6">
            Our Collective Impact
          </h2>
          <p className="text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Together, we're creating measurable change. Watch our community's 
            environmental impact grow in real-time as more eco-warriors join the movement.
          </p>
        </motion.div>

        {/* Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactData?.map((item, index) => (
            <CounterCard key={item?.id} item={item} index={index} />
          ))}
        </div>

        {/* Achievement Celebration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 lg:mt-24 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-trust-builder/10 rounded-2xl p-8 lg:p-12 organic-shadow">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Icon name="Trophy" size={48} className="text-conversion-accent" />
            </motion.div>
            
            <h3 className="text-3xl lg:text-4xl font-poppins font-bold text-primary mb-4">
              Milestone Achievement Unlocked!
            </h3>
            
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Our community just reached 2.3 million forest actions! 
              Every small step contributes to this incredible collective impact.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-conversion-accent hover:bg-conversion-accent/90 text-white px-8 py-4 rounded-full font-medium text-lg organic-transition organic-shadow flex items-center space-x-2 mx-auto"
            >
              <Icon name="Sparkles" size={20} />
              <span>Celebrate With Us</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactCounters;