import axiosClient from "@/shared/services/axiosClient";
import type {
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
  verifyOtpPayload,
} from "../types";
import { API_ENDPOINTS } from "@/shared/services/endpoints";

export const authApi = {
  login: (data: LoginPayload) =>
    axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, data),

  signup: (data: RegisterPayload) =>
    axiosClient.post(API_ENDPOINTS.AUTH.SIGNUP, data),

  verifyOtp: (data: verifyOtpPayload) =>
    axiosClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data),

  resendOtp: (data: { email: string }) =>
    axiosClient.post(API_ENDPOINTS.AUTH.RESEND_OTP, data),

  me: () => axiosClient.get(API_ENDPOINTS.AUTH.ME),

  changePassword: (data: ChangePasswordPayload) =>
    axiosClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data),
};
