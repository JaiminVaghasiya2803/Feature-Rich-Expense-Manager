import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AppType = 'expense-manager' | 'split-expenses';

interface AppContextType {
  currentApp: AppType;
  setCurrentApp: (app: AppType) => void;
  isBottomSheetVisible: boolean;
  setBottomSheetVisible: (visible: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentApp, setCurrentApp] = useState<AppType>('expense-manager');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentApp,
        setCurrentApp,
        isBottomSheetVisible,
        setBottomSheetVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};