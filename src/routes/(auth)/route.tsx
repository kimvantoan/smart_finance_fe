import AuthLayout from "@/layouts/AuthLayout";
import { auth } from "@/shared/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: () => {
    if (!auth.isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});
