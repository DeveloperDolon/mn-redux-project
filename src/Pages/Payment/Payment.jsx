import {
  useGetOrderByIdQuery,
  useUpdateOrderPriceMutation,
} from "@/redux/features/order/orderApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import Container from "../Shared/Container";
import CardPayment from "../../assets/cardpayment.png";

const stripePromise = loadStripe(
  "pk_test_51LcWTVDKzc5i2gcpVfZAyMFMWM1Q16TnmRkGbZz00TMhZQ6oMMI6wK4hHEWeRcAnRQabb9ZyIZmoVDScBw86ozdh00vaxYluf5"
);

const Payment = () => {
  const { id } = useParams();
  const { data: orderData, isLoading } = useGetOrderByIdQuery(id);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Update the checkbox state based on isFastDelivery from orderData
    if (orderData?.data?.isFastDelivery !== undefined) {
      setIsChecked(orderData?.data?.isFastDelivery);
    }
  }, [orderData]);

  const [updateOrderPrice] = useUpdateOrderPriceMutation();

  const handleToggleChecked = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    if (checked) {
      const newAmount = checked
        ? orderData?.data?.amount + orderData?.data?.fastDeliveryAmount
        : orderData?.data?.amount;

      const data = {
        amount: newAmount,
        isFastDelivery: checked,
      };

      updateOrderPrice({ data, id });
    } else {
      const newAmount = !checked
        ? orderData?.data?.amount - orderData?.data?.fastDeliveryAmount
        : orderData?.data?.amount;

      const data = {
        amount: newAmount,
        isFastDelivery: checked,
      };

      updateOrderPrice({ data, id });
    }
  };

  return (
    <div className="my-10">
      <Container>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">
            Add your card details carefully
          </h2>
        </div>

        <div className="w-2/3 mx-auto border">
          <div className="p-4 bg-[#C6DFF5]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <img
                  className="w-24 h-20 object-cover"
                  src={orderData?.data?.categoryImage}
                  alt=""
                />
                <h5 className="text-xl font-semibold">
                  {orderData?.data?.category}
                </h5>
              </div>
              <div>
                <p>Quantity - {orderData?.data?.quantity}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <div>
                <p>{orderData?.data?.subCategory}</p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    onChange={handleToggleChecked}
                    type="checkbox"
                    id="switch-id"
                    value={isChecked}
                    checked={isChecked}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                  <span
                    htmlFor="switch-id"
                    className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Extra-first delivery ${orderData?.data?.fastDeliveryAmount}
                  </span>
                </label>
              </div>
              <div>
                <h4 className="font-bold text-5xl">
                  ${orderData?.data?.amount}
                </h4>
              </div>
            </div>
          </div>

          <div className="bg-[#F2F9FF] p-4">
            <div>
              <div className="flex items-center gap-5">
                <h3 className="font-bold text-2xl">Card Payment</h3>
                <img className="h-7" src={CardPayment} alt="" />
              </div>

              <p className="my-5 text-sm">
                Your credit card information is secure, and your card is not
                charged until after you've confirmed your order. Adding a new
                card?
              </p>
            </div>
          </div>

          <div className="bg-[#F2F9FF] p-4">
            <Elements stripe={stripePromise}>
              <CheckoutForm orderData={orderData} />
            </Elements>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
