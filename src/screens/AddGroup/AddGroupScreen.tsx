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
import { Plus, X, Users } from 'lucide-react-native';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useAddGroup } from '../../hooks/useAddGroup';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: any;
}

interface GroupMember {
  id: string;
  name: string;
  email?: string;
}

const AddGroupScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });
  
  const addGroupMutation = useAddGroup();
  
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6366F1');

  const colors = [
    '#6366F1', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6B7280'
  ];

  const addMember = () => {
    if (!newMemberName.trim()) {
      Alert.alert('Error', 'Please enter a member name');
      return;
    }

    const newMember: GroupMember = {
      id: Date.now().toString(),
      name: newMemberName.trim(),
    };

    setMembers([...members, newMember]);
    setNewMemberName('');
  };

  const removeMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  const createGroup = async () => {
    console.log('🔄 Starting group creation from AddGroupScreen...');
    
    if (!groupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    try {
      const tempId = Date.now(); 
      
      const groupData = {
        id: tempId,
        name: groupName.trim(),
        description: description.trim(),
        color: selectedColor,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('📤 Sending group data from AddGroupScreen:', groupData);
      
      const result = await addGroupMutation.mutateAsync(groupData);
      console.log('✅ Group created successfully from AddGroupScreen:', result);
      
      Alert.alert('Success', 'Group created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('❌ Error in AddGroupScreen createGroup:', error);
      
      let errorMessage = 'Failed to create group. Please try again.';
      
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        
        // Check for specific error types
        if (error.message.includes('iterator')) {
          errorMessage = 'There was a data processing error. Please try again.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      Alert.alert('Error', errorMessage);
    }
  };

  const MemberItem = ({ member }: { member: GroupMember }) => (
    <View style={styles.memberItem}>
      <View style={[styles.memberAvatar, { backgroundColor: selectedColor }]}>
        <Text style={styles.memberInitial}>{member.name.charAt(0).toUpperCase()}</Text>
      </View>
      <Text style={styles.memberName}>{member.name}</Text>
      <TouchableOpacity onPress={() => removeMember(member.id)}>
        <X size={20} color={themeColors.textSecondary} />
      </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <Header
        title="Create Expense Group"
        subtitle="Organize your shared expenses"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.groupInfoCard}>
          <Input
            label="Group Name"
            value={groupName}
            onChangeText={setGroupName}
            placeholder="e.g., Roommates, Office Team, Family"
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

        <Card style={styles.membersCard}>
          <Text style={styles.sectionTitle}>Members ({members.length})</Text>
          <Text style={styles.sectionSubtitle}>
            Add people who will share expenses in this group
          </Text>
          
          {members.length > 0 && (
            <View style={styles.membersList}>
              {members.map((member) => (
                <MemberItem key={member.id} member={member} />
              ))}
            </View>
          )}

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
                  {members.length} members
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
          disabled={!groupName.trim()}
          loading={addGroupMutation.isPending}
          style={styles.createButton}
        />
      </View>
    </View>
  );
};

export default AddGroupScreen;