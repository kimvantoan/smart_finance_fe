import { queryOptions, useQuery } from "@tanstack/react-query";
import { transactionApi } from "./transaction.api";

export const transactionQueryOptions = (params: {
  type?: string;
  categoryId?: number;
  year?: number;
  month?: number;
}) => {
  return queryOptions({
    queryKey: ["transactions", params],
    queryFn: () => transactionApi.getTransactions(params),
  });
};
export const transactionDetailQueryOptions = (transactionId: number) => {
  return queryOptions({
    queryKey: ["transactions", transactionId],
    queryFn: () => transactionApi.getTransaction(transactionId),
  });
};

export const useTransactionQuery = (params: {
  type?: string;
  categoryId?: number;
  year?: number;
  month?: number;
}) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => transactionApi.getTransactions(params),
  });
};

export  const useTransactionQueryDetail = (transactionId: number) => {
  return useQuery({
    queryKey: ["transactions", transactionId],
    queryFn: () => transactionApi.getTransaction(transactionId),
  });
};