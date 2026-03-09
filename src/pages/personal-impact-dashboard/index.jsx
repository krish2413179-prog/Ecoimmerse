import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import Header from 'components/ui/Header'; // <-- 1. DELETED THIS LINE
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

// Import all components
import ImpactTree from './components/ImpactTree';
import ProgressStreams from './components/ProgressStreams';
import AchievementGallery from './components/AchievementGallery';
import GoalTracker from './components/GoalTracker';
import VoiceJournal from './components/VoiceJournal';
import SocialShareCard from './components/SocialShareCard';
import VoiceInterface from './components/VoiceInterface';

import { useIPFSData } from '../../utils/useIPFSData';
import IPFSStatus from '../../components/ui/IPFSStatus';

const PersonalImpactDashboard = () => {
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [showTip, setShowTip] = useState(null);

  const { userId, profile, loading, syncStatus, updateProfile } = useIPFSData();

  // Load from IPFS Profile (or use empty arrays as fallback)
  const impactScore = profile?.impactScore || 0;
  const weeklyData = profile?.weeklyData || { carbonReduction: 0, wasteReduction: 0, energySavings: 0 };
  const achievements = profile?.achievements || [];
  const goals = profile?.goals || [];
  const journalEntries = profile?.journalEntries || [];

  const contextualTips = [
    {
      id: 1,
      title: "Great Progress!",
      message: "You're 72% towards your carbon reduction goal. Consider carpooling twice this week to reach it!",
      icon: "TrendingUp",
      type: "success"
    },
    {
      id: 2,
      title: "Share Your Success",
      message: "You've earned 3 new badges this week! Share your progress to inspire others.",
      icon: "Share2",
      type: "social"
    }
  ];

  useEffect(() => {
    const month = new Date()?.getMonth();
    if (month >= 2 && month <= 4) setCurrentSeason('spring');
    else if (month >= 5 && month <= 7) setCurrentSeason('summer');
    else if (month >= 8 && month <= 10) setCurrentSeason('autumn');
    else setCurrentSeason('winter');
    const tipTimer = setTimeout(() => {
      setShowTip(contextualTips?.[Math.floor(Math.random() * contextualTips?.length)]);
    }, 3000);
    return () => clearTimeout(tipTimer);
  }, []);

  const handleVoiceCommand = (action, command) => {
    switch (action) {
      case 'showProgress': setActiveSection('progress');
        break;
      case 'showImpact': setActiveSection('overview');
        break;
      case 'showAchievements': setActiveSection('achievements');
        break;
      case 'setGoal': setActiveSection('goals');
        break;
      case 'startJournal': setActiveSection('journal');
        break;
      case 'shareProgress': setActiveSection('share');
        break;
      default:
        console.log('Unknown command:', command);
    }
  };

  const handleUpdateGoal = async (goalId, updates) => { 
    await updateProfile(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === goalId ? { ...g, ...updates } : g)
    }));
  };
  
  const handleAddGoal = async (newGoal) => { 
    await updateProfile(prev => ({
      ...prev,
      goals: [...prev.goals, { id: Date.now(), ...newGoal }]
    }));
  };
  
  const handleAddJournalEntry = async (entry) => { 
    await updateProfile(prev => ({
      ...prev,
      journalEntries: [{ id: Date.now(), ...entry }, ...prev.journalEntries]
    }));
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'goals', label: 'Goals', icon: 'Target' },
    { id: 'journal', label: 'Journal', icon: 'Mic' },
    { id: 'share', label: 'Share', icon: 'Share2' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */} {/* <-- 2. DELETED THIS LINE */}
      <div className="pt-16">
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              >
                Your Impact Journey
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Watch your environmental impact grow into a thriving digital ecosystem
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            >
              <div className="bg-white rounded-organic p-6 text-center organic-shadow">
                <div className="text-3xl font-bold text-primary mb-2">{impactScore?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Impact Points</div>
              </div>
              <div className="bg-white rounded-organic p-6 text-center organic-shadow">
                <div className="text-3xl font-bold text-blue-500 mb-2">{weeklyData?.carbonReduction}</div>
                <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
              </div>
              <div className="bg-white rounded-organic p-6 text-center organic-shadow">
                <div className="text-3xl font-bold text-green-500 mb-2">{achievements?.filter(a => a?.earned)?.length}</div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </div>
              <div className="bg-white rounded-organic p-6 text-center organic-shadow">
                <div className="text-3xl font-bold text-orange-500 mb-2">{goals?.length}</div>
                <div className="text-sm text-muted-foreground">Active Goals</div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-1 overflow-x-auto py-4">
              {navigationItems?.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => setActiveSection(item?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-organic organic-transition whitespace-nowrap ${
                    activeSection === item?.id
                      ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {activeSection === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <ImpactTree 
                    impactScore={impactScore}
                    season={currentSeason}
                    isVoiceActive={isVoiceListening}
                  />
                  <ProgressStreams weeklyData={weeklyData} />
                </motion.div>
              )}

              {activeSection === 'progress' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ProgressStreams weeklyData={weeklyData} />
                </motion.div>
              )}

              {activeSection === 'achievements' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AchievementGallery 
                    achievements={achievements}
                    newAchievements={achievements?.filter(a => a?.earned)?.slice(0, 1)}
                  />
                </motion.div>
              )}

              {activeSection === 'goals' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GoalTracker 
                    goals={goals}
                    onUpdateGoal={handleUpdateGoal}
                    onAddGoal={handleAddGoal}
                  />
                </motion.div>
              )}

              {activeSection === 'journal' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <VoiceJournal 
                    entries={journalEntries}
                    onAddEntry={handleAddJournalEntry}
                  />
                </motion.div>
              )}

              {activeSection === 'share' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <SocialShareCard 
                    impactData={weeklyData}
                    achievements={achievements}
                  />
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-organic p-6 organic-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => setActiveSection('goals')}
                  >
                    Add New Goal
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Mic"
                    iconPosition="left"
                    onClick={() => setActiveSection('journal')}
                  >
                    Voice Journal
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Share2"
                    iconPosition="left"
                    onClick={() => setActiveSection('share')}
                  >
                    Share Progress
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-organic p-6 organic-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: "Completed daily challenge", time: "2 hours ago", icon: "Check" },
                    { action: "Earned Carbon Warrior badge", time: "1 day ago", icon: "Award" },
                    { action: "Added voice journal entry", time: "2 days ago", icon: "Mic" },
                    { action: "Shared progress on social", time: "3 days ago", icon: "Share2" }
                  ]?.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-organic hover:bg-muted organic-transition">
                      <div className="w-8 h-8 bg-primary/10 rounded-organic flex items-center justify-center">
                        <Icon name={activity?.icon} size={16} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity?.action}</p>
                        <p className="text-xs text-muted-foreground">{activity?.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-organic p-6 organic-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-4">Explore More</h3>
                <div className="space-y-2">
                  <Link
                    to="/" // <-- 3. FIXED THIS LINK
                    className="flex items-center space-x-3 p-2 rounded-organic hover:bg-muted organic-transition"
                  >
                    <Icon name="Home" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">Back to Home</span>
                  </Link>
                  <Link
                    to="/forest-dashboard" // <-- 3. FIXED THIS LINK
                    className="flex items-center space-x-3 p-2 rounded-organic hover:bg-muted organic-transition"
                  >
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">Community Forest</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-6 max-w-sm bg-white rounded-organic organic-shadow p-4 border-l-4 border-primary z-30"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-organic">
                <Icon name={showTip?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm">{showTip?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{showTip?.message}</p>
              </div>
              <button
                onClick={() => setShowTip(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </motion.div>
        )}

        <VoiceInterface
          onVoiceCommand={handleVoiceCommand}
          isListening={isVoiceListening}
          setIsListening={setIsVoiceListening}
        />
        <IPFSStatus syncStatus={syncStatus} userId={userId} />
      </div>
    </div>
  );
};

export default PersonalImpactDashboard;