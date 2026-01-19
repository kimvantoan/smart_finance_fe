import { AppLayout } from "@/layouts/AppLayout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  beforeLoad: ({ context }) => {
    const { authentication } = context;
    if (!authentication.isAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AppLayout,
});
