# Bill Splitting App

A comprehensive bill splitting application inspired by Splid, built with React Native. This app allows users to split expenses among groups of people with flexible splitting options including equal splits, percentage-based splits, and custom amount splits.

## Features

### 🏠 Home Screen
- **Group Overview**: View all your expense groups in one place
- **Quick Stats**: See total active groups and your current balance
- **Easy Navigation**: Quick access to create new groups or view existing ones
- **Clean Interface**: Inspired by Splid's clean and intuitive design

### 👥 Group Management
- **Create Groups**: Set up expense groups with custom names, descriptions, and colors
- **Member Management**: Add/remove members with personalized avatars
- **Currency Support**: Choose from 10+ popular currencies (USD, EUR, GBP, etc.)
- **Group Customization**: Assign colors and organize groups visually

### 💰 Expense Tracking
- **Add Expenses**: Record expenses with titles, amounts, and descriptions
- **Flexible Payer Selection**: Choose who paid for each expense
- **Receipt Management**: Optional receipt attachment and categorization
- **Date Tracking**: Automatic date recording with manual override options

### 🔄 Advanced Splitting Options

#### Equal Split
- **Automatic Calculation**: Divides expenses equally among selected members
- **Real-time Updates**: Instantly shows each person's share
- **Member Selection**: Choose which members to include in the split

#### Percentage Split
- **Custom Percentages**: Set individual percentage shares for each member
- **Validation**: Ensures percentages total 100%
- **Auto-normalize**: Option to automatically adjust percentages to 100%
- **Visual Feedback**: Clear indication of percentage distribution

#### Amount Split
- **Custom Amounts**: Set specific dollar amounts for each person
- **Validation**: Ensures split amounts equal the total expense
- **Flexible Distribution**: Perfect for unequal contributions or complex splits

### 📊 Balance Tracking
- **Real-time Balances**: See who owes money and who is owed
- **Visual Indicators**: Color-coded positive/negative balances
- **Settlement Calculations**: Automatic calculation of optimal settlements
- **Balance History**: Track balance changes over time

### 🤝 Settlement System
- **Optimal Settlements**: Minimizes the number of transactions needed
- **Clear Instructions**: Shows exactly who should pay whom
- **Settlement Tracking**: Mark settlements as complete
- **Balance Resolution**: Automatically updates balances when settlements are made

## Technical Implementation

### Architecture
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development with comprehensive interfaces
- **Context API**: State management for bill splitting data
- **AsyncStorage**: Local data persistence
- **React Navigation**: Smooth navigation between screens

### Key Components

#### Data Types
```typescript
interface BillExpense {
  id: string;
  title: string;
  amount: number;
  paidBy: Person;
  splitType: 'equal' | 'percentage' | 'amount';
  splitPersons: SplitPerson[];
  date: Date;
}

interface SplitPerson extends Person {
  amount: number;
  percentage: number;
  isSelected: boolean;
}
```

#### Calculation Engine
- **Balance Calculation**: Tracks what each person paid vs. owes
- **Settlement Optimization**: Minimizes transaction complexity
- **Validation**: Ensures split integrity and mathematical accuracy
- **Currency Handling**: Proper formatting and rounding

### Screens Overview

#### BillSplitHomeScreen
- Group listing and management
- Quick stats and overview
- Navigation to group details

#### CreateGroupScreen
- Group creation wizard
- Member management
- Currency and color selection
- Real-time preview

#### AddBillExpenseScreen
- Expense entry form
- Split type selection
- Interactive split calculator
- Real-time validation

#### GroupDetailsScreen
- Expense history
- Balance overview
- Settlement recommendations
- Tabbed interface (Expenses/Balances/Settle Up)

## Usage Examples

### Creating a Group
1. Tap "Create Group" from the home screen
2. Enter group name and description
3. Add members by typing their names
4. Select a group color and currency
5. Preview and create the group

### Adding an Expense
1. Open a group and tap "Add Expense"
2. Enter expense title and amount
3. Select who paid for the expense
4. Choose split type (Equal/Percentage/Amount)
5. Configure split details for each member
6. Save the expense

### Equal Split Example
- **Expense**: ₹120 dinner
- **Members**: 3 people
- **Result**: ₹40 per person automatically

### Percentage Split Example
- **Expense**: ₹100 groceries
- **Split**: Person A (50%), Person B (30%), Person C (20%)
- **Result**: A pays ₹50, B pays ₹30, C pays ₹20

### Amount Split Example
- **Expense**: ₹85 shopping
- **Split**: Person A (₹45), Person B (₹25), Person C (₹15)
- **Result**: Custom amounts totaling ₹85

### Settlement Example
- **Balances**: A owes ₹25, B is owed ₹15, C is owed ₹10
- **Settlement**: A pays ₹15 to B and ₹10 to C
- **Result**: Everyone settled up

## Best Practices

### Group Management
- Use descriptive group names (e.g., "Weekend Trip 2024")
- Add all members before creating expenses
- Choose distinct colors for easy identification
- Set appropriate currency for the group's location

### Expense Entry
- Use clear, descriptive expense titles
- Add descriptions for complex expenses
- Double-check amounts before saving
- Select the correct payer for each expense

### Splitting Strategy
- Use **Equal Split** for shared expenses (meals, accommodation)
- Use **Percentage Split** for proportional sharing (based on income/usage)
- Use **Amount Split** for specific arrangements or complex scenarios

### Settlement Management
- Review balances regularly
- Settle up frequently to avoid large imbalances
- Use the app's settlement recommendations for efficiency
- Mark settlements as complete when paid

## Integration

### Adding to Existing App
```typescript
// Wrap your app with BillSplitProvider
import { BillSplitProvider } from './contexts/BillSplitContext';

function App() {
  return (
    <BillSplitProvider>
      <YourAppContent />
    </BillSplitProvider>
  );
}
```

### Using the Context
```typescript
import { useBillSplit } from './contexts/BillSplitContext';

function MyComponent() {
  const { groups, createGroup, addExpense } = useBillSplit();
  
  // Use the bill splitting functionality
}
```

## Future Enhancements

### Planned Features
- **Cloud Sync**: Synchronize data across devices
- **Receipt Scanning**: OCR for automatic expense entry
- **Export Options**: PDF and Excel export functionality
- **Notifications**: Reminders for settlements and new expenses
- **Multi-currency**: Automatic currency conversion
- **Recurring Expenses**: Set up repeating expenses
- **Expense Categories**: Organize expenses by type
- **Detailed Analytics**: Spending insights and trends

### Advanced Splitting
- **Weight-based Splitting**: Split based on consumption or usage
- **Time-based Splitting**: Proportional splits based on time periods
- **Complex Formulas**: Custom calculation rules
- **Conditional Splits**: Different splits based on expense type

This bill splitting app provides a comprehensive solution for managing shared expenses, with the flexibility to handle any splitting scenario while maintaining the simplicity and elegance of apps like Splid.