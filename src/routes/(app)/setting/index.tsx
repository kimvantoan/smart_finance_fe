import { authApi } from "@/features/auth/api/auth.api";
import Setting from "@/features/setting/page/Setting";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/setting/")({
  loader: async () => await authApi.me(),
  component: Setting,
});
