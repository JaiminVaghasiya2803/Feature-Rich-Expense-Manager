import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface InrIconProps {
  size?: number;
  color?: string;
}

const InrIcon: React.FC<InrIconProps> = ({ size = 20, color = '#000' }) => {
  return (
    <Text style={[styles.inrSymbol, { fontSize: size, color }]}>
      ₹
    </Text>
  );
};

const styles = StyleSheet.create({
  inrSymbol: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default InrIcon;