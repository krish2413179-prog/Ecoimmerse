import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

// Using absolute paths which are enabled by your project's configuration
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from 'pages/NotFound';
import Header from 'components/ui/Header'; 

// Page imports
import PersonalImpactDashboard from 'pages/personal-impact-dashboard';
import ImmersiveHomepage from 'pages/immersive-homepage';
import ForestDashboardPage from 'pages/community-forest-dashboard/index.jsx';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<ImmersiveHomepage />} />
          <Route path="/personal-impact-dashboard" element={<PersonalImpactDashboard />} />
          <Route path="/forest-dashboard" element={<ForestDashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;