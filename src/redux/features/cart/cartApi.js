import baseApi from "../baseApi/baseApi";


const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addCartItem: builder.mutation({
      query: (data) => ({
        url: "/carts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Base"],
    }),
    getAllCartItems: builder.query({
      query: (email) => `/carts/customercart/${email}`,
      providesTags: ["Base"]
    }),
    getCartById: builder.query({
      query: (id) => `/carts/${id}`,
      providesTags: ["Base"]
    }),
    getSelectedCartGigs: builder.query({
      query: (email) => `/carts/selected/${email}`,
      providesTags: ["Base"]
    }),
    updateIsSelectedCart: builder.mutation({
      query: ({ data, id }) => ({
        url: `/carts/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Base"],
    }),
    updateIsSelectedCartNot: builder.mutation({
      query: ({ data, id }) => ({
        url: `/carts/isNotSelected/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Base"],
    }),
    deleteGigFromCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Base"]
    }),
    deleteManyGigFromCart: builder.mutation({
      query: ({email}) => ({
        url: `/carts/delete/${email}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Base"]
    })
  }),
});

export const {
  useAddCartItemMutation,
  useGetCartByIdQuery,
  useGetAllCartItemsQuery,
  useGetSelectedCartGigsQuery,
  useUpdateIsSelectedCartMutation,
  useUpdateIsSelectedCartNotMutation,
  useDeleteGigFromCartMutation,
  useDeleteManyGigFromCartMutation
} = cartApi;
