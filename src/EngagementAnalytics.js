import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, ThumbsUp, ThumbsDown,
  TrendingUp, TrendingDown, Users, Activity, BarChart3, Clock,
  Award, Target, Sparkles, Bell, Eye, Star, UserCheck,
  Calendar, Filter, Download, ChevronRight, ArrowUpRight,
  Hash, AtSign, Link2, Video, Image as ImageIcon, FileText,
  Zap, Flame, Crown, Diamond, Trophy, Flag
} from 'lucide-react';

const EngagementAnalytics = ({ formatNumber, formatCurrency }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [engagementView, setEngagementView] = useState('overview');

  const [engagementData] = useState({
    summary: {
      totalEngagements: 1283947,
      engagementRate: 12.3,
      avgEngagementsPerUser: 8.7,
      growth: 15.4,
      viralReach: 2847329,
      sentiment: {
        positive: 89.3,
        neutral: 8.2,
        negative: 2.5
      }
    },
    interactions: {
      likes: 823947,
      comments: 192384,
      shares: 92847,
      saves: 174769,
      reactions: {
        love: 423847,
        wow: 182374,
        laugh: 92384,
        sad: 12847,
        angry: 8234
      }
    },
    topContent: [
      {
        title: 'Cyber Ronin E12 - The Reveal',
        engagements: 82374,
        viralScore: 9.2,
        sentiment: 94.3,
        shares: 12847,
        trending: true
      },
      {
        title: 'Spirit Walker OVA Behind Scenes',
        engagements: 62847,
        viralScore: 8.7,
        sentiment: 92.1,
        shares: 9283,
        trending: true
      },
      {
        title: 'Neon Shadows Art Showcase',
        engagements: 45923,
        viralScore: 7.8,
        sentiment: 88.9,
        shares: 6234,
        trending: false
      }
    ],
    communityMetrics: {
      activeCommenters: 28374,
      superFans: 3847,
      brandAdvocates: 1923,
      avgResponseTime: '2.3 hrs',
      communityHealth: 8.9,
      toxicityRate: 1.2
    },
    contentTypes: [
      { type: 'Episodes', engagementRate: 15.3, avgEngagements: 12847 },
      { type: 'Behind Scenes', engagementRate: 18.7, avgEngagements: 9283 },
      { type: 'Fan Art', engagementRate: 22.4, avgEngagements: 8234 },
      { type: 'Announcements', engagementRate: 25.8, avgEngagements: 15923 },
      { type: 'Polls', engagementRate: 42.3, avgEngagements: 5827 }
    ],
    timePatterns: {
      bestDays: ['Friday', 'Saturday', 'Sunday'],
      bestHours: ['8 PM', '9 PM', '10 PM'],
      worstDays: ['Monday', 'Tuesday'],
      peakEngagement: 'Saturday 9 PM'
    }
  });

  const [socialMetrics] = useState({
    mentions: 45827,
    hashtags: [
      { tag: '#CyberRonin', uses: 23847, trend: 'up' },
      { tag: '#AniFlixOriginal', uses: 18234, trend: 'up' },
      { tag: '#SpiritWalkerOVA', uses: 12983, trend: 'stable' },
      { tag: '#NeonShadows', uses: 9827, trend: 'down' }
    ],
    influencers: [
      { name: '@AnimeKing', followers: '2.3M', mentions: 23, impact: 'Very High' },
      { name: '@OtakuQueen', followers: '1.8M', mentions: 18, impact: 'High' },
      { name: '@MangaMaster', followers: '982K', mentions: 12, impact: 'High' }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Engagement Analytics
          </h3>
          <p className="text-gray-400 text-sm mt-1">Track community interactions and content virality</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Engagement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-pink-400" />
            <span className="text-sm text-green-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{engagementData.summary.growth}%
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Total Engagements</p>
          <p className="text-2xl font-bold">{formatNumber(engagementData.summary.totalEngagements)}</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-purple-400" />
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-sm text-gray-400 mb-1">Engagement Rate</p>
          <p className="text-2xl font-bold">{engagementData.summary.engagementRate}%</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-8 h-8 text-orange-400" />
            <span className="text-sm text-orange-400">Viral</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Viral Reach</p>
          <p className="text-2xl font-bold">{formatNumber(engagementData.summary.viralReach)}</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <ThumbsUp className="w-8 h-8 text-green-400" />
            <span className="text-lg font-bold text-green-400">{engagementData.summary.sentiment.positive}%</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Positive Sentiment</p>
          <p className="text-2xl font-bold">Excellent</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex space-x-4 border-b border-gray-800">
        {['overview', 'community', 'social', 'trends'].map((view) => (
          <button
            key={view}
            onClick={() => setEngagementView(view)}
            className={`pb-4 px-2 capitalize transition-all duration-200 ${
              engagementView === view
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {engagementView === 'overview' && (
        <div className="space-y-6">
          {/* Interaction Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
              <Clock className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-2xl font-bold">{engagementData.communityMetrics.avgResponseTime}</p>
              <p className="text-sm text-gray-400">Avg Response Time</p>
            </div>
          </div>

          {/* Community Health */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Community Health Score</h3>
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-end space-x-2 mb-2">
                  <span className="text-4xl font-bold text-green-400">{engagementData.communityMetrics.communityHealth}</span>
                  <span className="text-lg text-gray-400">/10</span>
                </div>
                <p className="text-sm text-gray-400">Excellent community health</p>
              </div>
              <Trophy className="w-16 h-16 text-yellow-400 opacity-20" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Toxicity Rate</span>
                <span className="text-sm font-medium">{engagementData.communityMetrics.toxicityRate}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-green-600 to-green-400"
                  style={{ width: `${100 - engagementData.communityMetrics.toxicityRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Content Type Performance */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Engagement by Content Type</h3>
            <div className="space-y-4">
              {engagementData.contentTypes.map((type) => (
                <div key={type.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{type.type}</span>
                    <span className="text-sm text-gray-400">{type.engagementRate}% rate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-800 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                        style={{ width: `${type.engagementRate * 2}%` }}
                      />
                    </div>
                    <span className="text-sm">{formatNumber(type.avgEngagements)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Social Tab */}
      {engagementView === 'social' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Social Mentions */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <AtSign className="w-5 h-5 mr-2 text-purple-400" />
                Social Mentions
              </h3>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold mb-2">{formatNumber(socialMetrics.mentions)}</p>
                <p className="text-sm text-gray-400">Total mentions this period</p>
              </div>
              <div className="space-y-3">
                {socialMetrics.hashtags.map((hashtag) => (
                  <div key={hashtag.tag} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Hash className="w-4 h-4 text-purple-400" />
                      <span className="font-medium">{hashtag.tag}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm">{formatNumber(hashtag.uses)}</span>
                      <div className={`flex items-center ${
                        hashtag.trend === 'up' ? 'text-green-400' : 
                        hashtag.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {hashtag.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                        {hashtag.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                        {hashtag.trend === 'stable' && <Activity className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Influencers */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Top Influencers
              </h3>
              <div className="space-y-4">
                {socialMetrics.influencers.map((influencer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {influencer.name.charAt(1).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{influencer.name}</p>
                        <p className="text-sm text-gray-400">{influencer.followers} followers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{influencer.mentions} mentions</p>
                      <p className={`text-xs ${
                        influencer.impact === 'Very High' ? 'text-purple-400' :
                        influencer.impact === 'High' ? 'text-blue-400' : 'text-gray-400'
                      }`}>{influencer.impact} Impact</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {engagementView === 'trends' && (
        <div className="space-y-6">
          {/* Engagement Time Patterns */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Optimal Posting Times</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-4">Best Days</p>
                <div className="space-y-2">
                  {engagementData.timePatterns.bestDays.map((day) => (
                    <div key={day} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-800">
                      <span className="font-medium">{day}</span>
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-4">Peak Hours</p>
                <div className="space-y-2">
                  {engagementData.timePatterns.bestHours.map((hour) => (
                    <div key={hour} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="font-medium">{hour}</span>
                      <Clock className="w-4 h-4 text-purple-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-800">
              <p className="text-sm">
                <span className="font-medium text-purple-400">Peak Engagement:</span> {engagementData.timePatterns.peakEngagement}
              </p>
            </div>
          </div>

          {/* Engagement Heatmap */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Weekly Engagement Heatmap</h3>
            <div className="grid grid-cols-8 gap-1 text-xs">
              <div></div>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-gray-400 p-2">{day}</div>
              ))}
              {Array.from({ length: 24 }, (_, i) => (
                <React.Fragment key={i}>
                  <div className="text-right text-gray-400 p-2">{i}:00</div>
                  {[0, 1, 2, 3, 4, 5, 6].map(day => (
                    <div 
                      key={`${i}-${day}`}
                      className="aspect-square rounded"
                      style={{
                        backgroundColor: `rgba(168, 85, 247, ${Math.random() * 0.8 + 0.2})`
                      }}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Engagement Insights */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-800">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
          Engagement Insights & Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-purple-400 mt-1" />
            <div>
              <p className="font-medium">High Viral Potential</p>
              <p className="text-sm text-gray-400">Behind-the-scenes content gets 18.7% engagement rate</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="font-medium">Weekend Warriors</p>
              <p className="text-sm text-gray-400">Engagement peaks on weekends at 9 PM</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <p className="font-medium">Growing Community</p>
              <p className="text-sm text-gray-400">3,847 super fans drive 42% of engagements</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-pink-400 mt-1" />
            <div>
              <p className="font-medium">Positive Sentiment</p>
              <p className="text-sm text-gray-400">89.3% positive sentiment, above industry average</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementAnalytics; 