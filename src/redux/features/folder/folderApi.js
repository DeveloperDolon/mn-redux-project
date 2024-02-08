import baseApi from "../baseApi/baseApi";

const folderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation({
      query: (data) => ({
        url: "/folders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Base"],
    }),
    createSubFolder: builder.mutation({
      query: (data) => ({
        url: "/folders/subfolder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Base"],
    }),
    getUniqueFolders: builder.query({
      query: () => `/folders/folderNames`,
      providesTags: ["Base"],
    }),
    getFolderById: builder.query({
      query: (id) => `/folders/${id}`,
      providesTags: ["Base"],
    }),
    getFolders: builder.query({
      query: () => "/folders",
      providesTags: ["Base"],
    }),
    getSubFolderById: builder.query({
      query: (id) => `/folders/subfolder/${id}`,
      providesTags: ["Base"],
    }),
    getSubFolderByFolderIdWithPagination: builder.query({
      query: ({ id, page }) => `/folders/pagination/${id}?page=${page}`,
      providesTags: ["Base"],
    }),
    getRelatedSubCategoriesByCategoryId: builder.query({
      query: (id) => `/folders/relatedSubFolder/${id}`,
      providesTags: ["Base"],
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useCreateSubFolderMutation,
  useGetUniqueFoldersQuery,
  useGetFolderByIdQuery,
  useGetFoldersQuery,
  useGetSubFolderByIdQuery,
  useGetSubFolderByFolderIdWithPaginationQuery,
  useGetRelatedSubCategoriesByCategoryIdQuery
} = folderApi;
