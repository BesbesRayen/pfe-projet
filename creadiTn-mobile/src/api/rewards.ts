import { request } from './client';

export interface Cashback {
  available: number;
  history: CashbackHistory[];
}

export interface CashbackHistory {
  id: number;
  amount: number;
  source: string;
  date: string;
}

export interface CashbackOffer {
  id: number;
  merchantId: number;
  merchantName: string;
  percentage: number;
  expiryDate: string;
}

const BASE = '/api/rewards';

export const rewardsApi = {
  getCashback: (userId: number) =>
    request<Cashback>(`${BASE}/cashback`, { params: { userId } }),
  getOffers: (userId: number) =>
    request<CashbackOffer[]>(`${BASE}/offers`, { params: { userId } }),
  getHistory: (userId: number) =>
    request<CashbackHistory[]>(`${BASE}/history`, { params: { userId } }),
};
