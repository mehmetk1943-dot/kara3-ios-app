import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';
import { GoldButton, GoldDivider, Kara3Logo } from '../components';

interface MenuItem {
  icon: string;
  label: string;
  sublabel?: string;
  onPress: () => void;
}

const Placeholder = () =>
  Alert.alert('Coming Soon', 'This feature will be available when Shopify is connected.');

export const ProfileScreen: React.FC = () => {
  const menuGroups: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Account',
      items: [
        {
          icon: 'receipt-outline',
          label: 'Order History',
          sublabel: 'Track and review past orders',
          onPress: Placeholder,
        },
        {
          icon: 'location-outline',
          label: 'Saved Addresses',
          sublabel: 'Manage delivery addresses',
          onPress: Placeholder,
        },
        {
          icon: 'card-outline',
          label: 'Payment Methods',
          sublabel: 'Manage saved cards',
          onPress: Placeholder,
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'notifications-outline',
          label: 'Notifications',
          sublabel: 'New arrivals, order updates',
          onPress: Placeholder,
        },
        {
          icon: 'language-outline',
          label: 'Currency & Region',
          sublabel: 'USD · United States',
          onPress: Placeholder,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle-outline',
          label: 'Help Center',
          onPress: Placeholder,
        },
        {
          icon: 'chatbubble-outline',
          label: 'Contact Us',
          onPress: Placeholder,
        },
        {
          icon: 'document-text-outline',
          label: 'Privacy Policy',
          onPress: Placeholder,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Kara3Logo size="sm" color={Colors.teal} />
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Guest state */}
        <View style={styles.guestCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={32} color={Colors.teal} />
          </View>
          <Text style={styles.guestTitle}>Welcome to Kara3</Text>
          <Text style={styles.guestSubtitle}>
            Sign in to track orders, save your wishlist, and access exclusive member benefits.
          </Text>
          <GoldButton
            label="Sign In"
            onPress={Placeholder}
            style={styles.signInBtn}
          />
          <TouchableOpacity onPress={Placeholder} style={styles.registerBtn}>
            <Text style={styles.registerText}>Create an Account</Text>
          </TouchableOpacity>
        </View>

        <GoldDivider marginVertical={Spacing.xl} />

        {/* Menu Groups */}
        {menuGroups.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupCard}>
              {group.items.map((item, idx) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuIcon}>
                      <Ionicons
                        name={item.icon as any}
                        size={18}
                        color={Colors.teal}
                      />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuLabel}>{item.label}</Text>
                      {item.sublabel ? (
                        <Text style={styles.menuSublabel}>{item.sublabel}</Text>
                      ) : null}
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={Colors.textMuted}
                    />
                  </TouchableOpacity>
                  {idx < group.items.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* App info */}
        <View style={styles.appInfo}>
          <Kara3Logo size="sm" color={Colors.textMuted} showIcon={false} />
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
  },
  header: {
    paddingTop: Spacing.base,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.displayMedium,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  guestCard: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.tealMuted,
    borderWidth: 1.5,
    borderColor: Colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  guestTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  guestSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  signInBtn: {
    width: '100%',
  },
  registerBtn: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  registerText: {
    ...Typography.label,
    color: Colors.teal,
    textDecorationLine: 'underline',
  },
  group: {
    marginBottom: Spacing.xl,
  },
  groupTitle: {
    ...Typography.label,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  groupCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.tealMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuText: {
    flex: 1,
  },
  menuLabel: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
  },
  menuSublabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
    marginLeft: 16 + 32 + 12,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: 4,
  },
  appVersion: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
});
