import Categories from "@/features/category/page/Categories";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/category/")({
  component: Categories,
});
