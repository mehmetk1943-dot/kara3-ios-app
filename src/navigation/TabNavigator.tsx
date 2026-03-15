import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootTabParamList } from '../types';
import { HomeStack } from './HomeStack';
import { CollectionsStack } from './CollectionsStack';
import { SearchStack } from './SearchStack';
import { WishlistStack } from './WishlistStack';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Colors, Typography } from '../theme';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Tab = createBottomTabNavigator<RootTabParamList>();

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const tabIcon = (
  focused: boolean,
  outline: IconName,
  filled: IconName
): IconName => (focused ? filled : outline);

export const TabNavigator: React.FC = () => {
  const { cart } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={tabIcon(focused, 'home-outline', 'home')}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CollectionsTab"
        component={CollectionsStack}
        options={{
          title: 'Collections',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={tabIcon(focused, 'grid-outline', 'grid')}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={tabIcon(focused, 'search-outline', 'search')}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="WishlistTab"
        component={WishlistStack}
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ focused, color }) => (
            <View>
              <Ionicons
                name={tabIcon(focused, 'heart-outline', 'heart')}
                size={22}
                color={color}
              />
              {wishlistCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={tabIcon(focused, 'person-outline', 'person')}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 88,
    paddingBottom: 28,
    paddingTop: 8,
  },
  tabLabel: {
    ...Typography.labelSmall,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  tabItem: {
    paddingTop: 4,
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -6,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: Colors.textInverse,
    fontSize: 8,
    fontWeight: '700',
  },
});
