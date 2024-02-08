import baseApi from "../baseApi/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Base"],
    }),
    getCategoriesById: builder.query({
      query: id => `/categories/${id}`,
      providesTags: ["Base"],
    }),
    getSubCategoryById: builder.query({
      query: id => `/categories/subCategory/${id}`,
      providesTags: ["Base"],
    }),
    createCategory: builder.mutation({  
      query: body => ({
        url: `/categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Base"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Base"],
    }),
    getCategoriesName: builder.query({
      query: () => "/categories/categoriesName",
      providesTags: ["Base"],
    }),
    getRelatedDesignGigsByCategoryId: builder.query({
      query: (id) => `/categories/relatedCategoriesGigs/${id}`,
      providesTags: ["Base"],
    }),
    deleteCategory: builder.mutation({
      query: id => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Base"],
    })
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesByIdQuery,
  useGetSubCategoryByIdQuery,
  useGetRelatedDesignGigsByCategoryIdQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoriesNameQuery
} = categoryApi;

