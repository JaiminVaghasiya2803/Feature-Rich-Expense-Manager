import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  isOffline: boolean;
  pendingActions: number;
};

const OfflineBanner: React.FC<Props> = ({ isOffline, pendingActions }) => {
  if (!isOffline) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Offline Mode • {pendingActions} pending sync actions
      </Text>
    </View>
  );
};

export default OfflineBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffcc00',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
