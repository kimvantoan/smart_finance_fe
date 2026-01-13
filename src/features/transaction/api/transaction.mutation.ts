import { useMutation } from "@tanstack/react-query";
import type { TransactionPayload } from "../type";
import { transactionApi } from "./transaction.api";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "@/router";

export const useCreateTransaction = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: TransactionPayload) => {
      return transactionApi.createTransaction(data);
    },
    onSuccess: () => {
      navigate({
        to: "..",
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {},
  });
};

export const useUpdateTransaction = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TransactionPayload }) => {
      return transactionApi.useUpdateTransaction({ id, data });
    },
    onSuccess: () => {
      navigate({
        to: "/transaction",
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {},
  });
};

export const useDeleteTransaction = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id: number) => {
      return transactionApi.deleteTransaction(id);
    },
    onSuccess: () => {
      navigate({
        to: "/transaction",
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {},
  });
};
