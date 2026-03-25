/**
 * Form Validation Utilities
 * Provides validation functions for all forms in the application
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 6 caractères' };
  }
  return { valid: true };
}

/**
 * Validate login form
 */
export function validateLoginForm(email: string, password: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email est requis' });
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Email invalide' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Mot de passe est requis' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Mot de passe doit contenir au moins 6 caractères' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get the first error message from validation result
 */
export function getFirstError(result: ValidationResult): string {
  if (result.errors.length > 0) {
    return result.errors[0].message;
  }
  return '';
}

/**
 * Validate registration form
 */
export function validateRegisterForm(
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string = '',
  lastName: string = ''
): ValidationResult {
  const errors: ValidationError[] = [];

  // Email validation
  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email est requis' });
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Email invalide' });
  }

  // Password validation
  if (!password) {
    errors.push({ field: 'password', message: 'Mot de passe est requis' });
  } else {
    const pwValidation = validatePassword(password);
    if (!pwValidation.valid) {
      errors.push({ field: 'password', message: pwValidation.message || 'Mot de passe invalide' });
    }
  }

  // Confirm password
  if (!confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Confirmation requis' });
  } else if (password !== confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Les mots de passe ne correspondent pas' });
  }

  // Name validation (optional fields)
  if (firstName && firstName.trim().length < 2) {
    errors.push({ field: 'firstName', message: 'Le prénom doit contenir au moins 2 caractères' });
  }

  if (lastName && lastName.trim().length < 2) {
    errors.push({ field: 'lastName', message: 'Le nom doit contenir au moins 2 caractères' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate required field
 */
export function validateRequired(value: string, fieldName: string): ValidationError | null {
  if (!value || !value.trim()) {
    return { field: fieldName, message: `${fieldName} est requis` };
  }
  return null;
}

/**
 * Validate phone number (basic validation)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate credit amount
 */
export function validateCreditAmount(amount: string | number): ValidationError | null {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return { field: 'amount', message: 'Montant invalide' };
  }
  
  if (numAmount <= 0) {
    return { field: 'amount', message: 'Le montant doit être positif' };
  }
  
  if (numAmount > 100000) {
    return { field: 'amount', message: 'Le montant dépasse le maximum autorisé' };
  }
  
  return null;
}

/**
 * Validate KYC document
 */
export function validateKYCDocument(documentType: string, documentNumber: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (!documentType) {
    errors.push({ field: 'documentType', message: 'Type de document requis' });
  }

  if (!documentNumber || documentNumber.trim().length < 3) {
    errors.push({ field: 'documentNumber', message: 'Numéro de document invalide' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
