import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, CreditCard, Wallet,
  ArrowUpRight, ArrowDownRight, RefreshCw, Download, Filter,
  Calendar, ChevronDown, Info, ExternalLink, PieChart,
  BarChart3, LineChart, Activity, Percent, Calculator,
  Globe, Users, Clock, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';

const RevenueAnalytics = ({ formatNumber, formatCurrency }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [revenueView, setRevenueView] = useState('overview');

  // Revenue Data
  const [revenueData] = useState({
    totalRevenue: 487234.50,
    monthlyRevenue: 45782.50,
    previousMonthRevenue: 42318.75,
    yearlyRevenue: 487234.50,
    projectedRevenue: 523450.00,
    growth: 8.2,
    streams: {
      subscriptions: 287432.50,
      advertising: 123847.25,
      premiereAccess: 45234.75,
      merchandise: 18720.00,
      licensing: 12000.00
    },
    byContent: [
      { title: 'Cyber Ronin Series', revenue: 87234.50, percentage: 17.9, trend: 'up' },
      { title: 'Spirit Walker OVA', revenue: 62847.25, percentage: 12.9, trend: 'up' },
      { title: 'Neon Shadows', revenue: 45234.75, percentage: 9.3, trend: 'stable' },
      { title: 'Quantum Blade', revenue: 38472.00, percentage: 7.9, trend: 'down' },
      { title: 'Other Content', revenue: 253446.00, percentage: 52.0, trend: 'up' }
    ],
    byRegion: [
      { region: 'North America', revenue: 195293.80, percentage: 40.1, growth: 12.3 },
      { region: 'Europe', revenue: 126608.97, percentage: 26.0, growth: 8.7 },
      { region: 'Asia Pacific', revenue: 87704.21, percentage: 18.0, growth: 23.5 },
      { region: 'Latin America', revenue: 48723.45, percentage: 10.0, growth: 15.2 },
      { region: 'Middle East & Africa', revenue: 28904.07, percentage: 5.9, growth: 18.9 }
    ],
    payouts: {
      pending: 12847.50,
      processing: 8234.25,
      completed: 424152.75,
      nextPayout: '2024-07-01',
      payoutSchedule: 'Monthly'
    },
    metrics: {
      arpu: 3.78,
      ltv: 45.23,
      churnRate: 5.2,
      retentionRate: 94.8,
      conversionRate: 12.3,
      avgTransactionValue: 8.92
    }
  });

  const [transactionHistory] = useState([
    { id: 1, date: '2024-06-20', type: 'Subscription', amount: 9.99, status: 'completed', user: 'user_2847', region: 'NA' },
    { id: 2, date: '2024-06-20', type: 'Premium Access', amount: 24.99, status: 'completed', user: 'user_9283', region: 'EU' },
    { id: 3, date: '2024-06-20', type: 'Ad Revenue', amount: 127.34, status: 'pending', user: 'Google AdSense', region: 'Global' },
    { id: 4, date: '2024-06-19', type: 'Subscription', amount: 9.99, status: 'completed', user: 'user_7364', region: 'APAC' },
    { id: 5, date: '2024-06-19', type: 'Merchandise', amount: 34.99, status: 'processing', user: 'user_8472', region: 'NA' }
  ]);

  const renderRevenueCard = (title, amount, growth, icon, color) => (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className={`flex items-center text-sm ${growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {growth >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {Math.abs(growth)}%
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Revenue Analytics
          </h3>
          <p className="text-gray-400 text-sm mt-1">Track earnings, payouts, and financial performance</p>
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
            <option value="all">All time</option>
          </select>
          <button className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderRevenueCard(
          'Total Revenue',
          revenueData.totalRevenue,
          revenueData.growth,
          <DollarSign className="w-6 h-6" />,
          'bg-green-900/20 text-green-400'
        )}
        {renderRevenueCard(
          'Monthly Revenue',
          revenueData.monthlyRevenue,
          8.2,
          <Calendar className="w-6 h-6" />,
          'bg-purple-900/20 text-purple-400'
        )}
        {renderRevenueCard(
          'Pending Payouts',
          revenueData.payouts.pending,
          -12.5,
          <Clock className="w-6 h-6" />,
          'bg-yellow-900/20 text-yellow-400'
        )}
        {renderRevenueCard(
          'Projected Revenue',
          revenueData.projectedRevenue,
          15.3,
          <TrendingUp className="w-6 h-6" />,
          'bg-blue-900/20 text-blue-400'
        )}
      </div>

      {/* Revenue Streams Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-400" />
            Revenue Streams
          </h3>
          <div className="space-y-4">
            {Object.entries(revenueData.streams).map(([stream, amount]) => {
              const percentage = (amount / revenueData.totalRevenue) * 100;
              return (
                <div key={stream} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm capitalize">{stream.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-sm font-medium">{formatCurrency(amount)}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{percentage.toFixed(1)}% of total revenue</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
            Top Performing Content
          </h3>
          <div className="space-y-4">
            {revenueData.byContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex-1">
                  <p className="font-medium">{content.title}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-400">
                    <span>{formatCurrency(content.revenue)}</span>
                    <span className="mx-2">•</span>
                    <span>{content.percentage}%</span>
                  </div>
                </div>
                <div className={`flex items-center ${
                  content.trend === 'up' ? 'text-green-400' : 
                  content.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {content.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                  {content.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                  {content.trend === 'stable' && <Activity className="w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-purple-400" />
          Regional Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {revenueData.byRegion.map((region) => (
            <div key={region.region} className="text-center p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">{region.region}</p>
              <p className="text-xl font-bold mb-1">{formatCurrency(region.revenue)}</p>
              <p className="text-xs text-gray-500 mb-2">{region.percentage}% of total</p>
              <div className={`flex items-center justify-center text-sm ${
                region.growth >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {region.growth >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {Math.abs(region.growth)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(revenueData.metrics).map(([metric, value]) => (
          <div key={metric} className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
            <p className="text-xs text-gray-400 mb-1">
              {metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </p>
            <p className="text-lg font-bold">
              {metric.includes('Rate') ? `${value}%` : 
               metric === 'arpu' || metric === 'ltv' || metric === 'avgTransactionValue' ? 
               formatCurrency(value) : value}
            </p>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <button className="text-sm text-purple-400 hover:text-purple-300">
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="pb-3 text-sm font-medium text-gray-400">Date</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Type</th>
                <th className="pb-3 text-sm font-medium text-gray-400">User/Source</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Region</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Amount</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transactionHistory.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-800 transition-colors">
                  <td className="py-3 text-sm">{transaction.date}</td>
                  <td className="py-3 text-sm">{transaction.type}</td>
                  <td className="py-3 text-sm font-mono text-purple-400">{transaction.user}</td>
                  <td className="py-3 text-sm">{transaction.region}</td>
                  <td className="py-3 text-sm font-medium">{formatCurrency(transaction.amount)}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'completed' ? 'bg-green-900/20 text-green-400' :
                      transaction.status === 'pending' ? 'bg-yellow-900/20 text-yellow-400' :
                      'bg-blue-900/20 text-blue-400'
                    }`}>
                      {transaction.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {transaction.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {transaction.status === 'processing' && <RefreshCw className="w-3 h-3 mr-1" />}
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Information */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Next Payout</h3>
            <p className="text-3xl font-bold mb-1">{formatCurrency(revenueData.payouts.pending + revenueData.payouts.processing)}</p>
            <p className="text-sm text-gray-400">
              Scheduled for {revenueData.payouts.nextPayout} • {revenueData.payouts.payoutSchedule} payouts
            </p>
          </div>
          <div className="text-right">
            <button className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
              View Payout Details
            </button>
            <p className="text-xs text-gray-500 mt-2">
              <Info className="w-3 h-3 inline mr-1" />
              Payments processed via Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;