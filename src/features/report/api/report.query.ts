import { useQuery } from "@tanstack/react-query";
import { reportApi } from "./report.api";

export const useReportQuery = (params: {
  year: number;
  month?: number;
  type?: string;
}) => {
  return useQuery({
    queryKey: ["report", params],
    queryFn: () => reportApi.getReport(params),
  });
};

export const useLineChartQuery = (params: { year: number; month?: number }) => {
  return useQuery({
    queryKey: ["line-chart", params],
    queryFn: () => reportApi.getLineChart(params),
  });
};
