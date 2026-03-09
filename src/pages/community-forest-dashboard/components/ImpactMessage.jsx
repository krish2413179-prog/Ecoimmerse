import React from 'react';
import Icon from 'components/AppIcon';

const ImpactMessage = ({ 
  totalTrees = 0,
  className = "" 
}) => {
  const getImpactMessage = (treeCount) => {
    if (treeCount === 0) {
      return "Ready to plant your first tree? Complete an eco-mission to get started!";
    } else if (treeCount < 10) {
      return "Great start! Every tree makes a difference in our community forest.";
    } else if (treeCount < 50) {
      return "Amazing progress! Our community forest is taking root and growing strong.";
    } else if (treeCount < 100) {
      return "Incredible impact! Together, we're creating a thriving digital ecosystem.";
    } else {
      return "Together, our community is making a real difference, planting green seeds for a sustainable future.";
    }
  };

  const getImpactStats = (treeCount) => {
    const co2Absorbed = Math.round(treeCount * 48); // 48 lbs CO2 per tree per year
    const oxygenProduced = Math.round(treeCount * 260); // 260 lbs oxygen per tree per year
    
    return { co2Absorbed, oxygenProduced };
  };

  const { co2Absorbed, oxygenProduced } = getImpactStats(totalTrees);

  return (
    <div className={`text-center space-y-6 ${className}`}>
      {/* Main Impact Message */}
      <div className="max-w-2xl mx-auto">
        <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
          {getImpactMessage(totalTrees)}
        </p>
      </div>
      {/* Environmental Impact Stats */}
      {totalTrees > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Wind" size={20} className="text-success" />
              <span className="text-2xl font-data font-bold text-success">
                {co2Absorbed?.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              lbs CO₂ absorbed annually
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Leaf" size={20} className="text-accent-foreground" />
              <span className="text-2xl font-data font-bold text-accent-foreground">
                {oxygenProduced?.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              lbs oxygen produced annually
            </p>
          </div>
        </div>
      )}
      {/* Call to Action */}
      {totalTrees === 0 && (
        <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Icon name="Seedling" size={24} className="text-accent-foreground" />
            <h3 className="text-lg font-semibold text-accent-foreground">
              Plant Your First Tree
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Complete environmental missions to contribute to our community forest and track your positive impact.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span className="bg-muted px-2 py-1 rounded">Recycling Challenge</span>
            <span className="bg-muted px-2 py-1 rounded">Energy Conservation</span>
            <span className="bg-muted px-2 py-1 rounded">Water Saving</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpactMessage;