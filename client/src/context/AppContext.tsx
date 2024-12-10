import { createContext, useContext, useState, ReactNode } from 'react';
import { Stream } from '@/lib/mock-data';

interface AppContextType {
  currentStream: Stream | null;
  setCurrentStream: (stream: Stream | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  followedStreams: Set<string>;
  subscribedStreams: Set<string>;
  toggleFollow: (streamId: string) => void;
  toggleSubscribe: (streamId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentStream, setCurrentStream] = useState<Stream | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [followedStreams, setFollowedStreams] = useState<Set<string>>(new Set());
  const [subscribedStreams, setSubscribedStreams] = useState<Set<string>>(new Set());

  const toggleFollow = (streamId: string) => {
    setFollowedStreams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(streamId)) {
        newSet.delete(streamId);
      } else {
        newSet.add(streamId);
      }
      return newSet;
    });
  };

  const toggleSubscribe = (streamId: string) => {
    try {
      if (!isLoggedIn) return;
      setSubscribedStreams(prev => {
        const newSet = new Set(prev);
        if (newSet.has(streamId)) {
          newSet.delete(streamId);
        } else {
          newSet.add(streamId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error toggling subscribe:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentStream,
        setCurrentStream,
        isLoggedIn,
        setIsLoggedIn,
        followedStreams,
        subscribedStreams,
        toggleFollow,
        toggleSubscribe
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
