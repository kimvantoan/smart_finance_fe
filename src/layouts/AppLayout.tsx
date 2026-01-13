import { Outlet } from "@tanstack/react-router";
import MenuBar from "./MenuBar";

export function AppLayout() {
  return (
      <div className="h-screen pb-16 pt-4 px-4">
        <Outlet />
        <MenuBar />
      </div>
  );
}
