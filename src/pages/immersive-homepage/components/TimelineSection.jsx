import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Icon from 'components/AppIcon';

const TimelineSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const timelineStages = [
    {
      id: 1,
      title: "Plant Your Seed",
      description: "Begin your sustainability journey with your first eco-action. Every forest starts with a single seed.",
      icon: "Sprout",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      progress: 0,
    },
    {
      id: 2,
      title: "Growing Roots",
      description: "Establish sustainable habits and connect with like-minded community members who share your values.",
      icon: "TreePine",
      color: "text-primary",
      bgColor: "bg-primary/10",
      progress: 25,
    },
    {
      id: 3,
      title: "Branching Out",
      description: "Expand your impact by taking on challenges, mentoring others, and exploring new sustainability areas.",
      icon: "Leaf",
      color: "text-trust-builder",
      bgColor: "bg-trust-builder/10",
      progress: 50,
    },
    {
      id: 4,
      title: "Bearing Fruit",
      description: "See measurable results from your actions and inspire others through your transformation story.",
      icon: "Apple",
      color: "text-conversion-accent",
      bgColor: "bg-conversion-accent/10",
      progress: 75,
    },
    {
      id: 5,
      title: "Forest Guardian",
      description: "Become a sustainability leader, creating lasting change in your community and beyond.",
      icon: "Crown",
      color: "text-warning",
      bgColor: "bg-warning/10",
      progress: 100,
    },
  ];

  const TimelineItem = ({ stage, index }) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, margin: "-100px" });
    const isEven = index % 2 === 0;

    return (
      <motion.div
        ref={itemRef}
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-16 lg:mb-24`}
      >
        {/* Content */}
        <div className={`flex-1 ${isEven ? 'pr-8 lg:pr-16' : 'pl-8 lg:pl-16'}`}>
          <motion.div
            className={`bg-card rounded-2xl p-8 organic-shadow organic-transition hover:scale-105 ${
              isEven ? 'text-right lg:text-left' : 'text-left lg:text-right'
            }`}
            whileHover={{ y: -5 }}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stage?.bgColor} mb-6`}>
              <Icon name={stage?.icon} size={32} className={stage?.color} />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-poppins font-bold text-foreground mb-4">
              {stage?.title}
            </h3>
            
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              {stage?.description}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <motion.div
                className={`h-2 rounded-full ${stage?.color?.replace('text-', 'bg-')}`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${stage?.progress}%` } : {}}
                transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
              />
            </div>
            
            <span className="text-sm font-medium text-text-secondary">
              {stage?.progress}% Complete
            </span>
          </motion.div>
        </div>
        {/* Timeline Connector */}
        <div className="relative flex-shrink-0">
          <motion.div
            className="w-4 h-4 rounded-full bg-primary border-4 border-background relative z-10"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          />
          
          {index < timelineStages?.length - 1 && (
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 lg:h-24 bg-primary/30"
              initial={{ height: 0 }}
              animate={isInView ? { height: '6rem' } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            />
          )}
        </div>
        {/* Spacer for opposite side */}
        <div className="flex-1" />
      </motion.div>
    );
  };

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-gradient-to-b from-muted to-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl lg:text-6xl font-poppins font-bold text-primary mb-6">
            From Seed to Forest
          </h2>
          <p className="text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Your sustainability journey unfolds through five transformative stages. 
            Watch your impact grow from a single action to a thriving ecosystem of change.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-primary/20"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
          />

          {/* Timeline Items */}
          <div className="relative">
            {timelineStages?.map((stage, index) => (
              <TimelineItem key={stage?.id} stage={stage} index={index} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-24"
        >
          <div className="bg-card rounded-2xl p-8 lg:p-12 organic-shadow">
            <h3 className="text-3xl lg:text-4xl font-poppins font-bold text-primary mb-6">
              Ready to Plant Your Seed?
            </h3>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of eco-warriors who have already started their transformation journey. 
              Your forest of change begins with a single step.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium text-lg organic-transition organic-shadow flex items-center space-x-2"
              >
                <Icon name="Sprout" size={20} />
                <span>Begin Your Journey</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-medium text-lg organic-transition flex items-center space-x-2"
              >
                <Icon name="PlayCircle" size={20} />
                <span>Watch Journey Video</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;