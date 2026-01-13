import { queryOptions, useQuery } from "@tanstack/react-query";
import { categoryApi } from "./category.api";

export const categoriesQueryOptions = (params: {
  status?: string;
  type?: string;
}) =>
  queryOptions({
    queryKey: ["categories", params],
    queryFn: () => categoryApi.getCategories(params),
  });

export const categoryQueryOptions = (categoryId: number) => {
  return queryOptions({
    queryKey: ["categories", categoryId],
    queryFn: () => categoryApi.getCategory(categoryId),
  });
};

export const useCategoriesQuery = (params: {
  status?: string;
  type?: string;
}) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoryApi.getCategories(params),
  });
};

export const useCategoryQuery = (categoryId: number) => {
  return useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => categoryApi.getCategory(categoryId),
  });
};
