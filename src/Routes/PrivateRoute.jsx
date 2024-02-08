import Loading from '@/components/Loading/Loading';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { email, isLoading } = useSelector((state) => state.userSlice);
    const location = useLocation();

    if(isLoading) {
        return <Loading />
    }

    if (email) {
        return children;
    }

    return <Navigate to='/customer-login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;