import Header from '@/Pages/Shared/Header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Auth = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default Auth;