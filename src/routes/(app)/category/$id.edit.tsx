import { categoryApi } from "@/features/category/api/category.api";
import CategoryEdit from "@/features/category/page/CategoryEdit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/category/$id/edit")({
  loader: async ({ params }) => {
    const id = Number(params.id);

    return await categoryApi.getCategory(id);
  },
  component: CategoryEdit,
});
