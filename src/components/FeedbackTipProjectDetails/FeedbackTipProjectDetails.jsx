import React from 'react';

const FeedbackTipProjectDetails = () => {
    return (
        <>
            <div className='bg-[#F2F9FF] p-5'>
                <h2 className='font-semibold text-2xl'>Project Details</h2>

                <div className='border bg-white rounded-md px-2 py-3 mt-3'>
                    <div className='flex'>
                        <img className='border w-[120px] object-cover' src="" alt="" />

                        <div>
                            <h4>Door Hanger</h4>
                            <p>Status</p>
                        </div>
                    </div>
                </div>

                <div className='space-y-2 mt-5'>
                    <div className='flex justify-between items-center'>
                        <h6>Project by</h6>
                        <p>Client Name</p>
                    </div>

                    <div className='flex justify-between items-center'>
                        <h6>Quantity</h6>
                        <p>1</p>
                    </div>

                    <div className='flex justify-between items-center'>
                        <h6>Duration</h6>
                        <p>2 Days</p>
                    </div>

                    <div className='flex justify-between items-center'>
                        <h6>Total Price</h6>
                        <p>$40</p>
                    </div>
                </div>
            </div>

            <p className='text-center mt-5 font-medium text-xl'>Back to the project page</p>
        </>
    );
};

export default FeedbackTipProjectDetails;