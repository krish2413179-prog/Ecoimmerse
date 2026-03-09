import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const ForestGrid = ({ 
  treeData = [], 
  onTreeClick = () => {}, 
  animationTriggers = {},
  className = "" 
}) => {
  const [animatingTrees, setAnimatingTrees] = React.useState(new Set());
  const gridRef = React.useRef(null);

  React.useEffect(() => {
    // Handle new tree animations
    Object.entries(animationTriggers)?.forEach(([treeId, shouldAnimate]) => {
      if (shouldAnimate && !animatingTrees?.has(treeId)) {
        setAnimatingTrees(prev => new Set([...prev, treeId]));
        
        // Remove animation class after animation completes
        setTimeout(() => {
          setAnimatingTrees(prev => {
            const newSet = new Set(prev);
            newSet?.delete(treeId);
            return newSet;
          });
        }, 600);
      }
    });
  }, [animationTriggers, animatingTrees]);

  const handleTreeClick = (tree, event) => {
    event?.preventDefault();
    onTreeClick(tree);
  };

  const handleKeyDown = (tree, event) => {
    if (event?.key === 'Enter' || event?.key === ' ') {
      event?.preventDefault();
      onTreeClick(tree);
    }
  };

  const getTreeSize = (index) => {
    // Vary tree sizes for organic feel
    const sizes = ['w-8 h-8', 'w-10 h-10', 'w-12 h-12', 'w-6 h-6'];
    return sizes?.[index % sizes?.length];
  };

  const getTreeColor = (tree) => {
    // Different shades of green based on tree age/completion
    const age = tree?.completionDate ? 
      Math.floor((Date.now() - new Date(tree.completionDate)?.getTime()) / (1000 * 60 * 60 * 24)) : 0;
    
    if (age > 30) return 'text-primary'; // Mature tree
    if (age > 7) return 'text-success'; // Growing tree
    return 'text-accent'; // New tree
  };

  return (
    <div className={`w-full h-full min-h-[60vh] relative ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 breathing-bg">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>
      {/* Desktop: Organic Scatter Layout */}
      <div className="hidden md:block relative w-full h-full">
        {treeData?.map((tree, index) => {
          const isAnimating = animatingTrees?.has(tree?.id);
          const position = tree?.coordinates || {
            x: 20 + (index * 15) % 60,
            y: 20 + Math.floor(index / 4) * 20 % 60
          };

          return (
            <button
              key={tree?.id}
              onClick={(e) => handleTreeClick(tree, e)}
              onKeyDown={(e) => handleKeyDown(tree, e)}
              className={`absolute tree-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full p-2 ${
                isAnimating ? 'tree-growth' : ''
              }`}
              style={{
                left: `${position?.x}%`,
                top: `${position?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              aria-label={`Tree ${tree?.id} - ${tree?.missionTitle || 'Environmental mission'}`}
            >
              <Icon 
                name="TreePine" 
                className={`${getTreeSize(index)} ${getTreeColor(tree)} drop-shadow-sm`}
              />
            </button>
          );
        })}
      </div>
      {/* Mobile: Grid Layout */}
      <div className="md:hidden grid grid-cols-auto-fit-120 gap-4 p-4">
        {treeData?.map((tree, index) => {
          const isAnimating = animatingTrees?.has(tree?.id);

          return (
            <button
              key={tree?.id}
              onClick={(e) => handleTreeClick(tree, e)}
              onKeyDown={(e) => handleKeyDown(tree, e)}
              className={`flex flex-col items-center justify-center p-4 bg-card/50 rounded-lg border border-border tree-hover focus:outline-none focus:ring-2 focus:ring-ring min-h-[120px] ${
                isAnimating ? 'tree-growth' : ''
              }`}
              aria-label={`Tree ${tree?.id} - ${tree?.missionTitle || 'Environmental mission'}`}
            >
              <Icon 
                name="TreePine" 
                className={`w-12 h-12 ${getTreeColor(tree)} mb-2`}
              />
              <span className="text-xs font-caption text-muted-foreground text-center">
                Tree #{tree?.id}
              </span>
              {tree?.completionDate && (
                <span className="text-xs text-muted-foreground mt-1">
                  {new Date(tree.completionDate)?.toLocaleDateString()}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Empty State */}
      {treeData?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center py-16">
          <Icon name="Seedling" className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">
            Your Forest Awaits
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Complete environmental missions to plant your first tree and watch your community forest grow.
          </p>
        </div>
      )}
    </div>
  );
};

export default ForestGrid;