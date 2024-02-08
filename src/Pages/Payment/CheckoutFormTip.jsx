import React, { useState } from 'react';
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUpdateTipMutation } from '@/redux/features/tip/tipApi';
import { FaSpinner } from 'react-icons/fa';

const CheckoutFormTip = ({ tipData }) => {

    const total = tipData?.data?.amount;
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
    const [updateTip] = useUpdateTipMutation();
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

    const isButtonDisabled = !stripe || !clientSecret;

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
            const id = tipData?.data?.id;
            const res = await updateTip(id);
            if (res) {
                toast.success("Succsuccessfully payment!")
                navigate(`/customer-profile`)
            }
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


            <div>
                <div className='grid grid-cols-2 p-4 gap-10 items-center border bg-white'>
                    <div className='space-y-1'>
                        
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Tip amount</p>
                            <span className='font-semibold text-base'>${tipData?.data?.amount ? tipData?.data?.amount : "00"}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Fee</p>
                            <span className='font-semibold text-base'>$00</span>
                        </div>

                        <div className='border'></div>

                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Total</p>
                            <span className='font-semibold text-base'>${tipData?.data?.amount}</span>
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
        </form>
    );
};

export default CheckoutFormTip;