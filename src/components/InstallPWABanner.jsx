import React from 'react';
import { usePWAInstall } from '@/contexts/PWAInstallContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPWABanner = () => {
  const { canInstall, handleInstallClick } = usePWAInstall();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (canInstall && !localStorage.getItem('pwaInstallDismissedManually')) {
      const timer = setTimeout(() => setIsVisible(true), 3000); // Show banner after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [canInstall]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwaInstallDismissedManually', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 p-4 bg-gradient-to-tr from-primary to-purple-600 text-primary-foreground rounded-xl shadow-2xl border border-purple-400/50"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/20"
            aria-label="Dismiss install banner"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Download className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Install AI Toolz Hub</h3>
              <p className="text-sm opacity-90">
                Get a faster, app-like experience. Install to your home screen!
              </p>
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => { handleInstallClick(); setIsVisible(false); }}
            className="w-full mt-4 bg-white text-primary hover:bg-gray-100 font-semibold shadow-md"
          >
            <Download className="mr-2 h-5 w-5" /> Install App
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPWABanner;