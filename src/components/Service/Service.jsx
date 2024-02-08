import React from 'react';

const Service = () => {
    return (
        <div className='md:grid grid-cols-5 gap-3'>
            <div className='bg-webPrimary mb-5 md:mb-0 flex justify-center items-center py-6 text-white rounded-lg'>
                <div className='text-center'>
                    <h4 className='font-bold text-3xl'>7+</h4>
                    <h6 className='font-semibold'>Years of Experience</h6>
                    <p className='font-light'>Graphic Design</p>
                </div>
            </div>
            <div className='bg-webPrimary mb-5 md:mb-0 flex justify-center items-center py-6 text-white rounded-lg'>
                <div className='text-center'>
                    <h6 className='font-semibold'>Customer</h6>
                    <h4 className='font-bold text-3xl'>Satisfication</h4>
                    <p className='font-light'>Is Our Top Priority</p>
                </div>
            </div>
            <div className='bg-webPrimary mb-5 md:mb-0 flex justify-center items-center py-6 text-white rounded-lg'>
                <div className='text-center'>
                    <h4 className='font-bold text-3xl'>100%</h4>
                    <h6 className='font-semibold text-xl'>Satisfication</h6>
                    <p className='font-light'>Guaranteed</p>
                </div>
            </div>
            <div className='bg-webPrimary mb-5 md:mb-0 flex justify-center items-center py-6 text-white rounded-lg'>
                <div className='text-center'>
                    <h4 className='font-bold text-2xl'>Emergency</h4>
                    <p className='font-light'>Services</p>
                    <h6 className='font-semibold text-xl'>Available</h6>
                </div>
            </div>
            <div className='bg-webPrimary mb-5 md:mb-0 flex justify-center items-center py-6 text-white rounded-lg'>
                <div className='text-center'>
                    <h6 className='font-semibold'>Easy Communication</h6>
                    <h6 className='font-semibold'>Exceptional Service</h6>
                    <h6 className='font-semibold'>Quality Service</h6>
                </div>
            </div>
        </div>
    );
};

export default Service;