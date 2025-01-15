import { AuthContext } from '@/Provider/AuthProvider';
import React, { useContext } from 'react';

const useAuth = () => {
   const auth = useContext(AuthContext)
   return auth
};

export default useAuth;