import { MainLayout } from "@/layouts/MainLayout.";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "./App";

export const rootRoute = createRootRoute({
  component: MainLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
}) 

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({
  routeTree,
});
