import React from 'react';
import LoadingGif from '../../assets/loading.gif';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <img className='w-60 h-60 object-cover' src={LoadingGif} alt="Loading ..." />
        </div>
    );
};

export default Loading;