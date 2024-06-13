// components/protected/AdminProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const AdminProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem('token');
  const type = localStorage.getItem('type');

  if (token && type === '1') {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace={true} />;
  }
}

export default AdminProtectedRoute;


