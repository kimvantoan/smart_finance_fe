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
    SIGNUP: "/auth/register",
    RESEND_OTP: "/auth/resend-otp",
    VERIFY_OTP: "/auth/verify-otp",
  },
  CATEGORY:{
    GET_CATEGORIES: "/categories",
    GET_CATEGORY: (categoryId: number) => `/categories/${categoryId}`,
    CREATE_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId: number) => `/categories/${categoryId}`,
    DELETE_CATEGORY: (categoryId: number) => `/categories/${categoryId}`,
  },
  TRANSACTION:{
    GET_TRANSACTIONS: "/transactions",
    GET_TRANSACTION: (transactionId: number) => `/transactions/${transactionId}`,
    CREATE_TRANSACTION: "/transactions",
    UPDATE_TRANSACTION: (transactionId: number) => `/transactions/${transactionId}`,
    DELETE_TRANSACTION: (transactionId: number) => `/transactions/${transactionId}`,
  },
  REPORT:{
    GET_REPORTS: "/reports"
  }
} as const;
