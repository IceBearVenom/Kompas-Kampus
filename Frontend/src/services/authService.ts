// Placeholder: the prototype has no authentication yet.
// Replace the mock resolver with a real call when the backend is ready.
import { apiRequest } from './api';

export const authService = {
  isAuthenticated: (): Promise<boolean> => apiRequest('/auth/session', () => true, 100),
};
