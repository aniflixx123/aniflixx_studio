import React, { useState } from 'react';
import { 
  Brain, TrendingUp, TrendingDown, Target, Users, BarChart3,
  Globe, Zap, AlertTriangle, Trophy, Star, Eye, Activity,
  ChevronUp, ChevronDown, Filter, Download, Calendar,
  Lightbulb, Flag, Award, Shield, Flame, ArrowUpRight,
  ArrowDownRight, DollarSign, Clock, Hash, PlayCircle,
  Sparkles, Info, ExternalLink, BookOpen, Search,ChevronRight
} from 'lucide-react';

const MarketIntelligence = ({ formatNumber, formatCurrency }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [marketView, setMarketView] = useState('competitors');

  const [competitorData] = useState([
    {
      name: 'CrunchyStream',
      marketShare: 32.5,
      subscribers: '15.2M',
      growth: 8.3,
      avgViewTime: '28:45',
      contentLibrary: 12847,
      strengths: ['Exclusive licenses', 'Mobile app', 'Simulcast'],
      weaknesses: ['Higher pricing', 'Limited dubs'],
      threat: 'high'
    },
    {
      name: 'AnimePlex',
      marketShare: 24.3,
      subscribers: '11.3M',
      growth: 12.7,
      avgViewTime: '22:30',
      contentLibrary: 9283,
      strengths: ['Original content', 'Community features', 'Low price'],
      weaknesses: ['Smaller library', 'Tech issues'],
      threat: 'medium'
    },
    {
      name: 'OtakuVault',
      marketShare: 18.7,
      subscribers: '8.7M',
      growth: -2.3,
      avgViewTime: '19:15',
      contentLibrary: 7234,
      strengths: ['Classic anime', 'Niche content', 'Forums'],
      weaknesses: ['Outdated UI', 'Limited new releases'],
      threat: 'low'
    }
  ]);

  const [marketTrends] = useState({
    trending: [
      { trend: 'Isekai Genre Surge', impact: 'high', growth: 34.2, opportunity: true },
      { trend: 'Mobile-First Viewing', impact: 'high', growth: 28.7, opportunity: true },
      { trend: 'AI-Generated Subtitles', impact: 'medium', growth: 45.8, opportunity: true },
      { trend: 'NFT Collectibles', impact: 'low', growth: -12.3, opportunity: false },
      { trend: 'VR Anime Experiences', impact: 'medium', growth: 67.3, opportunity: true }
    ],
    genres: [
      { name: 'Shonen', popularity: 89, growth: 12.3, competition: 'high' },
      { name: 'Isekai', popularity: 78, growth: 34.2, competition: 'medium' },
      { name: 'Romance', popularity: 72, growth: 8.7, competition: 'high' },
      { name: 'Slice of Life', popularity: 65, growth: 15.4, competition: 'low' },
      { name: 'Psychological', popularity: 58, growth: 23.1, competition: 'low' }
    ],
    demographics: {
      ageGroups: [
        { range: '13-17', marketSize: '12.3M', growth: 18.2, avgSpend: 15.99 },
        { range: '18-24', marketSize: '28.7M', growth: 12.5, avgSpend: 24.99 },
        { range: '25-34', marketSize: '22.1M', growth: 8.3, avgSpend: 34.99 },
        { range: '35+', marketSize: '8.9M', growth: 23.7, avgSpend: 42.99 }
      ]
    }
  });

  const [opportunities] = useState([
    {
      title: 'Untapped Latin American Market',
      potential: 'Very High',
      investment: 'Medium',
      timeframe: '6-12 months',
      description: 'Growing anime interest with limited local options'
    },
    {
      title: 'AI-Powered Recommendations',
      potential: 'High',
      investment: 'Low',
      timeframe: '3-6 months',
      description: 'Improve retention with personalized content discovery'
    },
    {
      title: 'Exclusive Indie Anime',
      potential: 'Medium',
      investment: 'Low',
      timeframe: '1-3 months',
      description: 'Partner with indie creators for exclusive content'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Market Intelligence
          </h3>
          <p className="text-gray-400 text-sm mt-1">Competitive analysis and market opportunities</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
          >
            <option value="30d">Last 30 days</option>
            <option value="90d">Last quarter</option>
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

      {/* Market Position Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold">#4</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Market Position</p>
          <p className="text-lg font-medium">Rising Challenger</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-purple-400" />
            <span className="text-sm text-green-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              15.2%
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Market Share</p>
          <p className="text-2xl font-bold">8.7%</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-pink-400" />
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-sm text-gray-400 mb-1">Growth Potential</p>
          <p className="text-2xl font-bold">Very High</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="text-lg font-bold">87</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Innovation Score</p>
          <p className="text-lg font-medium">Industry Leader</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex space-x-4 border-b border-gray-800">
        {['competitors', 'trends', 'opportunities', 'insights'].map((view) => (
          <button
            key={view}
            onClick={() => setMarketView(view)}
            className={`pb-4 px-2 capitalize transition-all duration-200 ${
              marketView === view
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Competitors View */}
      {marketView === 'competitors' && (
        <div className="space-y-6">
          {/* Competitor Analysis */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Competitor Analysis</h3>
            <div className="space-y-6">
              {competitorData.map((competitor) => (
                <div key={competitor.name} className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold">{competitor.name}</h4>
                        <span className="text-green-400">+{competitor.growth}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Market share: {competitor.marketShare}%</span>
                        <span>Subscribers: {competitor.subscribers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Opportunities View */}
      {marketView === 'opportunities' && (
        <div className="space-y-6">
          {/* Strategic Opportunities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-800 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <Lightbulb className="w-8 h-8 text-yellow-400" />
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    opp.potential === 'Very High' ? 'bg-purple-900/20 text-purple-400' :
                    opp.potential === 'High' ? 'bg-blue-900/20 text-blue-400' :
                    'bg-green-900/20 text-green-400'
                  }`}>
                    {opp.potential} Potential
                  </span>
                </div>
                <h4 className="text-lg font-semibold mb-2">{opp.title}</h4>
                <p className="text-sm text-gray-400 mb-4">{opp.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Investment:</span>
                    <span>{opp.investment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Timeframe:</span>
                    <span>{opp.timeframe}</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Explore Opportunity
                </button>
              </div>
            ))}
          </div>

          {/* SWOT Analysis */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">SWOT Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-6">
                  <h4 className="font-medium text-green-400 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-green-400 mt-0.5" />
                      Advanced analytics and AI recommendations
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-green-400 mt-0.5" />
                      Strong community engagement features
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-green-400 mt-0.5" />
                      Competitive pricing model
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-400 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Weaknesses
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-red-400 mt-0.5" />
                      Limited exclusive content library
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-red-400 mt-0.5" />
                      Smaller market presence
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-red-400 mt-0.5" />
                      Limited international licensing
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <h4 className="font-medium text-yellow-400 mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Opportunities
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-yellow-400 mt-0.5" />
                      Growing global anime market
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-yellow-400 mt-0.5" />
                      Partnership with indie creators
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-yellow-400 mt-0.5" />
                      Emerging markets expansion
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-purple-400 mb-3 flex items-center">
                    <Flag className="w-5 h-5 mr-2" />
                    Threats
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-0.5" />
                      Increasing competition from major players
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-0.5" />
                      Rising content licensing costs
                    </li>
                    <li className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-0.5" />
                      Market saturation in key regions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights View */}
      {marketView === 'insights' && (
        <div className="space-y-6">
          {/* Key Market Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-400" />
                AI-Powered Predictions
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Next Big Genre</p>
                    <span className="text-sm text-purple-400">95% confidence</span>
                  </div>
                  <p className="text-sm text-gray-400">Cyberpunk Isekai fusion expected to grow 45% in Q3</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Market Expansion</p>
                    <span className="text-sm text-blue-400">87% confidence</span>
                  </div>
                  <p className="text-sm text-gray-400">Southeast Asia market to double by 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-pink-400" />
                Strategic Recommendations
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Immediate: Launch mobile app</p>
                    <p className="text-xs text-gray-400">52% of competitors' traffic is mobile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Q2: Secure 3 exclusive titles</p>
                    <p className="text-xs text-gray-400">Focus on trending genres</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Q3: Expand to LATAM</p>
                    <p className="text-xs text-gray-400">22% YoY growth opportunity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Research Resources */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
              Industry Reports & Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Q2 Anime Market Report', date: '2024-06-15', type: 'PDF' },
                { title: 'Streaming Wars Analysis', date: '2024-06-10', type: 'Video' },
                { title: 'Consumer Behavior Study', date: '2024-06-01', type: 'PDF' }
              ].map((report, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{report.title}</h4>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400">{report.date} • {report.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Items */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
            <p className="text-sm text-gray-400">Based on current market analysis</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
              Generate Report
            </button>
            <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              Schedule Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;