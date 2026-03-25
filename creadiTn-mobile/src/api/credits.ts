import { request } from './client';
import type {
  CreditSimulationRequest,
  CreditSimulationResponse,
  CreditRequestDto,
  CreditRequestResponse,
  InstallmentDto,
} from './types';

const BASE = '/api/credits';

export const creditsApi = {
  simulate: (body: CreditSimulationRequest) =>
    request<CreditSimulationResponse>(`${BASE}/simulate`, { method: 'POST', body: JSON.stringify(body) }),
  createRequest: (userId: number, dto: CreditRequestDto) =>
    request<CreditRequestResponse>(`${BASE}/request`, { method: 'POST', params: { userId }, body: JSON.stringify(dto) }),
  getMyRequests: (userId: number) => request<CreditRequestResponse[]>(`${BASE}/my-requests`, { params: { userId } }),
  getById: (id: number) => request<CreditRequestResponse>(`${BASE}/${id}`),
  getInstallments: (creditId: number) => request<InstallmentDto[]>(`${BASE}/${creditId}/installments`),
  getMyInstallments: (userId: number) => request<InstallmentDto[]>(`${BASE}/my-installments`, { params: { userId } }),
  getMyPendingInstallments: (userId: number) =>
    request<InstallmentDto[]>(`${BASE}/my-installments/pending`, { params: { userId } }),
};
