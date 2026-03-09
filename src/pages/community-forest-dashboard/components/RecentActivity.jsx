import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = ({ 
  activities = [],
  className = "" 
}) => {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityDate?.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'tree_planted': return 'TreePine';
      case 'mission_completed': return 'CheckCircle';
      case 'milestone_reached': return 'Trophy';
      case 'user_joined': return 'UserPlus';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'tree_planted': return 'text-success';
      case 'mission_completed': return 'text-primary';
      case 'milestone_reached': return 'text-warning';
      case 'user_joined': return 'text-accent-foreground';
      default: return 'text-muted-foreground';
    }
  };

  if (activities?.length === 0) {
    return (
      <div className={`bg-card rounded-lg shadow-organic p-6 border border-border ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recent activity to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg shadow-organic p-6 border border-border ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={activity?.id || index} className="flex items-start space-x-3 p-3 hover:bg-muted/30 rounded-lg transition-colors">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={16} 
                className={getActivityColor(activity?.type)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity?.user || 'Community Member'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity?.description}
                  </p>
                  {activity?.mission && (
                    <p className="text-xs text-accent-foreground mt-1 font-medium">
                      Mission: {activity?.mission}
                    </p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;