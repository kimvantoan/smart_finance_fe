import CategoryAdd from "@/features/category/page/CategoryAdd";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/category/add")({
  component: CategoryAdd,
});
