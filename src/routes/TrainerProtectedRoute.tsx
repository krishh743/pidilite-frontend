import React from 'react'
import { Navigate } from 'react-router-dom';

const TrainerProtectedRoute = ({ children }:any) => {

    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    if (token && type === '2') {
        return children;
    } else {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default TrainerProtectedRoute