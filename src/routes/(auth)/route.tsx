import AuthLayout from "@/layouts/AuthLayout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: ({ context }) => {
    const { authentication } = context;
    if (authentication.isAuthenticated()) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AuthLayout,
});
