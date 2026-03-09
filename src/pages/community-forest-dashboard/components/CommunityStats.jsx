import React from 'react';
import Icon from 'components/AppIcon';

const CommunityStats = ({ 
  totalTrees = 0, 
  todayTrees = 0, 
  activeMembers = 0,
  className = "" 
}) => {
  const formatNumber = (num) => {
    return num?.toLocaleString();
  };

  const stats = [
    {
      id: 'total',
      label: 'Total Trees Planted',
      value: totalTrees,
      icon: 'TreePine',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'today',
      label: 'Trees Today',
      value: todayTrees,
      icon: 'Sprout',
      color: 'text-accent-foreground',
      bgColor: 'bg-accent/20'
    },
    {
      id: 'members',
      label: 'Active Members',
      value: activeMembers,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card rounded-lg shadow-organic p-6 border border-border tree-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className="text-right">
              <div className={`text-2xl font-data font-bold ${stat?.color}`}>
                {formatNumber(stat?.value)}
              </div>
            </div>
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">
            {stat?.label}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default CommunityStats;