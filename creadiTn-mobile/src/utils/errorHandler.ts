import { ApiError } from '../api/client';

export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

/**
 * Parse various error types into a standardized AppError
 */
export function parseError(error: any): AppError {
  // If it's already an ApiError
  if (error instanceof ApiError) {
    return {
      message: error.message,
      code: error.status?.toString(),
      details: error.body,
    };
  }

  // If it's a network error
  if (error?.message?.includes('Network') || error?.message?.includes('fetch')) {
    return {
      message: 'Erreur de connexion. Vérifiez votre connexion Internet.',
      code: 'NETWORK_ERROR',
      details: error,
    };
  }

  // If it's a JSON parse error
  if (error instanceof SyntaxError) {
    return {
      message: 'Erreur lors du traitement de la réponse serveur.',
      code: 'PARSE_ERROR',
      details: error,
    };
  }

  // If it has a response property (axios/fetch error)
  if (error?.response) {
    const status = error.response.status;
    const data = error.response.data || {};
    
    if (status === 401 || status === 403) {
      return {
        message: 'Identifiants invalides ou accès non autorisé.',
        code: 'AUTH_ERROR',
        details: data,
      };
    }
    
    if (status === 404) {
      return {
        message: 'Ressource non trouvée.',
        code: 'NOT_FOUND',
        details: data,
      };
    }
    
    if (status >= 500) {
      return {
        message: 'Erreur serveur. Veuillez réessayer plus tard.',
        code: 'SERVER_ERROR',
        details: data,
      };
    }

    return {
      message: data.message || error.message || 'Une erreur est survenue.',
      code: `HTTP_${status}`,
      details: data,
    };
  }

  // Generic error message
  if (error?.message) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
      details: error,
    };
  }

  // Fallback
  return {
    message: 'Une erreur inattendue est survenue.',
    code: 'UNKNOWN_ERROR',
    details: error,
  };
}

/**
 * Format error message for display to user
 */
export function formatErrorMessage(error: any): string {
  const appError = parseError(error);
  return appError.message;
}

/**
 * Log error for debugging
 */
export function logError(error: any, context?: string): void {
  const appError = parseError(error);
  console.error(`[Error${context ? ': ' + context : ''}]`, {
    message: appError.message,
    code: appError.code,
    details: appError.details,
  });
}
