import axiosClient from "@/shared/services/axiosClient";
import { API_ENDPOINTS } from "@/shared/services/endpoints";
import type { Transaction, TransactionPayload } from "../type";
import type { ResponseType } from "@/shared/types/Response";

export const transactionApi = {
  getTransactions: async (params: {
    type?: string;
    categoryId?: number;
    year?: number;
    month?: number;
  }): Promise<ResponseType<Transaction>> => {
    const res = await axiosClient.get<ResponseType<Transaction>>(
      API_ENDPOINTS.TRANSACTION.GET_TRANSACTIONS,
      { params }
    );
    return res.data;
  },
  getTransaction: async (
    transactionId: number
  ): Promise<ResponseType<Transaction>> => {
    const res = await axiosClient.get<ResponseType<Transaction>>(
      API_ENDPOINTS.TRANSACTION.GET_TRANSACTION(transactionId)
    );
    return res.data;
  },
  createTransaction: async (data: TransactionPayload) => {
    const res = await axiosClient.post(
      API_ENDPOINTS.TRANSACTION.CREATE_TRANSACTION,
      data
    );
    return res.data;
  },
  useUpdateTransaction: async ({
    id,
    data,
  }: {
    id: number;
    data: TransactionPayload;
  }) => {
    const res = await axiosClient.patch(
      API_ENDPOINTS.TRANSACTION.UPDATE_TRANSACTION(id),
      data
    );
    return res.data;
  },
  deleteTransaction: async (transactionId: number) => {
    const res = await axiosClient.delete(
      API_ENDPOINTS.TRANSACTION.DELETE_TRANSACTION(transactionId)
    );
    return res.data;
  },
};
