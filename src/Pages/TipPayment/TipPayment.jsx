import { useGetTipByIdQuery } from '@/redux/features/tip/tipApi';
import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from 'react-router-dom';
import Container from '../Shared/Container';
import CardPayment from '../../assets/cardpayment.png';
import CheckoutFormTip from '../Payment/CheckoutFormTip';

const stripePromise = loadStripe(
    "pk_test_51LcWTVDKzc5i2gcpVfZAyMFMWM1Q16TnmRkGbZz00TMhZQ6oMMI6wK4hHEWeRcAnRQabb9ZyIZmoVDScBw86ozdh00vaxYluf5"
);

const TipPayment = () => {

    const { id } = useParams();
    const { data: tipData } = useGetTipByIdQuery(id);

    return (
        <div className="my-10">
            <Container>

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold">
                        Add your card details carefully
                    </h2>
                </div>

                <div className="w-2/3 mx-auto border">

                    <div className='flex justify-between items-center px-4 py-10 bg-[#C6DFF5]'>
                        <h2 className="text-2xl font-bold">
                            Your tip amount
                        </h2>

                        <h4 className="font-bold text-4xl">
                            ${tipData?.data?.amount}
                        </h4>
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
                            <CheckoutFormTip tipData={tipData} />
                        </Elements>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TipPayment;