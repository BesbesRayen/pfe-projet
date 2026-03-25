export type KycStatus = 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type CreditRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type InstallmentStatus = 'PENDING' | 'PAID' | 'OVERDUE';
export type NotificationType =
  | 'KYC_VALIDATED'
  | 'CREDIT_APPROVED'
  | 'CREDIT_REJECTED'
  | 'PAYMENT_REMINDER'
  | 'PAYMENT_CONFIRMED'
  | 'INSTALLMENT_OVERDUE';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  message: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface GoogleAuthRequest {
  idToken: string;
  accessToken: string;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  kycStatus: KycStatus | null;
  createdAt: string;
}

export interface CreditSimulationRequest {
  totalAmount: number;
  downPayment: number;
  numberOfInstallments: number;
}

export interface CreditSimulationResponse {
  totalAmount: number;
  downPayment: number;
  remainingAmount: number;
  numberOfInstallments: number;
  monthlyAmount: number;
}

export interface CreditRequestDto {
  totalAmount: number;
  downPayment: number;
  numberOfInstallments: number;
  merchantId?: number;
}

export interface CreditRequestResponse {
  id: number;
  userId: number;
  merchantId: number | null;
  merchantName: string | null;
  totalAmount: number;
  downPayment: number;
  numberOfInstallments: number;
  monthlyAmount: number;
  status: CreditRequestStatus;
  createdAt: string;
}

export interface InstallmentDto {
  id: number;
  creditRequestId: number;
  dueDate: string;
  amount: number;
  status: InstallmentStatus;
  paidDate: string | null;
  penalty: number | null;
}

export interface PaymentRequest {
  installmentId: number;
  amount: number;
  paymentMethod?: string;
}

export interface PaymentDto {
  id: number;
  userId: number;
  installmentId: number;
  amount: number;
  transactionReference: string;
  paymentMethod: string | null;
  paidAt: string;
}

export interface CreditScoreRequest {
  salary: number;
  employmentType: string;
  yearsOfExperience: number;
  monthlyExpenses: number;
}

export interface CreditScoreResponse {
  id: number;
  score: number;
  maxCreditAmount: number;
  decision: string;
  salary: number;
  employmentType: string;
  yearsOfExperience: number;
  monthlyExpenses: number;
}

export interface NotificationDto {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export interface KycDocumentDto {
  id: number;
  userId: number;
  cinFrontUrl: string;
  cinBackUrl: string;
  selfieUrl: string;
  cinNumber: string | null;
  ocrResult: string | null;
  status: KycStatus;
  adminComment: string | null;
  createdAt: string;
}

export interface MerchantDto {
  id: number;
  name: string;
  category: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  logoUrl: string | null;
  active: boolean;
  createdAt: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
