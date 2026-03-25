import { request } from './client';
import type { UserDto } from './types';

const BASE = '/api/users';

export const usersApi = {
  getMe: (userId: number) => request<UserDto>(`${BASE}/me`, { params: { userId } }),
  updateProfile: (userId: number, dto: Partial<UserDto>) =>
    request<UserDto>(`${BASE}/me`, { method: 'PUT', params: { userId }, body: JSON.stringify(dto) }),
  getById: (id: number) => request<UserDto>(`${BASE}/${id}`),
};
