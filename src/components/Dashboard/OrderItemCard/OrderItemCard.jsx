import React, { useEffect, useState } from 'react';
import UserImg from '../../../assets/user.png';
import { useNavigate } from 'react-router-dom';

const OrderItemCard = ({ order }) => {

    console.log(order);

    const [elapsedTime, setElapsedTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (order?.updatedAt) {
            const updatedAtDate = new Date(order.updatedAt);
            const currentDate = new Date();
            const diffInMilliseconds = currentDate - updatedAtDate;

            // Calculate days, hours, and minutes from milliseconds
            const days = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));
            const hours = Math.floor((diffInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            const minutes = Math.floor((diffInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));

            // Construct the elapsed time string
            let elapsedTimeString = '';
            if (days > 0) {
                elapsedTimeString += `${days}d `;
            }
            if (hours > 0) {
                elapsedTimeString += `${hours}h `;
            }
            if (minutes > 0) {
                elapsedTimeString += `${minutes}m`;
            }

            setElapsedTime(elapsedTimeString.trim());
        }
    }, [order]);

    return (
        <div className='flex justify-between items-center shadow border mb-5 p-3'>

            <div className='flex items-center gap-5'>
                <img className='w-20' src={order?.categoryImage} alt="" />
                <img className='w-8 h-8 rounded-full' src={order?.customer?.image || UserImg} alt='Client' />
                <h4 className='text-sm font-semibold'>{order?.customer?.name}</h4>
            </div>

            <div className='text-center'>
                <span className='text-sm'>Price</span>
                <h4 className='text-sm font-semibold'>${order?.amount}</h4>
            </div>

            <div className='text-center'>
                <span className='text-sm'>Time</span>
                <h4 className='text-sm font-semibold'>{elapsedTime}</h4>
            </div>

            <div className='text-center'>
                <span className='text-sm'>Status</span>
                <h4 className={`text-sm font-semibold capitalize ${order?.status === 'revision' ? 'text-red-500' : order?.status === 'ongoing' ? 'text-green-500' : order?.status === 'waiting' ? 'text-purple-500' : order?.status === 'delivered' ? 'text-teal-500' : order?.status === 'completed' ? 'text-green-500' : order?.status === 'canceled' ? 'text-red-600' : ''}`}>
                    {order?.status}
                </h4>
            </div>

            <button onClick={() => navigate(`/project-page/${order?.id}`)} className='text-sm text-webPrimary font-semibold'>View</button>
        </div>
    );
};

export default OrderItemCard;