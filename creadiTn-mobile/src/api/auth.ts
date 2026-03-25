import { request } from './client';
import type { AuthRequest, AuthResponse, RegisterRequest, GoogleAuthRequest } from './types';

const BASE = '/api/auth';

export const authApi = {
  login: (body: AuthRequest) =>
    request<AuthResponse>(`${BASE}/login`, { method: 'POST', body: JSON.stringify(body) }),
  
  register: (body: RegisterRequest) =>
    request<AuthResponse>(`${BASE}/register`, { method: 'POST', body: JSON.stringify(body) }),
  
  googleLogin: (body: GoogleAuthRequest) =>
    request<AuthResponse>(`${BASE}/google-login`, { method: 'POST', body: JSON.stringify(body) }),
};
