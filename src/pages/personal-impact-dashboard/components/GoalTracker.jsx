import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const GoalTracker = ({ goals, onUpdateGoal, onAddGoal }) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    category: 'carbon',
    deadline: ''
  });

  const goalCategories = [
    { value: 'carbon', label: 'Carbon Reduction', icon: 'Cloud', color: 'text-blue-500' },
    { value: 'waste', label: 'Waste Reduction', icon: 'Recycle', color: 'text-green-500' },
    { value: 'energy', label: 'Energy Savings', icon: 'Zap', color: 'text-orange-500' },
    { value: 'water', label: 'Water Conservation', icon: 'Droplets', color: 'text-cyan-500' }
  ];

  const handleAddGoal = () => {
    if (newGoal?.title && newGoal?.target && newGoal?.deadline) {
      onAddGoal({
        ...newGoal,
        id: Date.now(),
        current: 0,
        target: parseFloat(newGoal?.target),
        createdDate: new Date()?.toISOString()?.split('T')?.[0]
      });
      setNewGoal({ title: '', target: '', category: 'carbon', deadline: '' });
      setShowAddGoal(false);
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getCategoryInfo = (category) => {
    return goalCategories?.find(cat => cat?.value === category) || goalCategories?.[0];
  };

  const VineProgressBar = ({ progress, category }) => {
    const categoryInfo = getCategoryInfo(category);
    
    return (
      <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary relative"
        >
          {/* Vine leaves effect */}
          {progress > 20 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
            >
              <Icon name="Leaf" size={12} className="text-white" />
            </motion.div>
          )}
        </motion.div>
        {/* Milestone markers */}
        <div className="absolute inset-0 flex justify-between items-center px-1">
          {[25, 50, 75]?.map((milestone) => (
            <div
              key={milestone}
              className={`w-1 h-1 rounded-full ${
                progress >= milestone ? 'bg-white' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Goal Tracker</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddGoal(!showAddGoal)}
        >
          Add Goal
        </Button>
      </div>
      {/* Add Goal Form */}
      {showAddGoal && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-muted rounded-organic p-4 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Goal Title</label>
              <input
                type="text"
                value={newGoal?.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e?.target?.value })}
                placeholder="e.g., Reduce carbon footprint"
                className="w-full px-3 py-2 border border-border rounded-organic focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Target Value</label>
              <input
                type="number"
                value={newGoal?.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e?.target?.value })}
                placeholder="e.g., 100"
                className="w-full px-3 py-2 border border-border rounded-organic focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select
                value={newGoal?.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e?.target?.value })}
                className="w-full px-3 py-2 border border-border rounded-organic focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {goalCategories?.map((category) => (
                  <option key={category?.value} value={category?.value}>
                    {category?.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Deadline</label>
              <input
                type="date"
                value={newGoal?.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e?.target?.value })}
                className="w-full px-3 py-2 border border-border rounded-organic focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="default" onClick={handleAddGoal}>
              Create Goal
            </Button>
            <Button variant="outline" onClick={() => setShowAddGoal(false)}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}
      {/* Goals List */}
      <div className="space-y-4">
        {goals?.map((goal, index) => {
          const categoryInfo = getCategoryInfo(goal?.category);
          const progress = getProgressPercentage(goal?.current, goal?.target);
          const isCompleted = progress >= 100;
          const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));

          return (
            <motion.div
              key={goal?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-organic p-4 organic-shadow ${
                isCompleted ? 'ring-2 ring-success' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-muted rounded-organic ${categoryInfo?.color}`}>
                    <Icon name={categoryInfo?.icon} size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{goal?.title}</h4>
                    <p className="text-sm text-muted-foreground">{categoryInfo?.label}</p>
                  </div>
                </div>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-success text-white p-1 rounded-full"
                  >
                    <Icon name="Check" size={16} />
                  </motion.div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    {goal?.current} / {goal?.target} ({Math.round(progress)}%)
                  </span>
                </div>
                
                <VineProgressBar progress={progress} category={goal?.category} />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Deadline: {new Date(goal.deadline)?.toLocaleDateString()}</span>
                  <span className={daysLeft < 7 ? 'text-warning' : ''}>
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                  </span>
                </div>
              </div>
              {/* Milestone celebration */}
              {progress >= 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-2 bg-success/10 rounded-organic text-center"
                >
                  <span className="text-success font-medium text-sm">🎉 Goal Achieved! 🎉</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      {goals?.length === 0 && !showAddGoal && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Target" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No goals set yet</p>
          <p className="text-sm">Create your first environmental goal to start tracking progress</p>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;