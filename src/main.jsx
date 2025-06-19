import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';
import '@/index.css';
import { ThemeProvider } from '@/contexts/ThemeContext.jsx';
import { Toaster } from "@/components/ui/toaster.jsx";
import { PWAInstallProvider } from '@/contexts/PWAInstallContext.jsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <PWAInstallProvider>
        <App />
        <Toaster />
      </PWAInstallProvider>
    </ThemeProvider>
  </React.StrictMode>
);