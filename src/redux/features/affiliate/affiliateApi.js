import baseApi from "../baseApi/baseApi";

const affiliateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateAffiliateLink: builder.query({
      query: (customerId) => `/affiliate/generate-referral-link/${customerId}`,
      invalidatesTags: ["Base"],
    }),
    getReferralLinks: builder.query({
      query: (customerId) => `/affiliate/get-referral-links/${customerId}`,
      invalidatesTags: ["Base"],
    }),
  }),
});

export const { useGenerateAffiliateLinkQuery, useGetReferralLinksQuery } =
  affiliateApi;
