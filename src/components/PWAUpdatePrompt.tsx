import React, { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wifi, WifiOff, Download, X } from 'lucide-react';

interface PWAUpdatePromptProps {
  onClose?: () => void;
}

/**
 * PWAUpdatePrompt handles service worker registration, updates, and offline notifications
 * Provides user-friendly prompts for app updates and offline capabilities
 */
export const PWAUpdatePrompt: React.FC<PWAUpdatePromptProps> = ({ onClose }) => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateServiceWorker, setUpdateServiceWorker] = useState<((reloadPage?: boolean) => Promise<void>) | null>(null);

  useEffect(() => {
    // Register service worker and handle updates
    const updateSW = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        setOfflineReady(true);
        // Auto-hide offline ready message after 5 seconds
        setTimeout(() => setOfflineReady(false), 5000);
      },
      onRegisteredSW(swUrl, registration) {
        console.log('[PWA] Service Worker registered:', swUrl);
        
        // Set up periodic update checks (every hour)
        if (registration) {
          setInterval(async () => {
            if (!navigator.onLine) return;
            
            try {
              const response = await fetch(swUrl, {
                cache: 'no-store',
                headers: {
                  'cache': 'no-store',
                  'cache-control': 'no-cache',
                },
              });
              
              if (response?.status === 200) {
                await registration.update();
              }
            } catch (error) {
              console.warn('[PWA] Update check failed:', error);
            }
          }, 60 * 60 * 1000); // 1 hour
        }
      },
      onRegisterError(error) {
        console.error('[PWA] Service Worker registration failed:', error);
      },
    });

    setUpdateServiceWorker(() => updateSW);

    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Set initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUpdateClick = async () => {
    if (updateServiceWorker) {
      await updateServiceWorker(true);
      setNeedRefresh(false);
    }
  };

  const handleClose = () => {
    setNeedRefresh(false);
    setOfflineReady(false);
    onClose?.();
  };

  // Show update prompt
  if (needRefresh) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm">
        <Alert className="bg-blue-50 border-blue-200">
          <Download className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <div className="pr-2">
              <div className="font-medium text-blue-900">App Update Available</div>
              <div className="text-sm text-blue-700">
                New content is available. Click reload to update.
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleUpdateClick}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Reload
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleClose}
                className="text-blue-600 hover:text-blue-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Show offline ready prompt
  if (offlineReady) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm">
        <Alert className="bg-green-50 border-green-200">
          <Wifi className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <div className="pr-2">
              <div className="font-medium text-green-900">App Ready Offline</div>
              <div className="text-sm text-green-700">
                Your app is now ready to work offline!
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClose}
              className="text-green-600 hover:text-green-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Show offline indicator
  if (!isOnline) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm">
        <Alert className="bg-yellow-50 border-yellow-200">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium text-yellow-900">Working Offline</div>
            <div className="text-sm text-yellow-700">
              You're currently offline. Some features may be limited.
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return null;
};

export default PWAUpdatePrompt; 