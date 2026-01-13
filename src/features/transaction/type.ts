import * as z from "zod";

export interface Transaction {
  id: number;
  categoryId: number;
  type: "INCOME" | "EXPENSE";
  amount: number;
  transactionDate: string;
  note?: string;
}

export const formSchema = z.object({
  categoryId: z.number(),
  amount: z.number(),
  type: z.enum(["INCOME", "EXPENSE"]),
  note: z.string().max(255).optional(),
  transactionDate: z.string(),
});

export type TransactionPayload = z.infer<typeof formSchema>;
