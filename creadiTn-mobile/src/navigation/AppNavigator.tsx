import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from '../components';
import { colors } from '../theme';
import { View, Text, ActivityIndicator } from 'react-native';

// Screens
import {
  SplashScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  HomeScreen,
  MyCreditsScreen,
  RewardsScreen,
  MenuScreen,
  InstallmentsScreen,
  SimulatorScreen,
  MerchantsScreen,
  KycScreen,
  KycStatusScreen,
  ProfileScreen,
  SettingsScreen,
} from '../screens';

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.primaryLight,
          height: 85,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: colors.white,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '600',
          marginTop: 4,
          marginBottom: 2,
          lineHeight: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color, lineHeight: 26 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Credits"
        component={MyCreditsScreen}
        options={{
          title: 'Payments',
          tabBarLabel: 'Payments',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color, lineHeight: 26 }}>💳</Text>,
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          title: 'Wallet',
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color, lineHeight: 26 }}>👛</Text>,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: 'Menu',
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color, lineHeight: 26 }}>☰</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

// Main Navigator
function MainNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainAppTabs" component={TabNavigator} />

      {/* Modal Screens */}
      <MainStack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.dark,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: '600',
          },
        }}
      >
        <MainStack.Screen
          name="Installments"
          component={InstallmentsScreen}
          options={{ title: 'Echéances' }}
        />
        <MainStack.Screen
          name="Merchants"
          component={MerchantsScreen}
          options={{ title: 'Commerçants' }}
        />
        <MainStack.Screen
          name="Kyc"
          component={KycScreen}
          options={{ title: 'Vérification d\'identité' }}
        />
        <MainStack.Screen
          name="KycStatus"
          component={KycStatusScreen}
          options={{ title: 'Statut KYC' }}
        />
        <MainStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Réglages' }}
        />
      </MainStack.Group>
    </MainStack.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  const { isAuthenticated, loading, userId, email } = useAuth();

  console.log('[AppNavigator] Render - loading:', loading, 'authenticated:', isAuthenticated, 'userId:', userId, 'email:', email);

  if (loading) {
    console.log('[AppNavigator] Still loading, showing splash screen');
    return <SplashScreen />;
  }

  if (__DEV__) {
    console.log('[AppNavigator Debug]');
    console.log('  Loading:', loading);
    console.log('  Authenticated:', isAuthenticated);
    console.log('  UserId:', userId);
    console.log('  Email:', email);
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
