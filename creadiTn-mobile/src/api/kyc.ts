import { request, ApiError } from './client';
import { API_BASE_URL } from './config';
import type { KycDocumentDto } from './types';

const BASE = '/api/kyc';

export const kycApi = {
  upload: (userId: number, cinNumber: string, cinFrontUrl: string, cinBackUrl: string, selfieUrl: string) =>
    request<KycDocumentDto>(`${BASE}/upload`, {
      method: 'POST',
      params: { userId, cinNumber, cinFrontUrl, cinBackUrl, selfieUrl },
    }),

  /** Returns null if user has no KYC document yet (404). */
  getStatusOptional: async (userId: number): Promise<KycDocumentDto | null> => {
    try {
      return await request<KycDocumentDto>(`${BASE}/status`, { params: { userId } });
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return null;
      throw e;
    }
  },

  getStatus: (userId: number) => request<KycDocumentDto>(`${BASE}/status`, { params: { userId } }),
};

export type KycLocalImage = { uri: string; name?: string; type?: string };

/**
 * Multipart upload to Spring Boot /api/kyc/upload-multipart (Expo / React Native).
 */
export async function uploadKycMultipart(
  userId: number,
  cinNumber: string,
  files: { cinFront: KycLocalImage; cinBack: KycLocalImage; selfie: KycLocalImage }
): Promise<KycDocumentDto> {
  const form = new FormData();
  const appendFile = (field: string, img: KycLocalImage) => {
    form.append(field, {
      uri: img.uri,
      name: img.name ?? `${field}.jpg`,
      type: img.type ?? 'image/jpeg',
    } as unknown as Blob);
  };
  appendFile('cinFront', files.cinFront);
  appendFile('cinBack', files.cinBack);
  appendFile('selfie', files.selfie);

  const q = new URLSearchParams({ userId: String(userId), cinNumber });
  const url = `${API_BASE_URL.replace(/\/$/, '')}${BASE}/upload-multipart?${q.toString()}`;
  const res = await fetch(url, {
    method: 'POST',
    body: form,
  });
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const msg =
      data && typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message: string }).message)
        : res.statusText;
    throw new ApiError(msg, res.status, data);
  }
  return data as KycDocumentDto;
}
