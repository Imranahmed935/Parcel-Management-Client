import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: roleUser, isLoading } = useQuery({
        queryKey: ['roleValue', user?.email],
        queryFn: async () => {
            if (!user?.email) return null; 
            const { data } = await axiosSecure.get(`/users/role/${user.email}`);
            return data?.role || null; 
        },
        enabled: !!user?.email,
    });

    return [roleUser, isLoading];
};

export default useRole;
