import React, { useState, useEffect } from 'react';
import { 
  CloudUpload, Server, FileVideo, FolderPlus, Layers, Film, Image, Globe,
  CheckCircle, Zap, X, ChevronRight, Database, Sparkles, Shield,
  Clock, Users, TrendingUp, AlertCircle, Upload, PlayCircle,
  Settings, FileText, Languages, Calendar, DollarSign, BarChart3,
  Cpu, HardDrive, Wifi, Lock, Eye, EyeOff, Plus, Minus
} from 'lucide-react';

const UploadCenter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadType, setUploadType] = useState('single');
  const [uploadStep, setUploadStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activePreset, setActivePreset] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Enhanced metadata state
  const [uploadMetadata, setUploadMetadata] = useState({
    title: '',
    description: '',
    category: '',
    visibility: 'public',
    tags: [],
    subtitleLanguages: [],
    audioTracks: [],
    ageRating: 'PG',
    monetization: 'ads',
    premiumTiers: []
  });

  const [uploadPresets] = useState([
    { 
      id: 1, 
      name: 'Anime Series Default', 
      icon: '🎌',
      settings: { 
        category: 'Anime', 
        visibility: 'public', 
        subtitles: true,
        autoChapters: true,
        aiEnhancement: true
      } 
    },
    { 
      id: 2, 
      name: 'Manga Upload', 
      icon: '📚',
      settings: { 
        category: 'Manga', 
        visibility: 'public', 
        subtitles: false,
        imageOptimization: true,
        readingDirection: 'rtl'
      } 
    },
    { 
      id: 3, 
      name: 'Premium Content', 
      icon: '👑',
      settings: { 
        category: 'Flick', 
        visibility: 'premium', 
        subtitles: true,
        drm: 'widevine',
        maxQuality: '4K'
      } 
    }
  ]);

  const [regionalSettings, setRegionalSettings] = useState({
    globalRights: false,
    regions: {
      'North America': { 
        enabled: true, 
        releaseDate: '2024-06-15', 
        expiryDate: '2025-06-15',
        pricing: { currency: 'USD', amount: 9.99 },
        restrictions: []
      },
      'Europe': { 
        enabled: true, 
        releaseDate: '2024-06-15', 
        expiryDate: '2025-06-15',
        pricing: { currency: 'EUR', amount: 8.99 },
        restrictions: ['age_verification']
      },
      'Asia Pacific': { 
        enabled: false, 
        releaseDate: '', 
        expiryDate: '',
        pricing: { currency: 'JPY', amount: 980 },
        restrictions: []
      },
      'Latin America': { 
        enabled: true, 
        releaseDate: '2024-07-01', 
        expiryDate: '2025-07-01',
        pricing: { currency: 'USD', amount: 5.99 },
        restrictions: []
      },
      'Middle East & Africa': { 
        enabled: false, 
        releaseDate: '', 
        expiryDate: '',
        pricing: { currency: 'USD', amount: 6.99 },
        restrictions: ['content_review']
      }
    }
  });

  const [processingFeatures, setProcessingFeatures] = useState({
    autoTranscode: true,
    generateThumbnails: true,
    extractSubtitles: true,
    aiQualityEnhancement: false,
    generateChapters: true,
    contentModeration: true,
    virusScanning: true
  });

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const addNotification = (type, message) => {
    console.log(`${type}: ${message}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'image/jpeg', 'image/png', 'application/x-subrip', 'text/vtt'];
      return validTypes.includes(file.type) || file.name.endsWith('.srt') || file.name.endsWith('.vtt');
    });

    const newUploads = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type.startsWith('video') ? 'video' : 
            file.type.startsWith('image') ? 'image' : 'subtitle',
      status: 'pending',
      progress: 0,
      metadata: {
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: '',
        tags: [],
        category: '',
        visibility: 'public',
        regions: [],
        releaseSchedule: {},
        subtitles: [],
        chapters: [],
        thumbnails: []
      },
      processing: {
        resolution: 'detecting...',
        duration: 'detecting...',
        codec: 'detecting...',
        bitrate: 'detecting...'
      }
    }));

    setSelectedFiles([...selectedFiles, ...newUploads]);
  };

  const startUpload = (fileId) => {
    const file = selectedFiles.find(f => f.id === fileId);
    if (!file) return;

    setSelectedFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading' } : f
    ));

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[fileId] || 0;
        const increment = Math.random() * 15;
        const newProgress = Math.min(currentProgress + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setSelectedFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, status: 'processing' } : f
          ));
          
          // Simulate processing phase
          setTimeout(() => {
            setSelectedFiles(prev => prev.map(f => 
              f.id === fileId ? { 
                ...f, 
                status: 'completed',
                processing: {
                  resolution: '1920x1080',
                  duration: '24:35',
                  codec: 'H.264',
                  bitrate: '5.2 Mbps'
                }
              } : f
            ));
            addNotification('success', `${file.name} uploaded successfully!`);
          }, 3000);
        }
        
        return { ...prev, [fileId]: newProgress };
      });
    }, 500);
  };

  const startBatchUpload = () => {
    selectedFiles.filter(f => f.status === 'pending').forEach((file, index) => {
      setTimeout(() => startUpload(file.id), index * 1000);
    });
  };

  const toggleRegion = (region) => {
    setRegionalSettings(prev => ({
      ...prev,
      regions: {
        ...prev.regions,
        [region]: {
          ...prev.regions[region],
          enabled: !prev.regions[region].enabled
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Upload Center
          </h3>
          <p className="text-gray-400 text-sm mt-1">Advanced upload with regional licensing and batch processing</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800">
            <Server className="w-4 h-4 text-purple-400" />
            <span className="text-gray-400">Processing:</span>
            <span className="font-medium text-purple-400">Premium (8x faster)</span>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="group flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            <CloudUpload className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            New Upload
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-purple-800 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Storage Used</p>
              <p className="text-2xl font-bold">847 GB</p>
              <p className="text-xs text-purple-400 mt-1">of 2 TB</p>
            </div>
            <HardDrive className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-pink-800 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Upload Speed</p>
              <p className="text-2xl font-bold">125 Mbps</p>
              <p className="text-xs text-green-400 mt-1">↑ Excellent</p>
            </div>
            <Wifi className="w-8 h-8 text-pink-500 opacity-50" />
          </div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-blue-800 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Processing Queue</p>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-blue-400 mt-1">~5 min remaining</p>
            </div>
            <Cpu className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-green-800 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Published Today</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-green-400 mt-1">↑ 20% vs yesterday</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Upload Type Selection */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Upload Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setUploadType('single')}
            className={`group p-6 rounded-xl border-2 transition-all duration-300 ${
              uploadType === 'single' 
                ? 'border-purple-600 bg-purple-600/10 shadow-lg shadow-purple-500/20' 
                : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
            }`}
          >
            <FileVideo className={`w-10 h-10 mb-3 mx-auto transition-transform group-hover:scale-110 ${
              uploadType === 'single' ? 'text-purple-400' : 'text-gray-400'
            }`} />
            <h4 className="font-semibold mb-1">Single Upload</h4>
            <p className="text-xs text-gray-400">Perfect for individual episodes or movies</p>
          </button>
          
          <button
            onClick={() => setUploadType('batch')}
            className={`group p-6 rounded-xl border-2 transition-all duration-300 ${
              uploadType === 'batch' 
                ? 'border-purple-600 bg-purple-600/10 shadow-lg shadow-purple-500/20' 
                : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
            }`}
          >
            <FolderPlus className={`w-10 h-10 mb-3 mx-auto transition-transform group-hover:scale-110 ${
              uploadType === 'batch' ? 'text-purple-400' : 'text-gray-400'
            }`} />
            <h4 className="font-semibold mb-1">Batch Upload</h4>
            <p className="text-xs text-gray-400">Upload multiple files simultaneously</p>
          </button>
          
          <button
            onClick={() => setUploadType('series')}
            className={`group p-6 rounded-xl border-2 transition-all duration-300 ${
              uploadType === 'series' 
                ? 'border-purple-600 bg-purple-600/10 shadow-lg shadow-purple-500/20' 
                : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
            }`}
          >
            <Layers className={`w-10 h-10 mb-3 mx-auto transition-transform group-hover:scale-110 ${
              uploadType === 'series' ? 'text-purple-400' : 'text-gray-400'
            }`} />
            <h4 className="font-semibold mb-1">Series Upload</h4>
            <p className="text-xs text-gray-400">Organize content into seasons & episodes</p>
          </button>
        </div>
      </div>

      {/* Upload Presets */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Quick Presets</h3>
          <button className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            Create Preset
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {uploadPresets.map((preset) => (
            <div 
              key={preset.id} 
              onClick={() => setActivePreset(preset.id)}
              className={`group p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                activePreset === preset.id
                  ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500'
                  : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{preset.icon}</span>
                {activePreset === preset.id && (
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                )}
              </div>
              <h4 className="font-semibold mb-2">{preset.name}</h4>
              <div className="space-y-1 text-xs text-gray-400">
                <p className="flex items-center">
                  <span className="w-20">Category:</span>
                  <span className="text-gray-300">{preset.settings.category}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-20">Visibility:</span>
                  <span className="text-gray-300 capitalize">{preset.settings.visibility}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-20">Features:</span>
                  <span className="text-gray-300">
                    {Object.entries(preset.settings)
                      .filter(([key, value]) => value === true)
                      .length} enabled
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-gray-800 shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Upload New Content
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">Complete all steps for optimal content delivery</p>
                </div>
                <button 
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadStep(1);
                  }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Upload Steps Progress */}
              <div className="flex items-center justify-between mb-8 px-4">
                {[
                  { num: 1, label: 'Select Files', icon: <Upload className="w-4 h-4" /> },
                  { num: 2, label: 'Configure', icon: <Settings className="w-4 h-4" /> },
                  { num: 3, label: 'Regions', icon: <Globe className="w-4 h-4" /> },
                  { num: 4, label: 'Review', icon: <CheckCircle className="w-4 h-4" /> }
                ].map((step, index) => (
                  <div key={step.num} className="flex items-center">
                    <div className={`relative ${uploadStep >= step.num ? 'text-white' : 'text-gray-400'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        uploadStep >= step.num 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30' 
                          : 'bg-gray-800'
                      }`}>
                        {uploadStep > step.num ? <CheckCircle className="w-6 h-6" /> : step.icon}
                      </div>
                      <p className={`text-xs mt-2 absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                        uploadStep >= step.num ? 'text-purple-400' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                    {index < 3 && (
                      <div className={`w-24 h-0.5 mx-2 transition-all duration-500 ${
                        uploadStep > step.num 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                          : 'bg-gray-800'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: File Selection */}
              {uploadStep === 1 && (
                <div className="mt-12">
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
                      isDragging 
                        ? 'border-purple-500 bg-purple-500/10 scale-[1.02]' 
                        : 'border-gray-700 hover:border-purple-600 hover:bg-purple-900/5'
                    }`}
                  >
                    <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                      <CloudUpload className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                    </div>
                    <p className="text-xl font-medium mb-2">Drop files here or click to browse</p>
                    <p className="text-sm text-gray-400 mb-6">Support for MP4, WebM, MOV, JPG, PNG, SRT, and VTT files</p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                      accept="video/*,image/*,.srt,.vtt"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-purple-500/25"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Select Files
                    </label>
                    <p className="text-xs text-gray-500 mt-4">Maximum file size: 5GB per file</p>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Selected Files ({selectedFiles.length})</h3>
                        <button 
                          onClick={() => setSelectedFiles([])}
                          className="text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="space-y-3">
                        {selectedFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                            <div className="flex items-center space-x-4">
                              <div className={`p-3 rounded-lg ${
                                file.type === 'video' ? 'bg-purple-900/30 text-purple-400' : 
                                file.type === 'image' ? 'bg-blue-900/30 text-blue-400' :
                                'bg-green-900/30 text-green-400'
                              }`}>
                                {file.type === 'video' ? <Film className="w-5 h-5" /> : 
                                 file.type === 'image' ? <Image className="w-5 h-5" /> :
                                 <FileText className="w-5 h-5" />}
                              </div>
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-gray-400">{formatBytes(file.size)}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedFiles(prev => prev.filter(f => f.id !== file.id))}
                              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-between">
                        <div className="text-sm text-gray-400">
                          Total size: {formatBytes(selectedFiles.reduce((acc, file) => acc + file.size, 0))}
                        </div>
                        <button
                          onClick={() => setUploadStep(2)}
                          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                        >
                          Next: Configure Settings
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Configuration */}
              {uploadStep === 2 && (
                <div className="mt-12 space-y-6">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-purple-400" />
                      Visibility & Access
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Visibility</label>
                        <div className="space-y-2">
                          {['public', 'premium', 'private'].map((visibility) => (
                            <label key={visibility} className="flex items-center p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                              <input
                                type="radio"
                                name="visibility"
                                value={visibility}
                                checked={uploadMetadata.visibility === visibility}
                                onChange={(e) => setUploadMetadata({...uploadMetadata, visibility: e.target.value})}
                                className="w-4 h-4 text-purple-600"
                              />
                              <span className="ml-3 capitalize">{visibility}</span>
                              {visibility === 'public' && <Globe className="w-4 h-4 ml-auto text-gray-400" />}
                              {visibility === 'premium' && <Lock className="w-4 h-4 ml-auto text-yellow-400" />}
                              {visibility === 'private' && <EyeOff className="w-4 h-4 ml-auto text-gray-400" />}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Age Rating</label>
                        <select 
                          value={uploadMetadata.ageRating}
                          onChange={(e) => setUploadMetadata({...uploadMetadata, ageRating: e.target.value})}
                          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        >
                          <option value="G">G - General Audiences</option>
                          <option value="PG">PG - Parental Guidance</option>
                          <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
                          <option value="R">R - Restricted</option>
                          <option value="NC-17">NC-17 - Adults Only</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Cpu className="w-5 h-5 mr-2 text-purple-400" />
                      Processing Options
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(processingFeatures).map(([feature, enabled]) => (
                        <label key={feature} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                          <span className="text-sm">
                            {feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={enabled}
                              onChange={(e) => setProcessingFeatures({...processingFeatures, [feature]: e.target.checked})}
                              className="sr-only"
                            />
                            <div className={`w-10 h-6 rounded-full transition-colors ${enabled ? 'bg-purple-600' : 'bg-gray-700'}`}>
                              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : 'translate-x-1'} transform mt-1`}></div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setUploadStep(1)}
                      className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setUploadStep(3)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                    >
                      Next: Regional Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Regional Licensing */}
              {uploadStep === 3 && (
                <div className="mt-12 space-y-6">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-purple-400" />
                        Regional Availability
                      </h3>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={regionalSettings.globalRights}
                          onChange={(e) => setRegionalSettings({...regionalSettings, globalRights: e.target.checked})}
                          className="w-4 h-4 text-purple-600 mr-2"
                        />
                        <span className="text-sm">Enable Global Rights</span>
                      </label>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(regionalSettings.regions).map(([region, settings]) => (
                        <div key={region} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${settings.enabled ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                              {region}
                            </h4>
                            <label className="relative">
                              <input
                                type="checkbox"
                                checked={settings.enabled}
                                onChange={() => toggleRegion(region)}
                                className="sr-only"
                              />
                              <div className={`w-10 h-6 rounded-full transition-colors ${settings.enabled ? 'bg-purple-600' : 'bg-gray-700'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.enabled ? 'translate-x-5' : 'translate-x-1'} transform mt-1`}></div>
                              </div>
                            </label>
                          </div>

                          {settings.enabled && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                              <div>
                                <label className="text-xs text-gray-400">Release Date</label>
                                <input
                                  type="date"
                                  value={settings.releaseDate}
                                  onChange={(e) => setRegionalSettings({
                                    ...regionalSettings,
                                    regions: {
                                      ...regionalSettings.regions,
                                      [region]: {...settings, releaseDate: e.target.value}
                                    }
                                  })}
                                  className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:border-purple-500"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-400">Expiry Date</label>
                                <input
                                  type="date"
                                  value={settings.expiryDate}
                                  onChange={(e) => setRegionalSettings({
                                    ...regionalSettings,
                                    regions: {
                                      ...regionalSettings.regions,
                                      [region]: {...settings, expiryDate: e.target.value}
                                    }
                                  })}
                                  className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:border-purple-500"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-400">Pricing</label>
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-gray-500">{settings.pricing.currency}</span>
                                  <input
                                    type="number"
                                    value={settings.pricing.amount}
                                    onChange={(e) => setRegionalSettings({
                                      ...regionalSettings,
                                      regions: {
                                        ...regionalSettings.regions,
                                        [region]: {
                                          ...settings,
                                          pricing: {...settings.pricing, amount: parseFloat(e.target.value)}
                                        }
                                      }
                                    })}
                                    className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:border-purple-500"
                                    step="0.01"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setUploadStep(2)}
                      className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setUploadStep(4)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                    >
                      Next: Review & Upload
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Upload */}
              {uploadStep === 4 && (
                <div className="mt-12 space-y-6">
                  <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-800">
                    <h3 className="font-semibold mb-4 text-purple-400">Upload Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Files</p>
                        <p className="text-lg font-medium">{selectedFiles.length} files selected</p>
                        <p className="text-sm text-gray-500">{formatBytes(selectedFiles.reduce((acc, file) => acc + file.size, 0))} total</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Visibility</p>
                        <p className="text-lg font-medium capitalize">{uploadMetadata.visibility}</p>
                        <p className="text-sm text-gray-500">Age rating: {uploadMetadata.ageRating}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Processing</p>
                        <p className="text-lg font-medium">{Object.values(processingFeatures).filter(v => v).length} features enabled</p>
                        <p className="text-sm text-gray-500">Premium processing active</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Regions</p>
                        <p className="text-lg font-medium">{Object.values(regionalSettings.regions).filter(r => r.enabled).length} regions enabled</p>
                        <p className="text-sm text-gray-500">{regionalSettings.globalRights ? 'Global rights enabled' : 'Regional restrictions apply'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h4 className="font-medium mb-4">Files Ready for Upload</h4>
                    <div className="space-y-3">
                      {selectedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded ${
                              file.type === 'video' ? 'bg-purple-900/30 text-purple-400' : 
                              file.type === 'image' ? 'bg-blue-900/30 text-blue-400' :
                              'bg-green-900/30 text-green-400'
                            }`}>
                              {file.type === 'video' ? <Film className="w-4 h-4" /> : 
                               file.type === 'image' ? <Image className="w-4 h-4" /> :
                               <FileText className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setUploadStep(3)}
                      className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        setShowUploadModal(false);
                        setUploadStep(1);
                        startBatchUpload();
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-semibold"
                    >
                      Start Upload
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Active Upload Queue */}
      {selectedFiles.length > 0 && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Upload Queue</h3>
            {selectedFiles.some(f => f.status === 'pending') && (
              <button
                onClick={startBatchUpload}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Upload All
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {selectedFiles.map((file) => (
              <div key={file.id} className={`rounded-xl p-6 transition-all duration-300 ${
                file.status === 'completed' 
                  ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800' 
                  : 'bg-gray-800/50 border border-gray-700'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      file.type === 'video' ? 'bg-purple-900/30 text-purple-400' : 
                      file.type === 'image' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {file.type === 'video' ? <Film className="w-6 h-6" /> : 
                       file.type === 'image' ? <Image className="w-6 h-6" /> :
                       <FileText className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-lg">{file.metadata.title || file.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <span>{formatBytes(file.size)}</span>
                        {file.processing.resolution !== 'detecting...' && (
                          <>
                            <span>•</span>
                            <span>{file.processing.resolution}</span>
                            <span>•</span>
                            <span>{file.processing.duration}</span>
                          </>
                        )}
                      </div>
                      
                      {/* Quick metadata edit for pending files */}
                      {file.status === 'pending' && (
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Title"
                            value={file.metadata.title}
                            onChange={(e) => {
                              setSelectedFiles(prev => prev.map(f => 
                                f.id === file.id 
                                  ? {...f, metadata: {...f.metadata, title: e.target.value}} 
                                  : f
                              ));
                            }}
                            className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                          />
                          <select 
                            value={file.metadata.category}
                            onChange={(e) => {
                              setSelectedFiles(prev => prev.map(f => 
                                f.id === file.id 
                                  ? {...f, metadata: {...f.metadata, category: e.target.value}} 
                                  : f
                              ));
                            }}
                            className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                          >
                            <option value="">Select Category</option>
                            <option value="anime">Anime</option>
                            <option value="manga">Manga</option>
                            <option value="flick">Flick</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {file.status === 'pending' && (
                      <button
                        onClick={() => startUpload(file.id)}
                        className="px-4 py-2 bg-purple-600 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                      >
                        Upload
                      </button>
                    )}
                    {file.status === 'uploading' && (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-500 border-t-transparent"></div>
                        <span className="text-sm text-purple-400">Uploading...</span>
                      </div>
                    )}
                    {file.status === 'processing' && (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                        <span className="text-sm text-yellow-400">Processing...</span>
                      </div>
                    )}
                    {file.status === 'completed' && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-green-400">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                {(file.status === 'uploading' || file.status === 'processing') && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">
                        {file.status === 'uploading' ? 'Upload Progress' : 'Processing'}
                      </span>
                      <span className="text-gray-400">{Math.round(uploadProgress[file.id] || 0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 relative"
                        style={{ width: `${uploadProgress[file.id] || 0}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                      </div>
                    </div>
                    {file.status === 'processing' && (
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center space-x-1 text-gray-400">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span>Transcoding</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                          <span>Thumbnails</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span>AI Enhancement</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Completion Actions */}
                {file.status === 'completed' && (
                  <div className="mt-4 p-4 bg-green-900/20 border border-green-800 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-400">Upload Complete!</p>
                        <p className="text-xs text-gray-400 mt-1">All processing finished successfully</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors font-medium">
                          Publish Now
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
                          Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Processing Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-800 transition-colors">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2 text-purple-400" />
            Data Processing & Security
          </h3>
          <div className="space-y-3">
            {[
              { title: 'End-to-End Encryption', desc: 'All uploads encrypted during transfer and storage', icon: <Lock className="w-5 h-5 text-green-500" /> },
              { title: 'Multi-Region Backup', desc: 'Content backed up across 5 geographic regions', icon: <Globe className="w-5 h-5 text-blue-500" /> },
              { title: 'DRM Protection', desc: 'Advanced DRM with regional licensing controls', icon: <Shield className="w-5 h-5 text-purple-500" /> },
              { title: 'AI Processing', desc: 'Smart quality enhancement and optimization', icon: <Sparkles className="w-5 h-5 text-yellow-500" /> }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                {item.icon}
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-pink-800 transition-colors">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
            Upload Best Practices
          </h3>
          <ul className="space-y-3">
            {[
              { title: 'Master Quality Files', desc: 'Upload highest quality for best multi-resolution encoding' },
              { title: 'Pre-configured Subtitles', desc: 'Include SRT/VTT files for automatic sync' },
              { title: 'Chapter Markers', desc: 'Add timestamps for better viewer navigation' },
              { title: 'Regional Metadata', desc: 'Set region-specific titles and descriptions' }
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="w-4 h-4 mr-2 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default UploadCenter;