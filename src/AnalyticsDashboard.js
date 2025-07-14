import React, { useState } from 'react';
import {
    BarChart3, LineChart, TrendingUp, TrendingDown, Activity,
    PieChart, Clock, Calendar, Filter, Download, ChevronDown,
    Eye, PlayCircle, Users, Heart, MessageCircle, Share2,
    SkipForward, Pause, Volume2, Settings, Maximize, Info,
    AlertTriangle, CheckCircle, XCircle, RefreshCw, Target,
    Zap, Database, Cpu, HardDrive, Wifi, Server, Globe,
    ThumbsUp, Bookmark, ExternalLink
} from 'lucide-react';
  

const AnalyticsDashboard = ({ formatNumber, formatCurrency }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsView, setAnalyticsView] = useState('performance');
  const [selectedContent, setSelectedContent] = useState(null);

  const [performanceData] = useState({
    views: {
      total: 2847329,
      unique: 1923847,
      growth: 12.5,
      avgPerDay: 94911,
      peakDay: '2024-06-15',
      peakViews: 182947
    },
    watchTime: {
      total: 1249384, // in minutes
      avgSession: 45.23,
      avgPerUser: 24.35,
      growth: 8.7,
      completionRate: 78.5
    },
    engagement: {
      likes: 982374,
      dislikes: 12847,
      ratio: 98.7,
      comments: 182947,
      shares: 92837,
      saves: 234872
    },
    technical: {
      bufferingRate: 0.23,
      errorRate: 0.08,
      avgLoadTime: 1.2,
      cdnHitRate: 98.7,
      bandwidthUsed: '2.4TB',
      avgBitrate: '5.2 Mbps'
    }
  });

  const [contentPerformance] = useState([
    {
      id: 1,
      title: 'Cyber Ronin Episode 12',
      views: 248392,
      watchTime: 5628234,
      avgWatchTime: '22:45',
      completionRate: 82.3,
      engagement: 9.2,
      revenue: 3847.20,
      trend: 'up',
      heatmap: [10, 15, 25, 40, 55, 70, 85, 90, 88, 85, 80, 75, 70, 60, 45, 30, 20, 15, 10, 5]
    },
    {
      id: 2,
      title: 'Spirit Walker OVA',
      views: 182947,
      watchTime: 8293742,
      avgWatchTime: '45:20',
      completionRate: 88.7,
      engagement: 9.5,
      revenue: 4928.75,
      trend: 'up',
      heatmap: [5, 10, 20, 35, 50, 65, 75, 85, 90, 92, 90, 88, 85, 80, 70, 55, 40, 25, 15, 8]
    },
    {
      id: 3,
      title: 'Neon Shadows Chapter 5',
      views: 156234,
      watchTime: 2893742,
      avgWatchTime: '18:30',
      completionRate: 75.2,
      engagement: 8.7,
      revenue: 2983.50,
      trend: 'stable',
      heatmap: [15, 25, 40, 55, 65, 70, 72, 70, 65, 55, 45, 35, 25, 20, 15, 10, 8, 5, 3, 2]
    }
  ]);

  const [trafficSources] = useState([
    { source: 'Direct', sessions: 847293, percentage: 35.2, trend: 12.3 },
    { source: 'Search', sessions: 623847, percentage: 25.9, trend: 8.7 },
    { source: 'Social Media', sessions: 492384, percentage: 20.5, trend: 23.4 },
    { source: 'External Sites', sessions: 283947, percentage: 11.8, trend: -2.1 },
    { source: 'Email', sessions: 159283, percentage: 6.6, trend: 5.8 }
  ]);

  const [realTimeStats] = useState({
    currentViewers: 12847,
    activeSessions: 8234,
    avgBufferTime: 0.3,
    serverLoad: 67,
    bandwidthUsage: 847,
    errorRate: 0.02
  });

  const renderMetricCard = (title, value, change, icon, color) => (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h3>
          <p className="text-gray-400 text-sm mt-1">Deep insights into content performance and viewer behavior</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Real-time Monitoring Strip */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-4 border border-purple-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Live</span>
            </div>
            <div>
              <span className="text-sm text-gray-400">Current Viewers:</span>
              <span className="ml-2 font-bold">{formatNumber(realTimeStats.currentViewers)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-400">Active Sessions:</span>
              <span className="ml-2 font-bold">{formatNumber(realTimeStats.activeSessions)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-400">Server Load:</span>
              <span className="ml-2 font-bold">{realTimeStats.serverLoad}%</span>
            </div>
            <div>
              <span className="text-sm text-gray-400">Bandwidth:</span>
              <span className="ml-2 font-bold">{realTimeStats.bandwidthUsage} Mbps</span>
            </div>
          </div>
          <button className="text-sm text-purple-400 hover:text-purple-300">
            View Real-time Dashboard →
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderMetricCard(
          'Total Views',
          formatNumber(performanceData.views.total),
          performanceData.views.growth,
          <Eye className="w-6 h-6" />,
          'bg-purple-900/20 text-purple-400'
        )}
        {renderMetricCard(
          'Watch Time',
          `${(performanceData.watchTime.total / 60).toFixed(0)}K hrs`,
          performanceData.watchTime.growth,
          <Clock className="w-6 h-6" />,
          'bg-blue-900/20 text-blue-400'
        )}
        {renderMetricCard(
          'Engagement Rate',
          `${performanceData.engagement.ratio}%`,
          5.2,
          <Heart className="w-6 h-6" />,
          'bg-pink-900/20 text-pink-400'
        )}
        {renderMetricCard(
          'Completion Rate',
          `${performanceData.watchTime.completionRate}%`,
          3.8,
          <CheckCircle className="w-6 h-6" />,
          'bg-green-900/20 text-green-400'
        )}
      </div>

      {/* View Tabs */}
      <div className="flex space-x-4 border-b border-gray-800">
        {['performance', 'engagement', 'technical', 'sources'].map((view) => (
          <button
            key={view}
            onClick={() => setAnalyticsView(view)}
            className={`pb-4 px-2 capitalize transition-all duration-200 ${
              analyticsView === view
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Performance View */}
      {analyticsView === 'performance' && (
        <div className="space-y-6">
          {/* Content Performance Table */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-400" />
              Engagement Metrics
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <ThumbsUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Likes</p>
                    <p className="text-xl font-bold">{formatNumber(performanceData.engagement.likes)}</p>
                  </div>
                </div>
                <span className="text-3xl font-bold text-green-400">{performanceData.engagement.ratio}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-900/20 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Comments</p>
                    <p className="text-xl font-bold">{formatNumber(performanceData.engagement.comments)}</p>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-900/20 rounded-lg">
                    <Share2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Shares</p>
                    <p className="text-xl font-bold">{formatNumber(performanceData.engagement.shares)}</p>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-yellow-900/20 rounded-lg">
                    <Bookmark className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Saves</p>
                    <p className="text-xl font-bold">{formatNumber(performanceData.engagement.saves)}</p>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Engagement Trends</h3>
            <div className="h-64 flex items-end space-x-2">
              {[65, 72, 68, 85, 79, 92, 88, 95, 91, 87, 93, 89].map((value, index) => (
                <div key={index} className="flex-1">
                  <div 
                    className="bg-gradient-to-t from-purple-600 to-pink-600 rounded-t"
                    style={{ height: `${value}%` }}
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Technical View */}
      {analyticsView === 'technical' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400 mb-1">Buffer Rate</p>
              <p className="text-lg font-bold">{performanceData.technical.bufferingRate}%</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400 mb-1">Error Rate</p>
              <p className="text-lg font-bold">{performanceData.technical.errorRate}%</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400 mb-1">Load Time</p>
              <p className="text-lg font-bold">{performanceData.technical.avgLoadTime}s</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <Server className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400 mb-1">CDN Hit Rate</p>
              <p className="text-lg font-bold">{performanceData.technical.cdnHitRate}%</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <HardDrive className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400 mb-1">Bandwidth</p>
              <p className="text-lg font-bold">{performanceData.technical.bandwidthUsed}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
              <Wifi className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400 mb-1">Avg Bitrate</p>
              <p className="text-lg font-bold">{performanceData.technical.avgBitrate}</p>
            </div>
          </div>

          {/* Quality Distribution */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Streaming Quality Distribution</h3>
            <div className="space-y-4">
              {[
                { quality: '4K (2160p)', percentage: 15.2, color: 'from-purple-600 to-pink-600' },
                { quality: '1080p', percentage: 42.7, color: 'from-blue-600 to-purple-600' },
                { quality: '720p', percentage: 28.3, color: 'from-green-600 to-blue-600' },
                { quality: '480p', percentage: 10.1, color: 'from-yellow-600 to-green-600' },
                { quality: '360p', percentage: 3.7, color: 'from-red-600 to-yellow-600' }
              ].map((item) => (
                <div key={item.quality} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.quality}</span>
                    <span className="text-gray-400">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Traffic Sources View */}
      {analyticsView === 'sources' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-purple-400" />
              Traffic Sources
            </h3>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{source.source}</p>
                    <div className={`flex items-center text-sm ${
                      source.trend >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {source.trend >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {Math.abs(source.trend)}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{formatNumber(source.sessions)} sessions</span>
                    <span className="text-lg font-bold">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Top Referrers</h3>
            <div className="space-y-3">
              {[
                { site: 'youtube.com', visits: 82374, growth: 23.4 },
                { site: 'reddit.com/r/anime', visits: 62847, growth: 18.2 },
                { site: 'twitter.com', visits: 45923, growth: 12.7 },
                { site: 'discord.gg', visits: 38472, growth: 8.9 },
                { site: 'myanimelist.net', visits: 28374, growth: -2.3 }
              ].map((referrer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{referrer.site}</p>
                      <p className="text-sm text-gray-400">{formatNumber(referrer.visits)} visits</p>
                    </div>
                  </div>
                  <div className={`flex items-center text-sm ${
                    referrer.growth >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {referrer.growth >= 0 ? '+' : ''}{referrer.growth}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights Summary */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-800">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-yellow-400" />
          Performance Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <p className="font-medium">Strong Viewer Retention</p>
              <p className="text-sm text-gray-400">78.5% completion rate is above industry average</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="font-medium">Growing Social Traffic</p>
              <p className="text-sm text-gray-400">23.4% increase from social media sources</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1" />
            <div>
              <p className="font-medium">Mobile Optimization Needed</p>
              <p className="text-sm text-gray-400">Lower completion rates on mobile devices</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-purple-400 mt-1" />
            <div>
              <p className="font-medium">Excellent CDN Performance</p>
              <p className="text-sm text-gray-400">98.7% hit rate ensuring smooth playback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 