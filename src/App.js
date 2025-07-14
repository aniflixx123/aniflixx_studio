import React from 'react';
import DashboardOverview from './DashboardOverview';
import AniFlixxStudioDashboard from './StudioPage';

// Add realistic sample data for the dashboard
const dashboardData = {
  totalViews: 1023000,
  viewsGrowth: 6.5,             // % change vs last period
  totalRevenue: 42375.85,
  revenueGrowth: 8.2,           // % change vs last period
  followers: 27580,
  followersGrowth: 2.6,         // % change vs last period
  engagementRate: 9.8,
  completionRate: 82,
  shareRate: 17,
  returnViewerRate: 48,
  premiumViewers: 5,
  adBlockRate: 9,
  avgSessionDuration: '9m 20s',
};

const formatNumber = (num) =>
  typeof num === 'number'
    ? num.toLocaleString()
    : num;

const formatCurrency = (num) =>
  typeof num === 'number'
    ? `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : num;

function App() {
  return (
    <AniFlixxStudioDashboard/>
  );
}

export default App;
