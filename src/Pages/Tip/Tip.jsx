import React, { useState } from 'react';
import Container from '../Shared/Container';
import FeedbackTipProjectDetails from '@/components/FeedbackTipProjectDetails/FeedbackTipProjectDetails';
import { useNavigate } from 'react-router-dom';
import { useCreateTipMutation } from '@/redux/features/tip/tipApi';

const Tip = () => {
    const [customTip, setCustomTip] = useState("");
    const [createTip] = useCreateTipMutation();
    const navigate = useNavigate();

    const handleCustomTipChange = (event) => {
        setCustomTip(event.target.value);
    };

    const handleTipSubmission = async () => {

        const orderId = "6cf77743-f975-41bf-844e-d836acff3dfb";
        const customerId = "0eed6857-7a29-48c9-8d8d-7dbbb2429b36";

        if (customTip === "") {
            return;
        }

        const body = {
            amount: parseInt(customTip),
            customerId,
            orderId
        }

        const res = await createTip(body);

        if (res?.data?.data?.id) {
            return navigate(`/tip-payment/${res?.data?.data?.id}`);
        }

    };

    return (
        <div className='my-10'>
            <Container>
                <div className='grid grid-cols-3 gap-20'>
                    <div className='col-span-2'>
                        <h2 className='font-semibold text-3xl'>Thanks for your review!</h2>
                        <p className='font-normal text-lg mt-3'>Show your appreciation to your designer by giving a tip.</p>


                        <div className='flex justify-between items-center border px-5 py-3 my-10'>
                            <div>
                                <button onClick={() => setCustomTip("5")} className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 rounded"> Add $5</button>
                            </div>

                            <div>
                                <button onClick={() => setCustomTip("10")} className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 rounded">Add $10</button>
                            </div>

                            <div className='flex items-center gap-5'>
                                <p className='font-medium text-xl'>Custom Tip</p>
                                <input
                                    type="text"
                                    value={customTip}
                                    onChange={handleCustomTipChange}
                                    className="border border-gray-300 rounded p-2 outline-none"
                                />
                            </div>
                        </div>

                        <div className='text-end'>
                            <button onClick={() => navigate('/customer-profile')} className='mr-16 font-medium'>No Thanks</button>

                            <button
                                className="bg-blue-500 text-white text-xl py-2 px-20 hover:bg-blue-600 font-semibold rounded"
                                onClick={handleTipSubmission}
                            >
                                Send Tip
                            </button>
                        </div>

                    </div>
                    <div className='col-span-1'>
                        <FeedbackTipProjectDetails />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Tip;