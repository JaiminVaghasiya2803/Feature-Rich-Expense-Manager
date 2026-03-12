import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Plus, Users, Edit3, Trash2 } from 'lucide-react-native';

import { useGroups } from '../hooks/useGroups';
import { useDeleteGroup } from '../hooks/useDeleteGroup';
import { ExpenseGroup } from '../types/expense';
import { theme } from '../constants/theme';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';

const GroupsScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets();
  const { data, fetchNextPage, hasNextPage, refetch, isFetching } = useGroups();
  const deleteMutation = useDeleteGroup();

  const groups: ExpenseGroup[] = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data]);

  const handleDelete = (group: ExpenseGroup) => {
    deleteMutation.mutate(group.id);
  };

  const renderGroupItem = ({ item: group }: { item: ExpenseGroup }) => (
    <Card style={styles.groupCard} padding="lg">
      <View style={styles.groupHeader}>
        <View style={styles.groupInfo}>
          <View style={styles.groupTitleRow}>
            <View style={[styles.colorIndicator, { backgroundColor: group.color }]} />
            <Text style={styles.groupName}>{group.name}</Text>
          </View>
          {group.description && (
            <Text style={styles.groupDescription}>{group.description}</Text>
          )}
        </View>
        
        <View style={styles.groupActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('EditGroup', { group })}
            activeOpacity={0.7}
          >
            <Edit3 size={16} color={theme.colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(group)}
            activeOpacity={0.7}
          >
            <Trash2 size={16} color={theme.colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Users size={48} color={theme.colors.text.tertiary} />
      <Text style={styles.emptyTitle}>No groups yet</Text>
      <Text style={styles.emptySubtitle}>
        Create groups to organize your expenses by project, trip, or category
      </Text>
      <Button
        title="Create Your First Group"
        onPress={() => navigation.navigate('AddGroup')}
        style={styles.emptyButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <Header
        title="Expense Groups"
        subtitle="Organize your expenses"
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {groups.length === 0 && !isFetching ? (
          <EmptyState />
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={groups}
              keyExtractor={item => item.id.toString()}
              renderItem={renderGroupItem}
              onEndReached={() => {
                if (hasNextPage) fetchNextPage();
              }}
              onEndReachedThreshold={0.5}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { bottom: Math.max(24, insets.bottom + 16) }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddGroup')}
      >
        <Plus color={theme.colors.text.inverse} size={28} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

export default GroupsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  groupCard: {
    marginBottom: theme.spacing.md,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  groupInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
  },
  groupName: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  groupDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  groupActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl,
    minHeight: 400,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  emptyButton: {
    minWidth: 200,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
});