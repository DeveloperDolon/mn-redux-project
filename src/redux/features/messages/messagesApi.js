import baseApi from "../baseApi/baseApi";

const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessagesByReceiverId: builder.query({
        query: ({ receiverId, senderId }) => `/messages?receiver=${receiverId}&sender=${senderId}`,
      providesTags: ["Base"],
    }),
  }),
});

export const { useGetMessagesByReceiverIdQuery } = messagesApi;
