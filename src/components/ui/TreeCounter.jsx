import React, { useState, useEffect } from 'react';

const TreeCounter = ({ 
  currentCount = 0, 
  targetCount = 0, 
  onMilestone = () => {},
  className = "" 
}) => {
  const [displayCount, setDisplayCount] = React.useState(currentCount);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (currentCount !== displayCount) {
      setIsAnimating(true);
      
      // Animate counter increment
      const increment = currentCount > displayCount ? 1 : -1;
      const timer = setInterval(() => {
        setDisplayCount(prev => {
          const next = prev + increment;
          if ((increment > 0 && next >= currentCount) || (increment < 0 && next <= currentCount)) {
            clearInterval(timer);
            setIsAnimating(false);
            
            // Check for milestone
            if (currentCount > 0 && currentCount % 100 === 0) {
              onMilestone(currentCount);
            }
            
            return currentCount;
          }
          return next;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [currentCount, displayCount, onMilestone]);

  const formatNumber = (num) => {
    return num?.toLocaleString();
  };

  return (
    <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="bg-card/95 backdrop-blur-sm rounded-lg shadow-organic-md px-8 py-6 text-center border border-border">
        <div className="space-y-2">
          <h1 className="text-sm font-heading font-medium text-muted-foreground uppercase tracking-wide">
            Community Forest
          </h1>
          <div className={`font-data font-medium text-counter text-primary transition-all duration-300 ${
            isAnimating ? 'celebration-pulse' : ''
          }`}>
            {formatNumber(displayCount)}
          </div>
          <p className="text-sm font-body text-text-secondary">
            Trees planted together
          </p>
        </div>
        
        {targetCount > currentCount && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progress to next milestone</span>
              <span>{Math.ceil((targetCount - currentCount) / 100) * 100}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-500 ease-organic"
                style={{ 
                  width: `${Math.min((currentCount / targetCount) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeCounter;