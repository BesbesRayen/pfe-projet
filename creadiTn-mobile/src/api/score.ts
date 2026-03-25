import { request } from './client';
import type { CreditScoreRequest, CreditScoreResponse } from './types';

const BASE = '/api/score';

export const scoreApi = {
  calculate: (userId: number, body: CreditScoreRequest) =>
    request<CreditScoreResponse>(`${BASE}/calculate`, { method: 'POST', params: { userId }, body: JSON.stringify(body) }),
  getLatest: (userId: number) => request<CreditScoreResponse>(`${BASE}/latest`, { params: { userId } }),
};
