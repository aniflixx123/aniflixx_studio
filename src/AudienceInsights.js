import React, { useState } from 'react';
import {
    Users, Globe, Clock, Activity, TrendingUp, MapPin,
    Smartphone, Monitor, Tablet, Calendar, BarChart3,
    PieChart, Filter, Download, UserCheck, UserX,
    Heart, Eye, PlayCircle, ChevronDown, Info,
    Wifi, Battery, Cpu, Flag, Languages, Award,
    Star, ChevronRight, Lightbulb
} from 'lucide-react';
  

const AudienceInsights = ({ formatNumber, formatCurrency }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [audienceView, setAudienceView] = useState('demographics');

  const [audienceData] = useState({
    totalViewers: 847293,
    activeViewers: 128439,
    newViewers: 23847,
    returningViewers: 104592,
    avgSessionDuration: '45:23',
    avgViewsPerUser: 3.4,
    demographics: {
      age: [
        { range: '13-17', percentage: 15.2, count: 128749 },
        { range: '18-24', percentage: 32.5, count: 275374 },
        { range: '25-34', percentage: 28.7, count: 243172 },
        { range: '35-44', percentage: 15.8, count: 133873 },
        { range: '45-54', percentage: 5.9, count: 49991 },
        { range: '55+', percentage: 1.9, count: 16134 }
      ],
      gender: [
        { type: 'Male', percentage: 58.3, count: 493961 },
        { type: 'Female', percentage: 39.2, count: 332139 },
        { type: 'Other', percentage: 2.5, count: 21193 }
      ],
      interests: [
        { category: 'Anime', percentage: 89.2, engagement: 'Very High' },
        { category: 'Gaming', percentage: 72.3, engagement: 'High' },
        { category: 'Technology', percentage: 64.8, engagement: 'High' },
        { category: 'Music', percentage: 58.1, engagement: 'Medium' },
        { category: 'Art & Design', percentage: 45.7, engagement: 'Medium' },
        { category: 'Comics', percentage: 42.3, engagement: 'Medium' }
      ]
    },
    geography: [
      { country: 'United States', viewers: 254188, percentage: 30.0, growth: 12.3 },
      { country: 'Japan', viewers: 169459, percentage: 20.0, growth: 8.7 },
      { country: 'United Kingdom', viewers: 84729, percentage: 10.0, growth: 15.2 },
      { country: 'Canada', viewers: 67783, percentage: 8.0, growth: 10.5 },
      { country: 'Germany', viewers: 59310, percentage: 7.0, growth: 9.8 },
      { country: 'France', viewers: 50838, percentage: 6.0, growth: 11.2 },
      { country: 'Brazil', viewers: 42365, percentage: 5.0, growth: 22.3 },
      { country: 'Others', viewers: 118621, percentage: 14.0, growth: 7.5 }
    ],
    devices: [
      { type: 'Mobile', icon: <Smartphone className="w-5 h-5" />, percentage: 52.3, sessions: 443254 },
      { type: 'Desktop', icon: <Monitor className="w-5 h-5" />, percentage: 38.7, sessions: 327888 },
      { type: 'Tablet', icon: <Tablet className="w-5 h-5" />, percentage: 9.0, sessions: 76256 }
    ],
    behavior: {
      avgWatchTime: '24:35',
      completionRate: 78.5,
      shareRate: 12.3,
      commentRate: 8.7,
      likeRate: 34.2,
      returnRate: 67.4,
      bingeWatchRate: 45.8,
      premiumConversionRate: 5.2
    },
    segments: [
      { 
        name: 'Super Fans', 
        size: 23847, 
        percentage: 2.8,
        characteristics: ['Watch 10+ hours/week', 'Premium subscribers', 'High engagement'],
        value: 'Very High',
        avgRevenue: 47.82
      },
      { 
        name: 'Regular Viewers', 
        size: 254188, 
        percentage: 30.0,
        characteristics: ['Watch 3-10 hours/week', 'Mix of free/premium', 'Medium engagement'],
        value: 'High',
        avgRevenue: 12.34
      },
      { 
        name: 'Casual Viewers', 
        size: 423647, 
        percentage: 50.0,
        characteristics: ['Watch <3 hours/week', 'Mostly free content', 'Low engagement'],
        value: 'Medium',
        avgRevenue: 3.45
      },
      { 
        name: 'New Users', 
        size: 145611, 
        percentage: 17.2,
        characteristics: ['Recently joined', 'Exploring content', 'Variable engagement'],
        value: 'Potential',
        avgRevenue: 5.67
      }
    ],
    retention: {
      day1: 72.3,
      day7: 45.8,
      day30: 28.9,
      day90: 18.2,
      day180: 12.4,
      day365: 8.7
    }
  });

  const [topContent] = useState([
    { title: 'Cyber Ronin E12', viewers: 248392, avgWatchTime: '22:45', rating: 9.2 },
    { title: 'Spirit Walker OVA', viewers: 182947, avgWatchTime: '45:20', rating: 9.5 },
    { title: 'Neon Shadows Ch5', viewers: 156234, avgWatchTime: '18:30', rating: 8.8 },
    { title: 'Quantum Blade S2', viewers: 134872, avgWatchTime: '25:15', rating: 8.7 },
    { title: 'Eclipse Protocol', viewers: 98234, avgWatchTime: '32:10', rating: 9.0 }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Audience Insights
          </h3>
          <p className="text-gray-400 text-sm mt-1">Understand your viewers and their behavior</p>
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
            <option value="1y">Last year</option>
          </select>
          <button className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-purple-400" />
            <span className="text-sm text-green-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5%
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Total Viewers</p>
          <p className="text-2xl font-bold">{formatNumber(audienceData.totalViewers)}</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <UserCheck className="w-8 h-8 text-green-400" />
            <span className="text-sm text-green-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.3%
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Active Viewers</p>
          <p className="text-2xl font-bold">{formatNumber(audienceData.activeViewers)}</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-blue-400" />
            <span className="text-sm text-blue-400">{audienceData.avgViewsPerUser}x</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Avg. Session Duration</p>
          <p className="text-2xl font-bold">{audienceData.avgSessionDuration}</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-pink-400" />
            <span className="text-sm text-pink-400">{audienceData.behavior.returnRate}%</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Return Rate</p>
          <p className="text-2xl font-bold">High Engagement</p>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex space-x-4 border-b border-gray-800">
        {['demographics', 'geography', 'behavior', 'segments'].map((view) => (
          <button
            key={view}
            onClick={() => setAudienceView(view)}
            className={`pb-4 px-2 capitalize transition-all duration-200 ${
              audienceView === view
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Demographics View */}
      {audienceView === 'demographics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Age Distribution */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Age Distribution</h3>
            <div className="space-y-4">
              {audienceData.demographics.age.map((age) => (
                <div key={age.range} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{age.range}</span>
                    <span className="text-gray-400">{age.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                      style={{ width: `${age.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Gender Distribution</h3>
            <div className="space-y-6">
              {audienceData.demographics.gender.map((gender) => (
                <div key={gender.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      gender.type === 'Male' ? 'bg-blue-900/20 text-blue-400' :
                      gender.type === 'Female' ? 'bg-pink-900/20 text-pink-400' :
                      'bg-purple-900/20 text-purple-400'
                    }`}>
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">{gender.type}</p>
                      <p className="text-sm text-gray-400">{formatNumber(gender.count)} viewers</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{gender.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Top Interests</h3>
            <div className="space-y-4">
              {audienceData.demographics.interests.map((interest) => (
                <div key={interest.category} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium mb-1">{interest.category}</p>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                        style={{ width: `${interest.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className={`ml-4 text-xs px-2 py-1 rounded-full ${
                    interest.engagement === 'Very High' ? 'bg-green-900/20 text-green-400' :
                    interest.engagement === 'High' ? 'bg-blue-900/20 text-blue-400' :
                    'bg-gray-800 text-gray-400'
                  }`}>
                    {interest.engagement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Geography View */}
      {audienceView === 'geography' && (
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-purple-400" />
              Geographic Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {audienceData.geography.map((country) => (
                <div key={country.country} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{country.country}</p>
                      <p className="text-sm text-gray-400">{formatNumber(country.viewers)} viewers</p>
                    </div>
                    <Flag className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold">{country.percentage}%</span>
                    <span className={`text-sm flex items-center ${
                      country.growth >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {country.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Distribution */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Device Usage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audienceData.devices.map((device) => (
                <div key={device.type} className="text-center p-6 bg-gray-800 rounded-xl">
                  <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400">
                    {device.icon}
                  </div>
                  <p className="font-medium mb-2">{device.type}</p>
                  <p className="text-3xl font-bold mb-1">{device.percentage}%</p>
                  <p className="text-sm text-gray-400">{formatNumber(device.sessions)} sessions</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Behavior View */}
      {audienceView === 'behavior' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(audienceData.behavior).map(([metric, value]) => (
              <div key={metric} className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
                <p className="text-sm text-gray-400 mb-2">
                  {metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-2xl font-bold">
                  {typeof value === 'string' ? value : `${value}%`}
                </p>
              </div>
            ))}
          </div>

          {/* Retention Curve */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Retention Curve</h3>
            <div className="space-y-4">
              {Object.entries(audienceData.retention).map(([period, rate]) => (
                <div key={period} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{period.replace('day', 'Day ')}</span>
                    <span className="text-gray-400">{rate}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Content by Audience */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Top Content by Viewership</h3>
            <div className="space-y-4">
              {topContent.map((content, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <PlayCircle className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">{content.title}</p>
                      <p className="text-sm text-gray-400">
                        {formatNumber(content.viewers)} viewers • {content.avgWatchTime} avg
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">{content.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Segments View */}
      {audienceView === 'segments' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {audienceData.segments.map((segment) => (
            <div key={segment.name} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold">{segment.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{formatNumber(segment.size)} users ({segment.percentage}%)</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  segment.value === 'Very High' ? 'bg-purple-900/20 text-purple-400' :
                  segment.value === 'High' ? 'bg-blue-900/20 text-blue-400' :
                  segment.value === 'Medium' ? 'bg-green-900/20 text-green-400' :
                  'bg-yellow-900/20 text-yellow-400'
                }`}>
                  {segment.value} Value
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <p className="text-sm font-medium text-gray-300">Characteristics:</p>
                <ul className="space-y-1">
                  {segment.characteristics.map((char, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-center">
                      <ChevronRight className="w-3 h-3 mr-2 text-purple-400" />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Avg. Revenue per User</span>
                  <span className="text-lg font-bold text-green-400">{formatCurrency(segment.avgRevenue)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-800">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
          Key Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Award className="w-5 h-5 text-purple-400 mt-1" />
            <div>
              <p className="font-medium">High Mobile Usage</p>
              <p className="text-sm text-gray-400">52.3% of viewers use mobile. Optimize for mobile experience.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <p className="font-medium">Growing APAC Market</p>
              <p className="text-sm text-gray-400">22.3% growth in Brazil. Consider localized content.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="font-medium">Young Audience Base</p>
              <p className="text-sm text-gray-400">61.2% are under 25. Focus on trending topics.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-pink-400 mt-1" />
            <div>
              <p className="font-medium">High Engagement Rate</p>
              <p className="text-sm text-gray-400">34.2% like rate. Community is highly engaged.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceInsights;