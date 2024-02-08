import React from "react";
import ActivityChat from "./ActivityChat/ActivityChat";
import { useGetOrderByIdQuery } from "@/redux/features/order/orderApi";

const Activity = ({id}) => {
  const { data: orderData, isLoading } = useGetOrderByIdQuery(id);
  return (
    <div>
      <ActivityChat customerId={orderData?.data?.customerId} adminId={orderData?.data?.adminUserId} />
    </div>
  );
};

export default Activity;