import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, spacing } from '../theme';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  show: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  hide: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const getToastColor = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return colors.success;
    case 'error':
      return colors.danger;
    case 'warning':
      return colors.warning;
    case 'info':
    default:
      return colors.primary;
  }
};

const getToastIcon = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    case 'info':
    default:
      return 'ℹ';
  }
};

interface ToastItemProps {
  toast: ToastMessage;
  onHide: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onHide }) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  React.useEffect(() => {
    const duration = toast.duration || 3000;
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onHide(toast.id);
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, fadeAnim, onHide]);

  const bgColor = getToastColor(toast.type);
  const icon = getToastIcon(toast.type);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { backgroundColor: bgColor, opacity: fadeAnim },
      ]}
    >
      <Text style={styles.toastIcon}>{icon}</Text>
      <Text style={styles.toastMessage}>{toast.message}</Text>
    </Animated.View>
  );
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 3000) => {
      const id = Date.now().toString();
      const newToast: ToastMessage = { id, message, type, duration };
      setToasts((prevToasts) => [...prevToasts, newToast]);
    },
    []
  );

  const value: ToastContextType = {
    show: showToast,
    success: (msg, duration) => showToast(msg, 'success', duration),
    error: (msg, duration) => showToast(msg, 'error', duration),
    warning: (msg, duration) => showToast(msg, 'warning', duration),
    info: (msg, duration) => showToast(msg, 'info', duration),
    hide: hideToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View style={styles.toastWrapper} pointerEvents="none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onHide={hideToast} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    lineHeight: 20,
  },
  toastMessage: {
    color: 'white',
    fontSize: 14,
    flex: 1,
    fontFamily: 'System',
    lineHeight: 18,
  },
});
