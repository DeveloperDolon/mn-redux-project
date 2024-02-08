import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../Shared/Container';
import PaymentImg from '../../assets/cardpayment.png';
import { useGetWithdrawMethodByCustomerIdQuery, useSaveWithdrawMethodMutation, useUpdateWithdrawMethodMutation } from '@/redux/features/payment/paymentApi';

const SavePaymentMethod = () => {
    const { customerId } = useParams();
    const { data: withdrawMethod } = useGetWithdrawMethodByCustomerIdQuery(customerId);
    const [saveWithdrawMethod] = useSaveWithdrawMethodMutation();
    const [updateWithdrawMethod] = useUpdateWithdrawMethodMutation();

    // State to store input values
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        if (withdrawMethod) {
            setFirstName(withdrawMethod?.data?.firstName || "")
            setLastName(withdrawMethod?.data?.lastName || "")
            setAccountNumber(withdrawMethod?.data?.cardNumber || "")
        }

    }, [withdrawMethod])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (withdrawMethod?.data) {
            const id = withdrawMethod?.data?.id;

            const data = {
                firstName,
                lastName,
                cardNumber: accountNumber,
                customerId
            }

            const res = await updateWithdrawMethod({ id, data });

            if (res?.data?.data?.id) {
                return navigate(`/affiliate`);
            }
        }
        else {
            const newData = {
                firstName,
                lastName,
                cardNumber: accountNumber,
                customerId
            }

            const res = await saveWithdrawMethod(newData);

            if (res?.data?.data?.id) {
                return navigate(`/affiliate`);
            }
        }
    };

    return (
        <div>
            <div className='bg-[#DCEEFA] text-center py-10 shadow'>
                <h2 className='font-semibold text-webPrimary text-2xl'>Withdraw Method</h2>
                <p className='mt-3'>Carefully Fill Up Your Account Information</p>
            </div>

            <Container>

                <div className="max-w-xl mx-auto p-10 bg-[#F2F9FF] shadow-lg border my-10">

                    <div className='mb-8 flex justify-between items-center'>
                        <h2 className='text-2xl font-semibold'>Receive Payment</h2>

                        <img className='w-[180px]' src={PaymentImg} alt="" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                                className="mt-1 p-2 w-full border outline-none"
                                placeholder='Enter your first name'
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                required
                                onChange={(e) => setLastName(e.target.value)}
                                className="mt-1 p-2 w-full border outline-none"
                                placeholder='Enter your last name'
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-600">
                                Account Number:
                            </label>
                            <input
                                type="text"
                                id="accountNumber"
                                value={accountNumber}
                                required
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="mt-1 p-2 w-full border outline-none"
                                placeholder='Enter your bank account number'
                            />
                        </div>

                        <div className='text-center mt-8'>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
                            >
                                Save Withdraw Method
                            </button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default SavePaymentMethod;