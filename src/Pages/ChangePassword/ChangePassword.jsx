import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../Shared/Container';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');

    const onSubmit = ({ currentEmail }) => {
        setMessage("");
        sendPasswordResetEmail(auth, currentEmail)
            .then(() => {
                setMessage("A verification link has been sent to your email address! You can change your password by clicking on the link from the email. If you did not receive the email, be sure to check your email's spam/junk folder.")
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className='font-montserrat my-10 w-3/5 mx-auto'>
            <Container>
                <div className='shadow'>

                    <div className='bg-[#1C91E4] px-5 py-4'>
                        <h4 className='text-white font-medium'>Change Password</h4>
                    </div>

                    <div className='p-5'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Current Password Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="currentEmail" className="block mb-1 ml-2 text-base font-medium">Your email address * <br /> <span className='text-xs text-gray-500'>The email address with which the account was opened</span></label>
                                <div className="flex items-center border border-gray-300">
                                    <input
                                        type="email"
                                        id="currentEmail"
                                        placeholder='Enter your email address'
                                        {...register('currentEmail', { required: 'Current Email is required' })}
                                        className="w-full ml-2 py-2 text-sm outline-none"
                                    />
                                </div>
                                {errors.currentEmail && <span className="text-red-500 text-xs mt-1">{errors.currentEmail.message}</span>}
                            </div>

                            {
                                message && <p className='ml-2 text-sm font-medium text-gray-500 my-5'>{message}</p>
                            }

                            {/* Submit Button */}
                            <div className='text-center'>
                                <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-semibold w-2/4 mt-3 py-2 rounded-full'>Send password reset link</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ChangePassword;
