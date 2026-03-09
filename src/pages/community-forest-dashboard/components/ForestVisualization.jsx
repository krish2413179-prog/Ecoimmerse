import React, { useState, useEffect } from 'react';
import ForestGrid from 'components/ui/ForestGrid';
import TreeModal from 'components/ui/TreeModal';

const ForestVisualization = ({ 
  treeData = [], 
  onTreePlanted = () => {},
  className = "" 
}) => {
  const [selectedTree, setSelectedTree] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [animationTriggers, setAnimationTriggers] = React.useState({});

  React.useEffect(() => {
    // Trigger animations for new trees
    const newTriggers = {};
    treeData?.forEach(tree => {
      const plantedRecently = tree?.completionDate && 
        (Date.now() - new Date(tree.completionDate)?.getTime()) < 5000; // 5 seconds
      if (plantedRecently) {
        newTriggers[tree.id] = true;
      }
    });
    
    if (Object.keys(newTriggers)?.length > 0) {
      setAnimationTriggers(newTriggers);
      
      // Clear triggers after animation
      setTimeout(() => {
        setAnimationTriggers({});
      }, 1000);
    }
  }, [treeData]);

  const handleTreeClick = (tree) => {
    setSelectedTree(tree);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTree(null);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Forest Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-success/10 to-accent/20 breathing-bg" />
      </div>

      {/* Forest Grid */}
      <div className="relative z-10">
        <ForestGrid
          treeData={treeData}
          onTreeClick={handleTreeClick}
          animationTriggers={animationTriggers}
          className="min-h-[500px] md:min-h-[600px]"
        />
      </div>

      {/* Tree Detail Modal */}
      <TreeModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        treeData={selectedTree}
      />
    </div>
  );
};

export default ForestVisualization;