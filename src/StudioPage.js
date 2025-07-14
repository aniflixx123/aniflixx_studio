import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardOverview from './DashboardOverview';
import ContentLibrary from './ContentLibrary';
import UploadCenter from './UploadCenter';
import RevenueAnalytics from './RevenueAnalytics';
import AudienceInsights from './AudienceInsights';
import AnalyticsDashboard from './AnalyticsDashboard';
import EngagementAnalytics from './EngagementAnalytics';
import MarketIntelligence from './MarketIntelligence';
import { Sparkles, Crown } from 'lucide-react';

const AniFlixxStudioDashboard = () => {
  // State Management
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Episode 24 reached 1M views!', time: '2 hours ago', read: false },
    { id: 2, type: 'warning', message: 'Upload quota 80% used', time: '5 hours ago', read: false },
    { id: 3, type: 'info', message: 'New analytics features available', time: '1 day ago', read: true }
  ]);

  // Dashboard Data
  const [dashboardData] = useState({
    totalTitles: 45,
    publishedTitles: 38,
    draftTitles: 7,
    totalViews: 2847329,
    viewsGrowth: 12.5,
    totalRevenue: 45782.50,
    revenueGrowth: 8.2,
    followers: 128439,
    followersGrowth: 5.8,
    newFollowers: 3847,
    avgWatchTime: '24:35',
    completionRate: 78.5,
    engagementRate: 12.3,
    shareRate: 4.7,
    returnViewerRate: 67.2,
    premiumViewers: 42.8,
    adBlockRate: 23.4,
    avgSessionDuration: '45:23',
    bounceRate: 18.7
  });

  // Content Data
  const [contentData, setContentData] = useState([
    { 
      id: 1,
      title: 'Cyber Ronin Episode 12',
      type: 'Anime',
      genre: 'Cyberpunk',
      views: 248392,
      uniqueViews: 198234,
      likes: 18293,
      dislikes: 892,
      comments: 1284,
      shares: 3421,
      revenue: 3847.20,
      watchTime: '22:45',
      avgWatchTime: '18:32',
      completionRate: 82,
      dropOffPoint: '16:23',
      status: 'published',
      uploadDate: '2024-06-15',
      thumbnail: '🎬',
      trending: true,
      viralScore: 8.7,
      qualityScore: 9.2,
      chapters: 5,
      subtitleLanguages: 12,
      regions: ['North America', 'Europe', 'Latin America'],
      licensing: {
        type: 'exclusive',
        expiryDate: '2025-06-15',
        autoRenew: true
      },
      fileSize: '2.4GB',
      resolution: '4K',
      format: 'MP4',
      bitrate: '25 Mbps'
    },
    { 
      id: 2,
      title: 'Neon Shadows Chapter 5',
      type: 'Manga',
      genre: 'Neo-noir',
      views: 182947,
      uniqueViews: 156234,
      likes: 14827,
      dislikes: 623,
      comments: 892,
      shares: 2156,
      revenue: 2983.50,
      watchTime: '18:30',
      avgWatchTime: '14:22',
      completionRate: 75,
      dropOffPoint: '12:15',
      status: 'published',
      uploadDate: '2024-06-12',
      thumbnail: '📚',
      trending: false,
      viralScore: 7.2,
      qualityScore: 8.8,
      chapters: 8,
      subtitleLanguages: 8,
      regions: ['North America', 'Europe'],
      licensing: {
        type: 'non-exclusive',
        expiryDate: '2025-12-31',
        autoRenew: false
      },
      fileSize: '1.8GB',
      resolution: '1080p',
      format: 'MP4',
      bitrate: '15 Mbps'
    },
    { 
      id: 3,
      title: 'Spirit Walker OVA',
      type: 'Flick',
      genre: 'Fantasy',
      views: 329481,
      uniqueViews: 287364,
      likes: 24839,
      dislikes: 1232,
      comments: 2183,
      shares: 5672,
      revenue: 4928.75,
      watchTime: '45:20',
      avgWatchTime: '38:45',
      completionRate: 88,
      dropOffPoint: '42:10',
      status: 'published',
      uploadDate: '2024-06-10',
      thumbnail: '🎥',
      trending: true,
      viralScore: 9.3,
      qualityScore: 9.5,
      chapters: 3,
      subtitleLanguages: 15,
      regions: ['Global'],
      licensing: {
        type: 'exclusive',
        expiryDate: '2026-06-10',
        autoRenew: true
      },
      fileSize: '4.2GB',
      resolution: '8K',
      format: 'MP4',
      bitrate: '50 Mbps'
    }
  ]);

  // Utility Functions
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <Header 
          notifications={notifications}
          setNotifications={setNotifications}
        />

        <div className="p-8">
          {activeTab === 'overview' && (
            <DashboardOverview 
              dashboardData={dashboardData}
              formatNumber={formatNumber}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'content' && (
            <ContentLibrary 
              contentData={contentData}
              setContentData={setContentData}
              formatNumber={formatNumber}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'uploads' && (
            <UploadCenter 
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              formatBytes={formatBytes}
              addNotification={addNotification}
            />
          )}

          {/* Add other tabs as needed */}
          {activeTab === 'revenue' && (
            <RevenueAnalytics
            formatNumber={formatNumber}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'audience' && (
            <AudienceInsights
              formatNumber={formatNumber}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard
              formatNumber={formatNumber}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'engagement' && (
            <EngagementAnalytics
              formatNumber={formatNumber}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'competitors' && (
            <MarketIntelligence
              formatNumber={formatNumber}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'team' && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Team Management</h2>
              <p className="text-gray-400">Team component would go here</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Studio Settings</h2>
              <p className="text-gray-400">Settings component would go here</p>
            </div>
          )}
        </div>
      </main>

      {/* Premium Features Info Modal */}
      {activeTab === 'overview' && (
        <div className="fixed bottom-8 right-8 max-w-sm">
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl p-6 border border-purple-600 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                Premium Analytics Active
              </h3>
              <Crown className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-sm text-gray-200 mb-4">
              You're using advanced analytics with real-time insights, competitor tracking, and predictive metrics.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">Premium Plan • $499/month</span>
              <button className="text-sm text-purple-300 hover:text-white transition-colors">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AniFlixxStudioDashboard;