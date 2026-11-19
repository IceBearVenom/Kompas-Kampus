export const API_BASE_URL = 'https://api.kompaskampus.id/v1'; // Ready for backend swap

export async function apiRequest<T>(
  _endpoint: string,
  mockResolver: () => T,
  delayMs = 350
): Promise<T> {
  // Simulates async network latency while keeping components decoupled from data source
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResolver());
    }, delayMs);
  });
}
