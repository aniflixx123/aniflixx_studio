import React, { useState, useMemo } from 'react';
import { 
  Search, TrendingUp, TrendingDown, Upload, MoreVertical, Trash2, Edit3,
  FileX, Globe, Lock, Unlock, Flame, BarChart3, ExternalLink, Star
} from 'lucide-react';

const ContentLibrary = ({ contentData, setContentData, formatNumber, formatCurrency }) => {
  const [selectedContent, setSelectedContent] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const [contentFilters, setContentFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
    region: 'all',
    sortBy: 'views',
    sortOrder: 'desc'
  });

  const handleDeleteContent = (contentIds) => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setContentData(prev => prev.filter(item => !selectedContent.includes(item.id)));
    setSelectedContent([]);
    setShowDeleteConfirm(false);
  };

  const handleBulkAction = (action) => {
    switch(action) {
      case 'delete':
        handleDeleteContent(selectedContent);
        break;
      case 'unpublish':
        setContentData(prev => prev.map(item => 
          selectedContent.includes(item.id) ? { ...item, status: 'draft' } : item
        ));
        break;
      case 'updateRegions':
        // Open region update modal
        break;
    }
    setSelectedContent([]);
  };

  const filteredContent = useMemo(() => {
    let filtered = [...contentData];
    
    if (contentFilters.search) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(contentFilters.search.toLowerCase()) ||
        item.genre.toLowerCase().includes(contentFilters.search.toLowerCase())
      );
    }
    
    if (contentFilters.type !== 'all') {
      filtered = filtered.filter(item => item.type === contentFilters.type);
    }
    
    if (contentFilters.status !== 'all') {
      filtered = filtered.filter(item => item.status === contentFilters.status);
    }

    if (contentFilters.region !== 'all') {
      filtered = filtered.filter(item => 
        item.regions.includes(contentFilters.region) || item.regions.includes('Global')
      );
    }
    
    filtered.sort((a, b) => {
      const order = contentFilters.sortOrder === 'asc' ? 1 : -1;
      switch (contentFilters.sortBy) {
        case 'views': return (b.views - a.views) * order;
        case 'revenue': return (b.revenue - a.revenue) * order;
        case 'engagement': return ((b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares)) * order;
        case 'date': return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime() * order;
        default: return 0;
      }
    });
    
    return filtered;
  }, [contentData, contentFilters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Content Library</h3>
          <p className="text-gray-500 text-sm mt-1">Manage your content with regional licensing controls</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedContent.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{selectedContent.length} selected</span>
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center"
              >
                <MoreVertical className="w-4 h-4 mr-2" />
                Bulk Actions
              </button>
            </div>
          )}
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload New Content
          </button>
        </div>
      </div>

      {/* Bulk Actions Dropdown */}
      {showBulkActions && selectedContent.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleBulkAction('delete')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected
            </button>
            <button
              onClick={() => handleBulkAction('unpublish')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center"
            >
              <FileX className="w-4 h-4 mr-2" />
              Unpublish
            </button>
            <button
              onClick={() => handleBulkAction('updateRegions')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center"
            >
              <Globe className="w-4 h-4 mr-2" />
              Update Regions
            </button>
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={contentFilters.search}
              onChange={(e) => setContentFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          
          <select
            value={contentFilters.type}
            onChange={(e) => setContentFilters(prev => ({ ...prev, type: e.target.value }))}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="all">All Types</option>
            <option value="Anime">Anime</option>
            <option value="Manga">Manga</option>
            <option value="Flick">Flick</option>
          </select>
          
          <select
            value={contentFilters.status}
            onChange={(e) => setContentFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="processing">Processing</option>
          </select>
          
          <select
            value={contentFilters.region}
            onChange={(e) => setContentFilters(prev => ({ ...prev, region: e.target.value }))}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="all">All Regions</option>
            <option value="Global">Global</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia Pacific">Asia Pacific</option>
            <option value="Latin America">Latin America</option>
          </select>
          
          <select
            value={contentFilters.sortBy}
            onChange={(e) => setContentFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="views">Sort by Views</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="engagement">Sort by Engagement</option>
            <option value="date">Sort by Date</option>
          </select>
          
          <button
            onClick={() => setContentFilters(prev => ({ 
              ...prev, 
              sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
            }))}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            {contentFilters.sortOrder === 'asc' ? 
              <TrendingUp className="w-5 h-5" /> : 
              <TrendingDown className="w-5 h-5" />
            }
          </button>
        </div>
      </div>

      {/* Enhanced Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredContent.map((content) => (
          <div key={content.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-purple-600 transition-all duration-300">
            <div className="p-6">
              {/* Content Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedContent.includes(content.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedContent([...selectedContent, content.id]);
                      } else {
                        setSelectedContent(selectedContent.filter(id => id !== content.id));
                      }
                    }}
                    className="mt-1 w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <div className="text-5xl">{content.thumbnail}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{content.title}</h4>
                    <p className="text-sm text-gray-500">{content.genre} • {content.type}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        content.status === 'published' 
                          ? 'bg-green-900/20 text-green-400 border border-green-900' 
                          : 'bg-yellow-900/20 text-yellow-400 border border-yellow-900'
                      }`}>
                        {content.status}
                      </span>
                      {content.trending && (
                        <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold flex items-center">
                          <Flame className="w-3 h-3 mr-1" />
                          Trending
                        </span>
                      )}
                      <span className="px-2 py-1 bg-purple-900/20 text-purple-400 border border-purple-900 rounded-full text-xs">
                        {content.licensing.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Actions Menu */}
                <div className="relative">
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-2xl font-bold">{formatNumber(content.views)}</p>
                  <p className="text-xs text-gray-500">Total Views</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-500">{formatCurrency(content.revenue)}</p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{content.completionRate}%</p>
                  <p className="text-xs text-gray-500">Completion</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{content.qualityScore}</p>
                  <p className="text-xs text-gray-500">Quality Score</p>
                </div>
              </div>

              {/* Regional Licensing */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  Regional Availability
                </h5>
                <div className="flex flex-wrap gap-2">
                  {content.regions.map((region) => (
                    <span key={region} className="px-2 py-1 bg-gray-800 rounded text-xs flex items-center">
                      {region === 'Global' ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                      {region}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  License expires: {content.licensing.expiryDate} 
                  {content.licensing.autoRenew && <span className="text-green-400 ml-2">(Auto-renew enabled)</span>}
                </p>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-800/50 rounded-lg">
                <div className="text-xs">
                  <span className="text-gray-500">Resolution:</span> <span className="font-medium">{content.resolution}</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Format:</span> <span className="font-medium">{content.format}</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">File Size:</span> <span className="font-medium">{content.fileSize}</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Bitrate:</span> <span className="font-medium">{content.bitrate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors flex items-center">
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                  <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors flex items-center">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Analytics
                  </button>
                  <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Live
                  </button>
                </div>
                <button 
                  onClick={() => handleDeleteContent([content.id])}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-900/20 rounded-full mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Delete Content</h2>
              <p className="text-gray-400 text-center mb-6">
                Are you sure you want to delete {selectedContent.length} item{selectedContent.length > 1 ? 's' : ''}? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentLibrary;