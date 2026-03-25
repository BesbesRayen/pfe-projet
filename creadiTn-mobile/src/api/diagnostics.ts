import { API_BASE_URL, API_TIMEOUT_MS } from './config';

/**
 * Test if the backend API is reachable
 */
export async function testBackendConnection(): Promise<{
  success: boolean;
  message: string;
  status?: number;
  error?: string;
}> {
  try {
    console.log(`[Backend Test] Testing connection to ${API_BASE_URL}`);
    
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      timeout: API_TIMEOUT_MS,
    });

    const status = response.status;
    const text = await response.text();

    console.log(`[Backend Test] Response status: ${status}`);
    console.log(`[Backend Test] Response body: ${text}`);

    if (response.ok) {
      return {
        success: true,
        message: 'Backend is reachable and healthy',
        status,
      };
    }

    return {
      success: false,
      message: `Backend returned status ${status}`,
      status,
      error: text,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[Backend Test] Connection error:', errorMsg);

    return {
      success: false,
      message: 'Cannot connect to backend',
      error: errorMsg,
    };
  }
}

/**
 * Test if a specific API endpoint is working
 */
export async function testApiEndpoint(endpoint: string): Promise<{
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`[API Test] Testing endpoint: ${url}`);

    const response = await fetch(url, {
      method: 'GET',
      timeout: API_TIMEOUT_MS,
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Endpoint returned status ${response.status}`,
        error: await response.text(),
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Endpoint works correctly',
      data,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[API Test] Error:', errorMsg);

    return {
      success: false,
      message: 'Endpoint test failed',
      error: errorMsg,
    };
  }
}
