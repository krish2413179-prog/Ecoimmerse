import React, { useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const TreeModal = ({ 
  isVisible = false, 
  onClose = () => {}, 
  treeData = null,
  className = "" 
}) => {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef?.current && !modalRef?.current?.contains(e?.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onClose]);

  if (!isVisible || !treeData) return null;

  const {
    id,
    missionTitle = "Environmental Mission",
    missionDescription = "Contributing to our community forest initiative",
    userContributions = [],
    completionDate,
    impactMetrics = {},
    coordinates = { x: 0, y: 0 }
  } = treeData;

  const formatDate = (date) => {
    if (!date) return 'Recently';
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-modal" />
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className={`relative bg-card rounded-lg shadow-organic-lg max-w-md w-full max-h-[90vh] overflow-y-auto slide-up ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="TreePine" size={16} color="white" />
            </div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Tree #{id}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} color="currentColor" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Mission Details */}
          <div>
            <h3 className="text-base font-heading font-medium text-foreground mb-2">
              {missionTitle}
            </h3>
            <p className="text-sm font-body text-text-secondary leading-relaxed">
              {missionDescription}
            </p>
          </div>

          {/* Completion Info */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>Planted on {formatDate(completionDate)}</span>
          </div>

          {/* Impact Metrics */}
          {Object.keys(impactMetrics)?.length > 0 && (
            <div>
              <h4 className="text-sm font-heading font-medium text-foreground mb-3">
                Environmental Impact
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {impactMetrics?.co2Absorbed && (
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-data font-medium text-success">
                      {impactMetrics?.co2Absorbed}
                    </div>
                    <div className="text-xs text-muted-foreground">CO₂ Absorbed</div>
                  </div>
                )}
                {impactMetrics?.oxygenProduced && (
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-data font-medium text-accent-foreground">
                      {impactMetrics?.oxygenProduced}
                    </div>
                    <div className="text-xs text-muted-foreground">O₂ Produced</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* User Contributions */}
          {userContributions?.length > 0 && (
            <div>
              <h4 className="text-sm font-heading font-medium text-foreground mb-3">
                Contributors
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {userContributions?.map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {contributor?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {contributor?.name || 'Anonymous'}
                      </div>
                      {contributor?.action && (
                        <div className="text-xs text-muted-foreground">
                          {contributor?.action}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border rounded-b-lg">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Position: ({coordinates?.x}, {coordinates?.y})</span>
            <span>Tree ID: {id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeModal;