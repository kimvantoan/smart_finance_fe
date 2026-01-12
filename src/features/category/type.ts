import type { IconKey } from "@/shared/types/IconKey";
import * as z from "zod";

export interface Category {
  id: number;
  name: string;
  type: "INCOME" | "EXPENSE";
  iconKey: IconKey;
  status: "ACTIVE" | "INACTIVE";
}

export const formSchema = z.object({
  name: z.string().trim(),
  type: z.enum(["INCOME", "EXPENSE"]),
  iconKey: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type CategoryPayload = z.infer<typeof formSchema>;
