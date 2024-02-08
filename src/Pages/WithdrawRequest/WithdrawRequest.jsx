import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../Shared/Container';
import { useGetWithdrawMethodByCustomerIdQuery } from '@/redux/features/payment/paymentApi';
import { useGetCustomerByIdQuery } from '@/redux/features/customer/customer';
import { useSelector } from 'react-redux';

const WithdrawRequest = () => {

    const { email } = useSelector((state) => state.userSlice);
    const { data: customerData } = useGetCustomerByIdQuery(email);
    const { customerId } = useParams();
    const { data: withdrawMethod } = useGetWithdrawMethodByCustomerIdQuery(customerId);
    const navigate = useNavigate();

    const testBankAccount = {
        account_number: '000123456789',
        routing_number: '110000000',
        account_holder_name: 'Test User',
        account_holder_type: 'individual',
        currency: 'usd',
    };

    const handleWithdrawal = async () => {
        try {
            const response = await fetch("http://localhost:5000/withdraw", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: parseFloat(customerData?.data?.balance),
                    customerId,
                    bankAccountId: testBankAccount.account_number,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                console.log("Withdrawal successful:", responseData.payout);
            } else {
                console.log(responseData.error);
            }
        } catch (error) {
            console.error("Error making withdrawal request:", error.message);
            console.log("Error making withdrawal request");
        }
    };

    return (
        <div>
            <div className='bg-[#DCEEFA] text-center py-10 shadow'>
                <h2 className='font-semibold text-webPrimary text-2xl'>Withdraw</h2>
            </div>

            <Container>
                <div className="max-w-4xl mx-auto my-10">
                    <div className='grid grid-cols-2 items-center gap-5'>

                        <div className='bg-[#F2F9FF] px-5 py-10 m-5 shadow'>
                            <div className='text-end'>
                                <button onClick={() => navigate(`/save-payment-method/${customerId}`)} className="bg-blue-500 text-white py-1 px-3 hover:bg-blue-600 rounded">Edit</button>
                            </div>

                            <div className='space-y-2'>
                                <h6 className='font-medium'>First Name: {withdrawMethod?.data?.firstName}</h6>
                                <h6 className='font-medium'>Last Name: {withdrawMethod?.data?.lastName}</h6>
                                <p className='font-medium'>Account Number: {withdrawMethod?.data?.cardNumber}</p>
                            </div>
                        </div>

                        <div className='space-y-4 text-center'>
                            <h6 className='font-semibold'>Withdraw Amount : ${customerData?.data?.balance}</h6>
                            <button disabled={customerData?.data?.balance === 0} onClick={handleWithdrawal} className="bg-blue-500 text-white py-2 px-10 hover:bg-blue-600 rounded">Withdraw Now</button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default WithdrawRequest;