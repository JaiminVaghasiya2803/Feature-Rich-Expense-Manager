import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, X, Users } from 'lucide-react-native';
import { Person,   CURRENCIES } from '../../types/billSplit';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useCustomTheme } from '../../contexts/CustomThemeContext';
import { useAddGroup } from '../../hooks/useAddGroup';
import { getStyles } from './styles';
import { apiClient } from '../../api/client';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: any;
}

const CreateGroupScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const styles = useStyles({ theme, customTheme: customTheme || undefined });
  const addGroupMutation = useAddGroup();
  
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [members, setMembers] = useState<Person[]>([
    { id: '1', name: 'You', color: '#6366F1' }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  const addMember = () => {
    if (!newMemberName.trim()) {
      Alert.alert('Error', 'Please enter a member name');
      return;
    }

    const newMember: Person = {
      id: Date.now().toString(),
      name: newMemberName.trim(),
      color: colors[members.length % colors.length],
    };

    setMembers([...members, newMember]);
    setNewMemberName('');
  };

  const removeMember = (memberId: string) => {
    if (members.length <= 1) {
      Alert.alert('Error', 'Group must have at least one member');
      return;
    }
    setMembers(members.filter(m => m.id !== memberId));
  };

  const createGroup = async () => {
    console.log('🔄 Starting group creation...');
    
    if (!groupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    if (members.length < 2) {
      Alert.alert('Error', 'Group must have at least 2 members');
      return;
    }

    try {
      // Test API connectivity first
      console.log('🔍 Testing API connectivity...');
      try {
        const testResponse = await fetch(`${apiClient.defaults.baseURL}/health`, {
          method: 'GET',
          timeout: 5000,
        });
        console.log('🏥 Health check response:', testResponse.status);
      } catch (healthError) {
        console.warn('⚠️ Health check failed (server might not have /health endpoint):', healthError);
      }

      // Convert BillGroup format to ExpenseGroup format for the API
      const tempId = Date.now();
      const groupData = {
        id: tempId,
        name: groupName.trim(),
        description: description.trim(),
        color: selectedColor,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('📤 Sending group data:', groupData);
      
      const result = await addGroupMutation.mutateAsync(groupData);
      console.log('✅ Group created successfully:', result);
      
      Alert.alert('Success', 'Group created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('❌ Error creating group:', error);
      
      // More detailed error logging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      // Check if it's a network error
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('API Response error:', error.response);
      }
      
      // Check if it's a network connectivity issue
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
          Alert.alert('Network Error', 'Cannot connect to server. Please check your internet connection and try again.');
          return;
        }
      }
      
      Alert.alert('Error', `Failed to create group: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const MemberItem = ({ member, canRemove }: { member: Person; canRemove: boolean }) => (
    <View style={styles.memberItem}>
      <View style={[styles.memberAvatar, { backgroundColor: member.color }]}>
        <Text style={styles.memberInitial}>{member.name.charAt(0).toUpperCase()}</Text>
      </View>
      <Text style={styles.memberName}>{member.name}</Text>
      {canRemove && (
        <TouchableOpacity onPress={() => removeMember(member.id)}>
          <X size={20} color={themeColors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );

  const ColorPicker = () => (
    <View>
      <Text style={styles.sectionTitle}>Group Color</Text>
      <View style={styles.colorGrid}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColor
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
    </View>
  );

  const CurrencySelector = () => (
    <View>
      <Text style={styles.sectionTitle}>Currency</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.currencyList}>
          {CURRENCIES.map((curr) => (
            <TouchableOpacity
              key={curr.code}
              style={[
                styles.currencyOption,
                currency === curr.code && styles.selectedCurrency
              ]}
              onPress={() => setCurrency(curr.code)}
            >
              <Text style={[
                styles.currencySymbol,
                currency === curr.code && styles.selectedCurrencyText
              ]}>
                {curr.symbol}
              </Text>
              <Text style={[
                styles.currencyCode,
                currency === curr.code && styles.selectedCurrencyText
              ]}>
                {curr.code}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Group</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.groupInfoCard}>
          <Input
            label="Group Name"
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Enter group name"
            style={styles.input}
          />
          
          <Input
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="What's this group for?"
            style={styles.input}
            multiline
          />
        </Card>

        <Card style={styles.colorCard}>
          <ColorPicker />
        </Card>

        <Card style={styles.currencyCard}>
          <CurrencySelector />
        </Card>

        <Card style={styles.membersCard}>
          <Text style={styles.sectionTitle}>Members ({members.length})</Text>
          
          <View style={styles.membersList}>
            {members.map((member, index) => (
              <MemberItem 
                key={member.id} 
                member={member} 
                canRemove={index > 0} // Can't remove the first member (You)
              />
            ))}
          </View>

          <View style={styles.addMemberSection}>
            <View style={styles.addMemberInput}>
              <TextInput
                style={styles.memberInput}
                value={newMemberName}
                onChangeText={setNewMemberName}
                placeholder="Enter member name"
                placeholderTextColor={themeColors.textTertiary}
                onSubmitEditing={addMember}
              />
              <TouchableOpacity onPress={addMember} style={styles.addButton}>
                <Plus size={20} color={themeColors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        <Card style={styles.previewCard}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.groupPreview}>
            <View style={[styles.groupColorIndicator, { backgroundColor: selectedColor }]} />
            <View style={styles.groupPreviewInfo}>
              <Text style={styles.previewName}>{groupName || 'Group Name'}</Text>
              <Text style={styles.previewDescription}>
                {description || 'No description'}
              </Text>
              <View style={styles.previewStats}>
                <Users size={16} color={themeColors.textSecondary} />
                <Text style={styles.previewMembers}>
                  {members.length} members • {currency}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Create Group"
          onPress={createGroup}
          disabled={!groupName.trim() || members.length < 2}
          loading={addGroupMutation.isPending}
          style={styles.createButton}
        />
      </View>
    </View>
  );
};

export default CreateGroupScreen;