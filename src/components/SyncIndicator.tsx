import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SyncIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
      <Text style={styles.text}>Syncing...</Text>
    </View>
  );
};

export default SyncIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  text: {
    marginLeft: 5,
    fontSize: 12,
    color: '#555',
  },
});
