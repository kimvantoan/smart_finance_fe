import { Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

export function MainLayout() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Outlet />
    </>
  );
}
