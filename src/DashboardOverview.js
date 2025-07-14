import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Eye, DollarSign, Users, Activity, CheckCircle, Share2, RefreshCw, 
  Shield, Clock, ArrowUpRight, ArrowDownRight, Sparkles, Award, TrendingUp, Flame
} from 'lucide-react';

const DashboardOverview = ({ dashboardData, formatNumber, formatCurrency }) => {
  const generateSparklineData = () => {
    return Array.from({ length: 7 }, () => ({ value: Math.random() * 100 }));
  };

  const MetricCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '', sparklineData }) => {
    const isPositive = change >= 0;
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-600 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-purple-600/20 transition-colors">
            <Icon className="w-5 h-5 text-purple-500" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <p className="text-3xl font-bold text-white mb-2">
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </p>
            <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              <span className="font-medium">{Math.abs(change)}%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          {sparklineData && (
            <div className="ml-4">
              <ResponsiveContainer width={80} height={40}>
                <LineChart data={sparklineData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={isPositive ? '#10b981' : '#ef4444'} 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ViewingHeatmap = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const generateHeatmapData = () => {
      const data = [];
      days.forEach((day) => {
        hours.forEach(hour => {
          let intensity = Math.random() * 100;
          if ((hour >= 19 && hour <= 23) || (hour >= 12 && hour <= 14)) {
            intensity = Math.random() * 50 + 50;
          }
          data.push({
            day,
            hour,
            value: Math.round(intensity),
            views: Math.round(intensity * 1000)
          });
        });
      });
      return data;
    };

    const heatmapData = generateHeatmapData();
    
    const getColor = (value) => {
      if (value > 80) return 'bg-purple-600';
      if (value > 60) return 'bg-purple-500';
      if (value > 40) return 'bg-purple-400';
      if (value > 20) return 'bg-purple-300';
      return 'bg-gray-700';
    };

    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Flame className="w-5 h-5 mr-2 text-orange-500" />
          Viewing Activity Heatmap
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex mb-2">
              <div className="w-12"></div>
              {hours.map(hour => (
                <div key={hour} className="flex-1 text-center text-xs text-gray-500">
                  {hour === 0 ? '12a' : hour < 12 ? `${hour}a` : hour === 12 ? '12p' : `${hour-12}p`}
                </div>
              ))}
            </div>
            {days.map(day => (
              <div key={day} className="flex mb-1">
                <div className="w-12 text-sm text-gray-400 flex items-center">{day}</div>
                {hours.map(hour => {
                  const dataPoint = heatmapData.find(d => d.day === day && d.hour === hour);
                  const value = dataPoint?.value || 0;
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={`flex-1 h-8 mx-0.5 rounded ${getColor(value)} hover:ring-2 hover:ring-purple-400 transition-all cursor-pointer group relative`}
                      title={`${day} ${hour}:00 - ${dataPoint?.views || 0} views`}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {dataPoint?.views || 0} views
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-6 space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-700 rounded mr-2"></div>
              <span className="text-gray-400">Low Activity</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-400 rounded mr-2"></div>
              <span className="text-gray-400">Medium Activity</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-600 rounded mr-2"></div>
              <span className="text-gray-400">High Activity</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Key Performance Indicators */}
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
          Key Performance Indicators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Views"
            value={formatNumber(dashboardData.totalViews)}
            change={dashboardData.viewsGrowth}
            icon={Eye}
            sparklineData={generateSparklineData()}
          />
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(dashboardData.totalRevenue)}
            change={dashboardData.revenueGrowth}
            icon={DollarSign}
            sparklineData={generateSparklineData()}
          />
          <MetricCard
            title="Total Followers"
            value={formatNumber(dashboardData.followers)}
            change={dashboardData.followersGrowth}
            icon={Users}
            sparklineData={generateSparklineData()}
          />
          <MetricCard
            title="Engagement Rate"
            value={dashboardData.engagementRate}
            change={2.1}
            icon={Activity}
            suffix="%"
            sparklineData={generateSparklineData()}
          />
        </div>
      </div>

      {/* Advanced Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: 'Completion Rate', value: `${dashboardData.completionRate}%`, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Share Rate', value: `${dashboardData.shareRate}%`, icon: Share2, color: 'text-blue-500' },
          { label: 'Return Viewers', value: `${dashboardData.returnViewerRate}%`, icon: RefreshCw, color: 'text-purple-500' },
          { label: 'Premium Viewers', value: `${dashboardData.premiumViewers}%`, icon: Award, color: 'text-yellow-500' },
          { label: 'Ad Block Rate', value: `${dashboardData.adBlockRate}%`, icon: Shield, color: 'text-red-500' },
          { label: 'Avg Session', value: dashboardData.avgSessionDuration, icon: Clock, color: 'text-cyan-500' }
        ].map((metric, index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-purple-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className="text-xs text-gray-500">Now</span>
            </div>
            <p className="text-lg font-bold">{metric.value}</p>
            <p className="text-xs text-gray-500">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Premium Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views & Revenue Combined Chart */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-6">Views & Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={[
              { date: 'Mon', views: 42000, revenue: 680 },
              { date: 'Tue', views: 38000, revenue: 620 },
              { date: 'Wed', views: 45000, revenue: 750 },
              { date: 'Thu', views: 51000, revenue: 820 },
              { date: 'Fri', views: 62000, revenue: 980 },
              { date: 'Sat', views: 78000, revenue: 1250 },
              { date: 'Sun', views: 85000, revenue: 1380 }
            ]}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#6b7280" />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="views"
                stroke="#9333ea"
                fillOpacity={1}
                fill="url(#colorViews)"
                name="Views"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ fill: '#ec4899', r: 4 }}
                name="Revenue ($)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Content Performance Radar */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-6">Content Performance Matrix</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={[
              { metric: 'Views', value: 85, benchmark: 70 },
              { metric: 'Engagement', value: 78, benchmark: 65 },
              { metric: 'Completion', value: 82, benchmark: 75 },
              { metric: 'Shares', value: 65, benchmark: 60 },
              { metric: 'Revenue', value: 88, benchmark: 72 },
              { metric: 'Quality', value: 92, benchmark: 80 }
            ]}>
              <PolarGrid stroke="#1f2937" />
              <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
              <Radar name="Your Performance" dataKey="value" stroke="#9333ea" fill="#9333ea" fillOpacity={0.6} />
              <Radar name="Industry Benchmark" dataKey="benchmark" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
              <Legend />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}
                labelStyle={{ color: '#9ca3af' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Viewing Heatmap */}
      <ViewingHeatmap />

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top Performing Content</h3>
            <Award className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {/* Content would be passed as props here */}
            <p className="text-sm text-gray-500">No content data available</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Revenue Sources</h3>
            <PieChart className="w-5 h-5 text-purple-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Subscriptions', value: 45, color: '#9333ea' },
                  { name: 'Ads', value: 30, color: '#ec4899' },
                  { name: 'PPV', value: 20, color: '#3b82f6' },
                  { name: 'Other', value: 5, color: '#10b981' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {[
                  { name: 'Subscriptions', value: 45, color: '#9333ea' },
                  { name: 'Ads', value: 30, color: '#ec4899' },
                  { name: 'PPV', value: 20, color: '#3b82f6' },
                  { name: 'Other', value: 5, color: '#10b981' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}
                labelStyle={{ color: '#9ca3af' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Next Payout</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                {formatCurrency(12847.50)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Processing on July 1st</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Previous Payout</span>
                <span>{formatCurrency(11234.75)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Lifetime Earnings</span>
                <span className="font-bold">{formatCurrency(287439.25)}</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium">
              View Payout Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;