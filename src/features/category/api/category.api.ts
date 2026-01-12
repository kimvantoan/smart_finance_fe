import axiosClient from "@/shared/services/axiosClient";
import { API_ENDPOINTS } from "@/shared/services/endpoints";
import type { Category, CategoryPayload } from "../type";
import type { ResponseType } from "@/shared/types/Response";

export const categoryApi = {
  getCategories: async (params: {
    status?: string;
    type?: string;
  }): Promise<ResponseType<Category>> => {
    const res = await axiosClient.get<ResponseType<Category>>(
      API_ENDPOINTS.CATEGORY.GET_CATEGORIES,
      { params }
    );
    return res.data;
  },

  getCategory: async (categoryId: number): Promise<ResponseType<Category>> => {
    const res = await axiosClient.get<ResponseType<Category>>(
      API_ENDPOINTS.CATEGORY.GET_CATEGORY(categoryId)
    );
    return res.data;
  },

  deleteCategory: (categoryId: number) =>
    axiosClient.delete(API_ENDPOINTS.CATEGORY.DELETE_CATEGORY(categoryId)),

  createCategory: (data: CategoryPayload) =>
    axiosClient.post(API_ENDPOINTS.CATEGORY.CREATE_CATEGORY, data),

  updateCategory: (categoryId: number, data: CategoryPayload) =>
    axiosClient.patch(API_ENDPOINTS.CATEGORY.UPDATE_CATEGORY(categoryId), data),
};
