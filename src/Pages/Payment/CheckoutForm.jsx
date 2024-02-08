import React, { useEffect, useState } from 'react';
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { useCreatePaymentMutation } from '@/redux/features/payment/paymentApi';
import { useUpdateOrderIsActiveMutation } from '@/redux/features/order/orderApi';
import { useDeleteGigFromCartMutation } from '@/redux/features/cart/cartApi';

const CheckoutForm = ({ orderData }) => {

    const total = orderData?.data?.amount;
    const price = parseFloat(total?.toFixed(2) || "0");

    const stripe = useStripe();
    const elements = useElements();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isTerms, setIsTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [createPayment, { isSuccess }] = useCreatePaymentMutation();
    const [activeOrder] = useUpdateOrderIsActiveMutation();
    const [cartItemDelete] = useDeleteGigFromCartMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            fetch("http://localhost:5000/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [price]);

    const handleCheckboxChange = (e) => {
        setIsTerms(e.target.checked);
    };

    const isButtonDisabled = !isTerms || !stripe || !clientSecret;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardNumberElement);

        if (card == null) {
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (payload.error) {
            setErrorMessage(payload.error.message);
            setPaymentMethod(null);

            toast(payload.error.message);
        } else {
            setPaymentMethod(payload.paymentMethod);
            setErrorMessage(null);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: orderData?.data?.customer?.email || 'unknown',
                        name: firstName + " " + lastName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            toast.error(`${confirmError.message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        setProcessing(false);

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id)
            // save payment information to the server
            const data = {
                firstName,
                lastName,
                transactionId: paymentIntent.id,
                amount: price.toString(),
                customerId: orderData?.data?.customer?.id,
                orderId: orderData?.data?.id
            }
            createPayment(data);
            activeOrder(orderData?.data?.id);
            const categoryId = JSON.parse(localStorage.getItem("categoryId"));
            cartItemDelete(categoryId);
            localStorage.removeItem("categoryId");

            navigate(`/project-requirements/${orderData?.data?.id}`)
        }

    };

    return (
        <form onSubmit={handleSubmit}>

            <div className='grid grid-cols-2 gap-5 mb-10'>
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium ml-2 mb-2">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        required
                        placeholder="First Name"
                        className="appearance-none border w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium ml-2 mb-2">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        required
                        placeholder="First Name"
                        className="appearance-none border w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </div>
            </div>


            <div className='my-10'>
                <label htmlFor="cardNumber" className="block text-sm font-medium ml-2 mb-2">Card Number</label>
                <CardNumberElement
                    id="cardNumber"
                    className='appearance-none border w-full bg-white p-3 text-gray-700 leading-tight outline-none'
                />
            </div>

            <div className='grid grid-cols-2 gap-5 mb-5'>
                <div>
                    <label htmlFor="expiry" className="block text-sm font-medium ml-2 mb-2">Expiry Date</label>
                    <CardExpiryElement
                        id="expiry"
                        className='appearance-none border w-full bg-white p-3 text-gray-700 leading-tight outline-none'
                    />
                </div>

                <div>
                    <label htmlFor="cvc" className="block text-sm font-medium ml-2 mb-2">CVC</label>
                    <CardCvcElement
                        id="cvc"
                        className='appearance-none border w-full bg-white p-3 text-gray-700 leading-tight outline-none'
                    />
                </div>
            </div>

            <div className='mb-5 ml-2'>
                <label htmlFor="terms" className="text-sm font-medium flex items-center">
                    <input
                        id="terms"
                        type="checkbox"
                        className="mr-2"
                        checked={isTerms}
                        onChange={handleCheckboxChange}
                    />
                    <span className="transition-colors duration-300 ease-in-out">
                        I agree to the
                        <Link to="/terms-conditions" className='transition hover:underline text-webPrimary ml-1'>
                            terms and conditions
                        </Link>
                    </span>
                </label>
            </div>


            <div>
                <div className='grid grid-cols-2 p-4 gap-10 items-center border bg-white'>
                    <div className='space-y-1'>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>{orderData?.data?.category}</p>
                            <span className='font-semibold text-base'>${orderData?.data?.amount - (orderData?.data?.isFastDelivery ? orderData?.data?.fastDeliveryAmount : 0)}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Extra-fast delivery</p>
                            <span className='font-semibold text-base'>${orderData?.data?.isFastDelivery ? orderData?.data?.fastDeliveryAmount : "00"}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Fee</p>
                            <span className='font-semibold text-base'>$00</span>
                        </div>

                        <div className='border'></div>

                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Total</p>
                            <span className='font-semibold text-base'>${orderData?.data?.amount}</span>
                        </div>
                    </div>

                    <div className='w-full'>
                        <button
                            className='bg-webPrimary rounded-xl text-2xl font-semibold py-4 w-full text-white'
                            type="submit"
                            disabled={isButtonDisabled}
                        >
                            {processing ? (
                                <FaSpinner className='m-auto animate-spin' size={24} />
                            ) : (
                                `Pay Now`
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <p className='text-center mt-5 font-normal text-sm'>Go to the Project Requirement option by clicking on "Pay Now" </p>

            {/* {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
            {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>} */}
        </form>
    );
};

export default CheckoutForm;