import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const SocialShareCard = ({ impactData, achievements }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('progress');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef(null);

  const templates = [
    {
      id: 'progress',
      name: 'Progress Update',
      icon: 'TrendingUp',
      description: 'Share your weekly impact progress'
    },
    {
      id: 'achievement',
      name: 'Achievement',
      icon: 'Award',
      description: 'Celebrate a new milestone'
    },
    {
      id: 'transformation',
      name: 'Transformation',
      icon: 'Repeat',
      description: 'Before/after impact comparison'
    },
    {
      id: 'community',
      name: 'Community Impact',
      icon: 'Users',
      description: 'Collective environmental progress'
    }
  ];

  const generateShareCard = async (template) => {
    setIsGenerating(true);
    
    // Simulate card generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would generate an actual image
    const mockImageUrl = `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&crop=center`;
    
    setIsGenerating(false);
    
    // Mock sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Ecoimmerse Impact',
        text: `Check out my environmental impact progress! 🌱 #Ecoimmerse #Sustainability`,
        url: window.location?.href
      });
    } else {
      // Fallback to copying link
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  const getTemplatePreview = (template) => {
    switch (template?.id) {
      case 'progress':
        return (
          <div className="bg-gradient-to-br from-primary to-secondary text-white p-4 rounded-organic">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">This Week's Impact</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-2xl font-bold">{impactData?.carbonReduction}</div>
                  <div className="opacity-80">kg CO₂</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{impactData?.wasteReduction}</div>
                  <div className="opacity-80">kg waste</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{impactData?.energySavings}</div>
                  <div className="opacity-80">kWh</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'achievement':
        const latestAchievement = achievements?.filter(a => a?.earned)?.[0];
        return (
          <div className="bg-gradient-to-br from-conversion-accent to-warning text-white p-4 rounded-organic text-center">
            <Icon name="Award" size={32} className="mx-auto mb-2" />
            <h3 className="text-lg font-bold mb-1">Achievement Unlocked!</h3>
            <p className="text-sm opacity-90">{latestAchievement?.title || 'Eco Warrior'}</p>
          </div>
        );
      
      case 'transformation':
        return (
          <div className="bg-gradient-to-r from-muted to-primary/20 p-4 rounded-organic">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <h4 className="font-semibold text-muted-foreground mb-2">Before</h4>
                <div className="text-2xl font-bold text-error">2.5t</div>
                <div className="text-sm text-muted-foreground">CO₂/month</div>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">After</h4>
                <div className="text-2xl font-bold text-success">1.2t</div>
                <div className="text-sm text-muted-foreground">CO₂/month</div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-success font-semibold">52% Reduction! 🌱</span>
            </div>
          </div>
        );
      
      case 'community':
        return (
          <div className="bg-gradient-to-br from-trust-builder to-accent text-white p-4 rounded-organic text-center">
            <Icon name="Users" size={32} className="mx-auto mb-2" />
            <h3 className="text-lg font-bold mb-2">Community Impact</h3>
            <div className="text-sm opacity-90">
              Together we've saved<br />
              <span className="text-xl font-bold">12.5 tons CO₂</span><br />
              this month!
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Share Your Impact</h3>
        <Icon name="Share2" size={20} className="text-muted-foreground" />
      </div>
      {/* Template Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates?.map((template) => (
          <motion.div
            key={template?.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTemplate(template?.id)}
            className={`cursor-pointer rounded-organic p-4 border-2 organic-transition ${
              selectedTemplate === template?.id
                ? 'border-primary bg-primary/5' :'border-border bg-white hover:border-primary/50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-organic ${
                selectedTemplate === template?.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={template?.icon} size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{template?.name}</h4>
                <p className="text-sm text-muted-foreground">{template?.description}</p>
              </div>
            </div>
            
            {/* Template Preview */}
            <div className="mt-3">
              {getTemplatePreview(template)}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Generate and Share */}
      <div className="bg-muted rounded-organic p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-foreground">Ready to Share?</h4>
            <p className="text-sm text-muted-foreground">
              Generate an animated impact card for social media
            </p>
          </div>
          <Button
            variant="default"
            loading={isGenerating}
            iconName="Share2"
            iconPosition="left"
            onClick={() => generateShareCard(templates?.find(t => t?.id === selectedTemplate))}
          >
            {isGenerating ? 'Generating...' : 'Generate & Share'}
          </Button>
        </div>

        {/* Platform Options */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Instagram">
            Stories
          </Button>
          <Button variant="outline" size="sm" iconName="Twitter">
            Tweet
          </Button>
          <Button variant="outline" size="sm" iconName="Facebook">
            Post
          </Button>
          <Button variant="outline" size="sm" iconName="Linkedin">
            Share
          </Button>
        </div>
      </div>
      {/* Recent Shares */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Recent Shares</h4>
        
        {[
          { platform: 'Instagram', date: '2 hours ago', engagement: '24 likes' },
          { platform: 'Twitter', date: '1 day ago', engagement: '12 retweets' },
          { platform: 'LinkedIn', date: '3 days ago', engagement: '8 comments' }
        ]?.map((share, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-white rounded-organic organic-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-organic flex items-center justify-center">
                <Icon name="Share2" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{share?.platform}</p>
                <p className="text-xs text-muted-foreground">{share?.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{share?.engagement}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Tips */}
      <div className="bg-accent/10 rounded-organic p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Sharing Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Share consistently to inspire your network</li>
              <li>• Use relevant hashtags like #Sustainability #EcoWarrior</li>
              <li>• Tag friends to encourage them to join</li>
              <li>• Share both wins and challenges for authenticity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShareCard;