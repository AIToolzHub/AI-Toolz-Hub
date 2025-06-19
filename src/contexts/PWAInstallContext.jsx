import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast.js';
import { Button } from '@/components/ui/button.jsx';
import { Download } from 'lucide-react';

const PWAInstallContext = createContext();

export const usePWAInstall = () => useContext(PWAInstallContext);

export const PWAInstallProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
      
      if (!localStorage.getItem('pwaInstallDismissed')) {
         toast({
          title: 'Install AI Toolz Hub? 🚀',
          description: 'Get quick access to your favorite AI tools by installing the app on your device.',
          duration: 10000, 
          action: (
            <Button
              variant="default"
              size="sm"
              onClick={handleInstallClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" /> Install
            </Button>
          ),
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
      toast({ title: 'Installation Successful! 🎉', description: 'AI Toolz Hub is now installed.' });
    } else {
      console.log('User dismissed the A2HS prompt');
      localStorage.setItem('pwaInstallDismissed', 'true');
      toast({ title: 'Installation Dismissed', description: 'You can install later from browser menu.' });
    }
    setDeferredPrompt(null);
    setCanInstall(false);
  };

  return (
    <PWAInstallContext.Provider value={{ canInstall, handleInstallClick }}>
      {children}
    </PWAInstallContext.Provider>
  );
};