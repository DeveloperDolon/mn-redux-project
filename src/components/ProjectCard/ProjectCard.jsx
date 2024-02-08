import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ singleProject }) => {
    const [timeDifference, setTimeDifference] = useState(calculateTimeDifference());
    const navigate = useNavigate();

    useEffect(() => {
        // Update the time difference every second (you can adjust the interval)
        const interval = setInterval(() => {
            setTimeDifference(calculateTimeDifference());
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    function calculateTimeDifference() {
        // Get the updatedAt date from the props
        const updatedAtDate = new Date(singleProject?.updatedAt);

        // Get the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const differenceInMillis = currentDate - updatedAtDate;

        // Calculate the difference in days, hours, minutes, and seconds
        const days = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
        const hours = Math.floor((differenceInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((differenceInMillis % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((differenceInMillis % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    // Format the time difference
    const formattedTimeDifference =
        singleProject?.status === 'completed'
            ? new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
              }).format(new Date(singleProject?.updatedAt))
            : timeDifference.days > 0
            ? `${timeDifference.days}d ${timeDifference.hours}h ${timeDifference.minutes}m ${timeDifference.seconds}s`
            : timeDifference.hours > 0
            ? `${timeDifference.hours}h ${timeDifference.minutes}m ${timeDifference.seconds}s`
            : timeDifference.minutes > 0
            ? `${timeDifference.minutes}m ${timeDifference.seconds}s`
            : `${timeDifference.seconds}s`;

    return (
        <div onClick={() => navigate(`/project-page/${singleProject?.id}`)} className='border p-3 rounded cursor-pointer'>
            <div className='flex gap-3'>
                <img className='w-24 h-20 border object-cover' src={singleProject?.categoryImage} alt="" />
                <div>
                    <p className='text-base font-medium'>{singleProject?.category}</p>
                    <h4 className='text-xl font-semibold'>${singleProject?.amount}</h4>
                </div>
            </div>
            <div className='flex justify-between items-center mt-2'>
                {/* Display the formatted time difference */}
                <span className='text-base font-medium'>{formattedTimeDifference} {singleProject?.status === 'completed' ? '' : 'late'}</span>
                <h4
                    className={`text-base capitalize font-semibold ${
                        singleProject?.status === 'revision'
                            ? 'text-[#fc6908]'
                            : singleProject?.status === 'ongoing'
                            ? 'text-[#078510]'
                            : singleProject?.status === 'waiting'
                            ? 'text-[#9d0e66]'
                            : singleProject?.status === 'delivered'
                            ? 'text-[#0e97a0]'
                            : singleProject?.status === 'completed'
                            ? 'text-[#1881cc]'
                            : ''
                    }`}
                >
                    {singleProject?.status}
                </h4>
            </div>
        </div>
    );
};

export default ProjectCard;
