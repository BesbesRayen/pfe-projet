import { request } from './client';
import type { PaymentRequest, PaymentDto } from './types';

const BASE = '/api/payments';

export const paymentsApi = {
  makePayment: (userId: number, body: PaymentRequest) =>
    request<PaymentDto>(BASE, { method: 'POST', params: { userId }, body: JSON.stringify(body) }),
  getMyPayments: (userId: number) => request<PaymentDto[]>(`${BASE}/my-payments`, { params: { userId } }),
  getByReference: (ref: string) => request<PaymentDto>(`${BASE}/reference/${encodeURIComponent(ref)}`),
};
