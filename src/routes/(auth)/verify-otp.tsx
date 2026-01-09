import VerifyPage from "@/features/auth/pages/VerifyPage";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/verify-otp")({
  validateSearch: z.object({
    email: z.email(),
    expiredAt: z.number(),
  }),
  component: VerifyPage,
});
