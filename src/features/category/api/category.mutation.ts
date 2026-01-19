import { useMutation } from "@tanstack/react-query";
import { categoryApi } from "./category.api";
import type { CategoryPayload } from "../type";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "@/app/queryClient";

export const useUpdateCategories = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({
      categoryId,
      categoryData,
    }: {
      categoryId: number;
      categoryData: CategoryPayload;
    }) => {
      return categoryApi.updateCategory(categoryId, categoryData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      navigate({
        to: "/category",
      });
    },
    onError: () => {},
  });
};

export const useCreateCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (categoryData: CategoryPayload) => {
      return categoryApi.createCategory(categoryData);
    },
    onSuccess: () => {
      navigate({
        to: "..",
      });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {},
  });
};

export const useDeleteCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (categoryId: number) => {
      return categoryApi.deleteCategory(categoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      navigate({
        to: "/category",
      });
    },
    onError: () => {},
  });
};
