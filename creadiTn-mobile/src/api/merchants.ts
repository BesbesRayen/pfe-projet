import { request } from './client';
import type { MerchantDto } from './types';

const BASE = '/api/merchants';

export const merchantsApi = {
  getAll: () => request<MerchantDto[]>(BASE),
  getByCategory: (category: string) =>
    request<MerchantDto[]>(`${BASE}/category/${encodeURIComponent(category)}`),
  getById: (id: number) => request<MerchantDto>(`${BASE}/${id}`),
};
