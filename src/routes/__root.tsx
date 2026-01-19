import type { AuthContext } from "@/shared/utils/auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

type RootRouteContext = {
  authentication: AuthContext;
};
export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <Toaster richColors position="top-center" />
      <Outlet />
    </>
  ),
});
