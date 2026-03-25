import { request } from './client';
import type { NotificationDto } from './types';
import type { ApiResponse } from './types';

const BASE = '/api/notifications';

export const notificationsApi = {
  getAll: (userId: number) => request<NotificationDto[]>(BASE, { params: { userId } }),
  getUnread: (userId: number) => request<NotificationDto[]>(`${BASE}/unread`, { params: { userId } }),
  getUnreadCount: (userId: number) => request<number>(`${BASE}/unread-count`, { params: { userId } }),
  markAsRead: (id: number) => request<ApiResponse>(`${BASE}/${id}/read`, { method: 'PUT' }),
};
