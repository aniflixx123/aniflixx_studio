import React from 'react';
import { 
  Menu, X, Home, Package, CloudUpload, DollarSign, Users, BarChart2, 
  Heart, Target, Briefcase, Settings, HelpCircle, LogOut, 
  Film, Shield, Database, Crown
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  const navigationItems = [
    { 
      id: 'overview', 
      label: 'Dashboard', 
      icon: Home, 
      badge: null,
      description: 'Overview & KPIs'
    },
    { 
      id: 'content', 
      label: 'Content Library', 
      icon: Package, 
      badge: 3, // This would come from props
      description: 'Manage your content',
      highlight: true
    },
    { 
      id: 'uploads', 
      label: 'Upload Center', 
      icon: CloudUpload, 
      badge: null,
      description: 'Upload & process',
      highlight: true
    },
    { 
      id: 'revenue', 
      label: 'Revenue', 
      icon: DollarSign, 
      badge: null,
      description: 'Earnings & payouts'
    },
    { 
      id: 'audience', 
      label: 'Audience', 
      icon: Users, 
      badge: 'New',
      description: 'Viewer insights'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart2, 
      badge: null,
      description: 'Deep dive metrics'
    },
    { 
      id: 'engagement', 
      label: 'Engagement', 
      icon: Heart, 
      badge: null,
      description: 'Social metrics'
    },
    { 
      id: 'competitors', 
      label: 'Market Intel', 
      icon: Target, 
      badge: 'Beta',
      description: 'Competitor analysis'
    },
    { 
      id: 'team', 
      label: 'Team', 
      icon: Briefcase, 
      badge: null,
      description: 'Manage access'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      badge: null,
      description: 'Studio settings'
    }
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-950 to-gray-900 border-r border-gray-800 transition-all duration-300 z-20 ${
        sidebarOpen ? 'w-72' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AniFlixx Studio
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Premium Plan</span>
                  <Crown className="w-3 h-3 text-yellow-500" />
                </div>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-600/30' 
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              } ${item.highlight ? 'ring-1 ring-purple-600/20' : ''}`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                      : 'bg-gray-800 group-hover:bg-gray-700'
                  }`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  {sidebarOpen && (
                    <div className="ml-3">
                      <span className="font-medium">{item.label}</span>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      )}
                    </div>
                  )}
                </div>
                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.badge === 'New' || item.badge === 'Beta' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
              
              {/* Hover tooltip for collapsed sidebar */}
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  <p className="font-medium">{item.label}</p>
                  {item.description && (
                    <p className="text-xs text-gray-400">{item.description}</p>
                  )}
                </div>
              )}
            </button>
          ))}
        </nav>
        
        {/* Storage & Account Info */}
        <div className="p-4 border-t border-gray-800 space-y-3">
          {/* Data Security Badge */}
          <div className={`px-4 py-3 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-800/30 ${
            sidebarOpen ? 'block' : 'hidden'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-400">Data Security</span>
            </div>
            <p className="text-xs text-gray-400">End-to-end encryption</p>
            <p className="text-xs text-gray-400">GDPR compliant</p>
          </div>
          
          {/* Storage Usage */}
          <div className={`px-4 py-3 bg-gray-800 rounded-lg ${
            sidebarOpen ? 'block' : 'hidden'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Storage Used</span>
              </div>
              <span className="text-xs text-gray-400">80%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <p className="text-xs text-gray-400">8TB of 10TB used</p>
            <button className="text-xs text-purple-400 hover:text-purple-300 mt-1">Upgrade Storage</button>
          </div>
          
          {/* Account Actions */}
          <div className="space-y-1">
            <button className="w-full flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
              <HelpCircle className="w-4 h-4" />
              {sidebarOpen && <span className="ml-3 text-sm">Help & Support</span>}
            </button>
            
            <button className="w-full flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              {sidebarOpen && <span className="ml-3 text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;