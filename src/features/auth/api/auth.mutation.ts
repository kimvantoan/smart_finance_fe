import { useMutation } from "@tanstack/react-query";
import type {
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
  verifyOtpPayload,
} from "../types";
import { authApi } from "./auth.api";
import { useNavigate } from "@tanstack/react-router";
import type { ApiErrorResponse } from "@/shared/types/ApiErrorResponse";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { setTokens } from "@/shared/utils/token";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  return useMutation({
    mutationFn: (payload: LoginPayload) => {
      return authApi.login(payload);
    },
    onSuccess(data) {
      setTokens(data.data.data);
      navigate({
        to: "/",
      });
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error", error);
      if (error.statusCode === 401) {
        toast.error(t("auth.email_or_password_invalid")!);
      }
      if (error.statusCode === 403) {
        toast.error(t("auth.user_not_verified")!);
      }
    },
  });
};

export const useSignupMutation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  return useMutation({
    mutationFn: (payload: RegisterPayload) => {
      return authApi.signup(payload);
    },
    onSuccess: (data, payload) => {
      navigate({
        to: "/verify-otp",
        search: { email: payload.email, expiredAt: data.data.data },
      });
    },
    onError: (error: ApiErrorResponse) => {
      if (error.statusCode === 409) {
        toast.error(t("auth.exist_email"));
      }
    },
  });
};

export const useResendOtpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { email: string }) => {
      return authApi.resendOtp(data);
    },
    onSuccess: (data, payload) => {
      navigate({
        to: "/verify-otp",
        replace: true,
        search: { email: payload.email, expiredAt: data.data.data },
      });
    },
  });
};

export const useVerifyOtpMutation = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: verifyOtpPayload) => {
      return authApi.verifyOtp(data);
    },
    onSuccess: () => {
      navigate({
        to: "/login",
        replace: true,
      });
      toast.success(t("auth.otp_verified")!);
    },
    onError: (error: ApiErrorResponse) => {
      if (error.statusCode === 411) {
        toast.error(t("auth.invalid_otp"));
      }
    },
  });
};

export const useChangePasswordMutation = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: ChangePasswordPayload) => {
      return authApi.changePassword(data);
    },
    onSuccess: () => {
      toast.success(t("auth.change_password_success"));
      navigate({
        to: "..",
      });
    },
    onError: (error: ApiErrorResponse) => {
      if (error.statusCode === 412) {
        toast.error(t("auth.old_password_incorrect")!);
      }
      if (error.statusCode === 413) {
        toast.error(t("auth.new_password_confirmed")!);
      }
    },
  });
};
