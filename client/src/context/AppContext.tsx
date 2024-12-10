import { createContext, useContext, useState, ReactNode } from 'react';
import { Stream } from '@/lib/mock-data';

interface AppContextType {
  currentStream: Stream | null;
  setCurrentStream: (stream: Stream | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentStream, setCurrentStream] = useState<Stream | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentStream,
        setCurrentStream,
        isLoggedIn,
        setIsLoggedIn
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
