import React, { useState, useEffect } from 'react';
import TreeCounter from 'components/ui/TreeCounter';
import CommunityStats from './components/CommunityStats';
import ForestVisualization from './components/ForestVisualization';
import ImpactMessage from './components/ImpactMessage';
import RecentActivity from './components/RecentActivity';
import { loadCommunityData, updateCommunityData } from '../../utils/communityStore';
import { useIPFSData } from '../../utils/useIPFSData';
import IPFSStatus from '../../components/ui/IPFSStatus';

const CommunityForestDashboard = () => {
  const { userId, syncStatus } = useIPFSData(); // Needed for the badge

  const [forestData, setForestData] = React.useState({
    totalTrees: 89500, // will be overwritten by IPFS
    todayTrees: 0,
    activeMembers: 0,
    targetTrees: 100000
  });

  const [treeData, setTreeData] = React.useState([]);
  const [recentActivities, setRecentActivities] = React.useState([]);

  React.useEffect(() => {
    async function initCommunity() {
      const data = await loadCommunityData();
      setForestData(prev => ({
        ...prev,
        totalTrees: data.totalTrees,
        activeMembers: data.activeUsers || 14500
      }));
    }
    initCommunity();

    // Mock tree data representing completed eco-missions
    const mockTreeData = [
      {
        id: "tree-001",
        missionTitle: "Campus Recycling Initiative",
        missionDescription: "Successfully organized and completed a week-long recycling initiative that collected over 500 pounds of recyclable materials.",
        userContributions: [
          { name: "Sarah Chen", action: "Led recycling drive" },
          { name: "Marcus Johnson", action: "Collected 50+ lbs materials" },
          { name: "Emma Rodriguez", action: "Organized sorting stations" }
        ],
        completionDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
        impactMetrics: {
          co2Absorbed: "48 lbs/year",
          oxygenProduced: "260 lbs/year"
        },
        coordinates: { x: 25, y: 30 }
      },
      {
        id: "tree-002",
        missionTitle: "Energy Conservation Week",
        missionDescription: "Implemented energy-saving practices across campus facilities, reducing electricity consumption by 15% through LED upgrades and behavioral changes.",
        userContributions: [
          { name: "David Kim", action: "LED installation coordinator" },
          { name: "Lisa Thompson", action: "Energy audit specialist" }
        ],
        completionDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
        impactMetrics: {
          co2Absorbed: "48 lbs/year",
          oxygenProduced: "260 lbs/year"
        },
        coordinates: { x: 45, y: 25 }
      },
      {
        id: "tree-003",
        missionTitle: "Water Conservation Initiative",
        missionDescription: "Installed water-efficient fixtures and educated community members about water conservation, saving over 10,000 gallons monthly.",
        userContributions: [
          { name: "Alex Rivera", action: "Fixture installation lead" },
          { name: "Jordan Park", action: "Community education coordinator" },
          { name: "Taylor Swift", action: "Water usage monitoring" }
        ],
        completionDate: new Date(Date.now() - 86400000 * 7), // 1 week ago
        impactMetrics: {
          co2Absorbed: "48 lbs/year",
          oxygenProduced: "260 lbs/year"
        },
        coordinates: { x: 65, y: 40 }
      },
      {
        id: "tree-004",
        missionTitle: "Sustainable Transportation Campaign",
        missionDescription: "Promoted bike-sharing and public transportation usage, reducing campus carbon emissions by encouraging eco-friendly commuting options.",
        userContributions: [
          { name: "Morgan Davis", action: "Bike-share program manager" },
          { name: "Casey Wilson", action: "Transportation survey coordinator" }
        ],
        completionDate: new Date(Date.now() - 86400000 * 10), // 10 days ago
        impactMetrics: {
          co2Absorbed: "48 lbs/year",
          oxygenProduced: "260 lbs/year"
        },
        coordinates: { x: 35, y: 55 }
      },
      {
        id: "tree-005",
        missionTitle: "Community Garden Project",
        missionDescription: "Established organic vegetable gardens on campus grounds, providing fresh produce for the cafeteria while teaching sustainable agriculture practices.",
        userContributions: [
          { name: "Riley Martinez", action: "Garden design specialist" },
          { name: "Avery Brown", action: "Soil preparation coordinator" },
          { name: "Quinn Anderson", action: "Planting and maintenance lead" }
        ],
        completionDate: new Date(Date.now() - 86400000 * 14), // 2 weeks ago
        impactMetrics: {
          co2Absorbed: "48 lbs/year",
          oxygenProduced: "260 lbs/year"
        },
        coordinates: { x: 55, y: 20 }
      },
      {
        id: "tree-006",
        missionTitle: "Waste Reduction Workshop Series",
        missionDescription: "Conducted educational workshops on zero-waste living, composting, and sustainable packaging alternatives for campus community members.",
        userContributions: [
          { name: "Jamie Lee", action: "Workshop facilitator" },
          { name: "Sam Garcia", action: "Composting system installer" }
        ],
        completionDate: new Date(Date.now() - 86400000 * 18), // 18 days ago
        impactMetrics: {
          co2Absorbed: "48 lbs/year",
          oxygenProduced: "260 lbs/year"
        },
        coordinates: { x: 75, y: 35 }
      },
      {
        id: "tree-007",
        missionTitle: "Green Building Certification Drive",
        missionDescription: "Worked with facilities management to achieve LEED certification for three campus buildings through sustainable material usage and energy efficiency improvements.",
        userContributions: [
          { name: "Blake Johnson", action: "LEED documentation coordinator" },
          { name: "Drew Thompson", action: "Sustainability assessment lead" },
          { name: "Sage Miller", action: "Green material sourcing specialist" }
        ],
        completionDate: new Date(Date.now() - 86400000 * 21), // 3 weeks ago
        impactMetrics: {
          co2Absorbed: "48 lbs/year",
          oxygenProduced: "260 lbs/year"
        },
        coordinates: { x: 20, y: 45 }
      },
      {
        id: "tree-008",
        missionTitle: "Renewable Energy Advocacy",
        missionDescription: "Successfully advocated for solar panel installation on campus rooftops, contributing to 25% renewable energy usage across academic facilities.",
        userContributions: [
          { name: "Phoenix Clark", action: "Solar panel research coordinator" },
          { name: "River Adams", action: "Administrative liaison" }
        ],
        completionDate: new Date(Date.now() - 86400000 * 25), // 25 days ago
        impactMetrics: {
          co2Absorbed: "48 lbs/year",
          oxygenProduced: "260 lbs/year"
        },
        coordinates: { x: 40, y: 60 }
      }
    ];

    // Mock recent activities
    const mockActivities = [
      {
        id: "activity-001",
        type: "tree_planted",
        user: "Sarah Chen",
        description: "Completed Campus Recycling Initiative and planted a new tree",
        mission: "Campus Recycling Initiative",
        timestamp: new Date(Date.now() - 300000) // 5 minutes ago
      },
      {
        id: "activity-002",
        type: "mission_completed",
        user: "Marcus Johnson",
        description: "Finished Energy Conservation Week goal",
        mission: "Energy Conservation Week",
        timestamp: new Date(Date.now() - 900000) // 15 minutes ago
      },
      {
        id: "activity-003",
        type: "milestone_reached",
        user: "Community",
        description: "Reached 1,200 trees planted milestone!",
        timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
      },
      {
        id: "activity-004",
        type: "user_joined",
        user: "Emma Rodriguez",
        description: "Joined the Ecoimmerse community forest initiative",
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        id: "activity-005",
        type: "tree_planted",
        user: "David Kim",
        description: "Completed Water Conservation Initiative",
        mission: "Water Conservation Initiative",
        timestamp: new Date(Date.now() - 7200000) // 2 hours ago
      },
      {
        id: "activity-006",
        type: "mission_completed",
        user: "Lisa Thompson",
        description: "Successfully finished Sustainable Transportation Campaign",
        mission: "Sustainable Transportation Campaign",
        timestamp: new Date(Date.now() - 10800000) // 3 hours ago
      }
    ];

    setTreeData(mockTreeData);
    setRecentActivities(mockActivities);
  }, []);

  const handleMilestone = (count) => {
    // Handle milestone celebrations
    console.log(`Milestone reached: ${count} trees!`);
  };

  const handleTreePlanted = async (newTree) => {
    setTreeData(prev => [...prev, newTree]);
    
    // Update local state instantly
    setForestData(prev => ({
      ...prev,
      totalTrees: prev.totalTrees + 1,
      todayTrees: prev.todayTrees + 1
    }));

    // Broadcast to global IPFS store
    await updateCommunityData(prev => ({
      ...prev,
      totalTrees: prev.totalTrees + 1
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Tree Counter Overlay */}
      <TreeCounter
        currentCount={forestData?.totalTrees}
        targetCount={forestData?.targetTrees}
        onMilestone={handleMilestone}
      />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pt-32">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Community Forest Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize our collective environmental impact through an immersive forest experience
          </p>
        </div>

        {/* Community Stats */}
        <CommunityStats
          totalTrees={forestData?.totalTrees}
          todayTrees={forestData?.todayTrees}
          activeMembers={forestData?.activeMembers}
          className="mb-12"
        />

        {/* Impact Message */}
        <ImpactMessage
          totalTrees={forestData?.totalTrees}
          className="mb-12"
        />

        {/* Forest Visualization */}
        <div className="bg-card rounded-lg shadow-organic-lg border border-border mb-12 overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Our Community Forest
            </h2>
            <p className="text-muted-foreground">
              Each tree represents a completed environmental goal. Click on any tree to see action details.
            </p>
          </div>
          
          <ForestVisualization
            treeData={treeData}
            onTreePlanted={handleTreePlanted}
            className="p-6"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentActivity
              activities={recentActivities}
            />
          </div>
          
          {/* Additional Info Panel */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-organic p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Next Milestone
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    {forestData?.totalTrees} / {forestData?.targetTrees}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-success h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((forestData?.totalTrees / forestData?.targetTrees) * 100, 100)}%`
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {forestData?.targetTrees - forestData?.totalTrees} trees remaining to reach our community goal
                </p>
              </div>
            </div>

            <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
              <h3 className="text-lg font-semibold text-accent-foreground mb-3">
                Get Involved
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join our environmental missions and help grow our community forest.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Complete eco-missions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Track your impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Grow the forest together</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <IPFSStatus syncStatus={syncStatus} userId={userId} />
    </div>
  );
};

export default CommunityForestDashboard;