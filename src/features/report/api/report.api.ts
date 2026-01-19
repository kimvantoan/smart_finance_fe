import axiosClient from "@/shared/services/axiosClient";
import { API_ENDPOINTS } from "@/shared/services/endpoints";

export const reportApi = {
  getReport: async (params: {
    year: number;
    month?: number;
    type?: string;
  }) => {
    const res = await axiosClient.get(API_ENDPOINTS.REPORT.GET_REPORTS, {
      params,
    });
    return res.data.data;
  },

  getLineChart: async (params: { year: number; month?: number }) => {
    const res = await axiosClient.get(API_ENDPOINTS.REPORT.GET_LINE_CHART, {
      params,
    });
    return res.data;
  },
};
