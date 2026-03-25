let GoogleSignin: any = null;
let statusCodes: any = null;
let isGoogleSignInAvailable = true;

try {
  const module = require('@react-native-google-signin/google-signin');
  GoogleSignin = module.GoogleSignin;
  statusCodes = module.statusCodes;
} catch (error) {
  console.warn('Google Sign-In module not available. This is expected for Expo Go.');
  console.warn('For Google Sign-In support, create a custom Expo dev client.');
  isGoogleSignInAvailable = false;
}

// Configure Google Sign-In
export const initializeGoogleSignIn = async () => {
  if (!isGoogleSignInAvailable) {
    console.warn('⚠️ Google Sign-In not available in Expo Go. Use custom dev client for native modules.');
    return null;
  }
  try {
    await GoogleSignin.hasPlayServices();
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_WEB_CLIENT_ID || '966982399806-gh8fvkk48r8p58bvnjm304gb2e23iisu.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
  } catch (error) {
    console.error('Google Sign-In initialization failed:', error);
  }
};

export const googleSignInService = {
  isAvailable: () => isGoogleSignInAvailable,

  signIn: async () => {
    if (!isGoogleSignInAvailable) {
      throw new Error(
        'Google Sign-In is not available in Expo Go.\n\n' +
        'To use Google Sign-In, you need to:\n' +
        '1. Set up a custom Expo development client\n' +
        '2. Or use a production build (EAS Build)\n\n' +
        'For now, use email/password authentication instead.'
      );
    }
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      return {
        idToken: userInfo.idToken || '',
        accessToken: tokens.accessToken,
        user: {
          firstName: userInfo.user.givenName || '',
          lastName: userInfo.user.familyName || '',
          email: userInfo.user.email,
          photoUrl: userInfo.user.photo,
        },
      };
    } catch (error: any) {
      if (statusCodes && error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Connexion Google annulée.');
      } else if (statusCodes && error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Connexion Google en cours...');
      } else if (statusCodes && error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Google Play Services non disponibles.');
      }
      throw new Error('Erreur lors de la connexion Google: ' + error.message);
    }
  },

  signOut: async () => {
    if (!isGoogleSignInAvailable) return;
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Google Sign-Out failed:', error);
    }
  },

  getCurrentUser: async () => {
    if (!isGoogleSignInAvailable) return null;
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        return await GoogleSignin.getCurrentUser();
      }
      return null;
    } catch (error) {
      console.error('Get current Google user failed:', error);
      return null;
    }
  },
};


