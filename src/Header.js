import React, { useState } from 'react';
import { 
  Calendar, ChevronDown, RefreshCw, Bell, Info, CheckCircle, AlertTriangle
} from 'lucide-react';

const Header = ({ notifications, setNotifications }) => {
  const [dateRange, setDateRange] = useState('30days');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-gray-950 border-b border-gray-800 px-8 py-4 sticky top-0 z-10 backdrop-blur-lg bg-opacity-90">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Studio Dashboard
          </h2>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Cyber Studios • Premium Plan</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Date Range Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg hover:border-purple-600 transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2 text-purple-500" />
              <span className="text-sm">
                {dateRange === 'custom' && customDateRange.start 
                  ? `${customDateRange.start} - ${customDateRange.end}`
                  : dateRange === '7days' ? 'Last 7 days'
                  : dateRange === '30days' ? 'Last 30 days' 
                  : dateRange === '90days' ? 'Last 90 days'
                  : 'All time'
                }
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            
            {showDatePicker && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-4">
                <div className="space-y-2">
                  {['7days', '30days', '90days', 'all', 'custom'].map(range => (
                    <button
                      key={range}
                      onClick={() => {
                        setDateRange(range);
                        if (range !== 'custom') setShowDatePicker(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        dateRange === range ? 'bg-purple-600 text-white' : 'hover:bg-gray-800'
                      }`}
                    >
                      {range === '7days' ? 'Last 7 days' :
                       range === '30days' ? 'Last 30 days' :
                       range === '90days' ? 'Last 90 days' :
                       range === 'all' ? 'All time' : 'Custom range'}
                    </button>
                  ))}
                </div>
                {dateRange === 'custom' && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="date"
                      value={customDateRange.start}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <input
                      type="date"
                      value={customDateRange.end}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <button className="p-2 bg-gray-900 border border-gray-800 rounded-lg hover:border-purple-600 transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 bg-gray-900 border border-gray-800 rounded-lg hover:border-purple-600 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="divide-y divide-gray-800">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-4 hover:bg-gray-800 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-purple-900/10' : ''
                      }`}
                      onClick={() => {
                        setNotifications(prev => prev.map(n => 
                          n.id === notification.id ? { ...n, read: true } : n
                        ));
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'success' ? 'bg-green-900/20 text-green-400' :
                          notification.type === 'warning' ? 'bg-yellow-900/20 text-yellow-400' :
                          'bg-blue-900/20 text-blue-400'
                        }`}>
                          {notification.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                           notification.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                           <Info className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-800">
            <div className="text-right">
              <p className="text-sm font-medium">Cyber Studios</p>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="font-bold">CS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;