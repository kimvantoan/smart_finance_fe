import { transactionApi } from "@/features/transaction/api/transaction.api";
import TransactionEdit from "@/features/transaction/page/TransactionEdit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/transaction/$id/edit")({
  loader: async ({ params }) => {
    const id = Number(params.id);
    
    await transactionApi.getTransaction(id);

    return { id };
  },
  component: TransactionEdit,
});
