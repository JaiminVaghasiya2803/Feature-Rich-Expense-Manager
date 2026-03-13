import React from 'react';
import { View } from 'react-native';
import { useFullScreenBackground } from '../hooks/useFullScreenBackground';

interface ScreenBackgroundProps {
  children: React.ReactNode;
  statusBarColor?: string;
  bottomColor?: string;
  backgroundColor?: string;
  updateStatusBar?: boolean;
}

const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  children,
  statusBarColor,
  bottomColor,
  backgroundColor,
  updateStatusBar = false, // Don't update status bar by default for individual screens
}) => {
  const {
    containerStyle,
    statusBarOverlayStyle,
    bottomOverlayStyle,
  } = useFullScreenBackground({
    statusBarColor,
    bottomColor,
    backgroundColor,
    updateStatusBar,
  });

  return (
    <View style={containerStyle}>
      {/* Status bar overlay for iOS */}
      {statusBarOverlayStyle && <View style={statusBarOverlayStyle} />}
      
      {/* Main content */}
      {children}
      
      {/* Bottom overlay for iOS */}
      {bottomOverlayStyle && <View style={bottomOverlayStyle} />}
    </View>
  );
};

export default ScreenBackground;