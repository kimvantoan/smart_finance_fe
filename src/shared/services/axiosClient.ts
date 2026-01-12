/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "@/shared/utils/token";
import type { ResponseType } from "../types/Response";

/**
 * Mở rộng AxiosRequestConfig
 * _retry dùng để tránh refresh token vô hạn
 */
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * =========================
 * TẠO AXIOS INSTANCE
 * =========================
 * Dùng chung cho toàn bộ app
 */
const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * =========================
 * REQUEST INTERCEPTOR
 * =========================
 * - Chạy TRƯỚC khi request gửi đi
 * - Gắn accessToken vào header Authorization
 */
axiosClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      // headers luôn tồn tại trong InternalAxiosRequestConfig
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * =========================
 * BIẾN DÙNG CHO REFRESH TOKEN
 * =========================
 */

/**
 * Đánh dấu đang refresh token
 * -> tránh gọi refresh nhiều lần cùng lúc
 */
let isRefreshing = false;

/**
 * Queue các request bị 401 trong lúc đang refresh
 * Các request này sẽ CHỜ token mới
 */
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

/**
 * Xử lý toàn bộ queue sau khi refresh xong
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      // Refresh fail → reject tất cả request đang chờ
      promise.reject(error);
    } else {
      // Refresh success → resolve với token mới
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

/**
 * =========================
 * RESPONSE INTERCEPTOR
 * =========================
 * - Chạy SAU khi server trả response
 * - Xử lý lỗi 401 + auto refresh token
 */
axiosClient.interceptors.response.use(
  /**
   * Response thành công
   * -> trả thẳng data theo ResponseType<T>
   */
  (response) => response,

  /**
   * Response lỗi
   */
  async (error: AxiosError<ResponseType<any>>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const status = error.response?.status;

    /**
     * CASE 401: Access token hết hạn
     */
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      /**
       * Nếu đang có 1 request refresh token
       * -> đưa request hiện tại vào queue
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers!.Authorization = `Bearer ${token}`;
              resolve(axiosClient(originalRequest));
            },
            reject,
          });
        });
      }

      /**
       * Bắt đầu refresh token
       */
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();

        // Không có refresh token → logout
        if (!refreshToken) throw new Error("No refresh token");

        /**
         * Gọi API refresh token
         * Dùng axios gốc để tránh loop interceptor
         */
        const res = await axios.post<
          ResponseType<{
            accessToken: string;
            refreshToken: string;
          }>
        >(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        /**
         * Lấy token mới từ response
         */
        const tokenData = res.data.data;

        if (!tokenData?.accessToken) {
          throw new Error("Refresh token response is invalid");
        }
        const newAccessToken = tokenData.accessToken;
        const newRefreshToken = tokenData.refreshToken;

        /**
         * Lưu token mới
         */
        setTokens(newAccessToken, newRefreshToken);

        /**
         * Chạy lại toàn bộ request đang chờ
         */
        processQueue(null, newAccessToken);

        /**
         * Gắn token mới cho request hiện tại
         * rồi gọi lại API
         */
        originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        /**
         * Refresh thất bại
         * → clear token + reject toàn bộ queue
         */
        processQueue(refreshError, null);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        /**
         * Kết thúc quá trình refresh
         */
        isRefreshing = false;
      }
    }

    /**
     * Các lỗi khác (403, 500, ...)
     */
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosClient;
