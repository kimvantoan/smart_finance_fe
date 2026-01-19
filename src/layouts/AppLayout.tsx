import { Outlet } from "@tanstack/react-router";
import MenuBar from "./MenuBar";

export function AppLayout() {
  return (
      <div className="max-h-screen pt-4 px-4 overflow-hidden">
        <Outlet />
        <MenuBar />
      </div>
  );
}
