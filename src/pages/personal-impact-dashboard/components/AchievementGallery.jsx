import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const AchievementGallery = ({ achievements, newAchievements = [] }) => {
  const [celebratingAchievement, setCelebratingAchievement] = useState(null);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (newAchievements?.length > 0) {
      const latest = newAchievements?.[0];
      setCelebratingAchievement(latest);
      setShowParticles(true);
      
      setTimeout(() => {
        setCelebratingAchievement(null);
        setShowParticles(false);
      }, 3000);
    }
  }, [newAchievements]);

  const achievementCategories = [
    {
      title: 'Carbon Warrior',
      achievements: achievements?.filter(a => a?.category === 'carbon'),
      icon: 'Cloud',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Waste Reducer',
      achievements: achievements?.filter(a => a?.category === 'waste'),
      icon: 'Recycle',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Energy Saver',
      achievements: achievements?.filter(a => a?.category === 'energy'),
      icon: 'Zap',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const BadgeComponent = ({ achievement, index, isNew = false }) => (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
        y: isNew ? [0, -10, 0] : 0
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        y: { repeat: isNew ? Infinity : 0, duration: 2 }
      }}
      className={`relative p-4 bg-white rounded-organic organic-shadow hover:scale-105 organic-transition cursor-pointer ${
        isNew ? 'ring-2 ring-conversion-accent' : ''
      }`}
    >
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
          achievement?.earned ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
        }`}>
          <Icon name={achievement?.icon} size={24} />
        </div>
        <h4 className="font-medium text-sm text-foreground mb-1">{achievement?.title}</h4>
        <p className="text-xs text-muted-foreground">{achievement?.description}</p>
        {achievement?.earned && (
          <div className="mt-2 text-xs text-primary font-medium">
            Earned {achievement?.earnedDate}
          </div>
        )}
      </div>
      
      {isNew && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-conversion-accent text-white text-xs px-2 py-1 rounded-full"
        >
          NEW!
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Achievement Gallery</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Award" size={16} />
          <span>{achievements?.filter(a => a?.earned)?.length} / {achievements?.length}</span>
        </div>
      </div>
      {/* Celebration Modal */}
      <AnimatePresence>
        {celebratingAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="bg-white p-8 rounded-organic organic-shadow max-w-md mx-4 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-4 bg-primary text-white rounded-full flex items-center justify-center"
              >
                <Icon name={celebratingAchievement?.icon} size={32} />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-2">Achievement Unlocked!</h3>
              <h4 className="text-lg font-semibold text-primary mb-2">{celebratingAchievement?.title}</h4>
              <p className="text-muted-foreground">{celebratingAchievement?.description}</p>
              
              {showParticles && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)]?.map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        x: '50%', 
                        y: '50%', 
                        scale: 0,
                        opacity: 1 
                      }}
                      animate={{ 
                        x: `${50 + (Math.random() - 0.5) * 200}%`,
                        y: `${50 + (Math.random() - 0.5) * 200}%`,
                        scale: 1,
                        opacity: 0
                      }}
                      transition={{ duration: 2, delay: i * 0.1 }}
                      className="absolute w-2 h-2 bg-conversion-accent rounded-full"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Achievement Categories */}
      {achievementCategories?.map((category, categoryIndex) => (
        <motion.div
          key={category?.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className={`${category?.bgColor} rounded-organic p-4`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 bg-white rounded-organic ${category?.color}`}>
              <Icon name={category?.icon} size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{category?.title}</h4>
              <p className="text-sm text-muted-foreground">
                {category?.achievements?.filter(a => a?.earned)?.length} / {category?.achievements?.length} earned
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category?.achievements?.map((achievement, index) => (
              <BadgeComponent
                key={achievement?.id}
                achievement={achievement}
                index={index}
                isNew={newAchievements?.some(na => na?.id === achievement?.id)}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementGallery;