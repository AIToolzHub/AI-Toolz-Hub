
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout.jsx';
import HomePage from '@/pages/HomePage.jsx';
// import FavoritesPage from '@/pages/FavoritesPage.jsx'; // Eager load
import { NotFoundPage } from '@/pages/NotFoundPage.jsx';
import { ToolsProvider } from '@/contexts/ToolsContext.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import { Loader2 } from 'lucide-react';

const FavoritesPage = React.lazy(() => import('@/pages/FavoritesPage.jsx'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-[calc(100vh-200px)]">
    <Loader2 className="h-16 w-16 text-primary animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToolsProvider>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </ToolsProvider>
    </Router>
  );
}

export default App;
