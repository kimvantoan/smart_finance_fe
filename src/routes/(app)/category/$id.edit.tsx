import { queryClient } from "@/app/queryClient";
import { categoryQueryOptions } from "@/features/category/api/category.query";
import CategoryEdit from "@/features/category/page/CategoryEdit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/category/$id/edit")({
  loader: async ({ params }) => {
    const id = Number(params.id);

    await queryClient.ensureQueryData(categoryQueryOptions(id));

    return { id };
  },
  component: CategoryEdit,
});
