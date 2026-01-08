/**
 * API Endpoints Definition
 *
 * PURPOSE:
 * - Centralize all API endpoint paths in one place
 * - Avoid hardcoded URLs scattered across the codebase
 * - Make API changes easy to maintain and refactor
 *
 * HOW TO USE:
 * - Import API_ENDPOINTS into API service files
 * - Combine with axiosClient or fetch
 * - NEVER use endpoint strings directly in components
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    PROFILE: "/auth/me",
  },
} as const;
