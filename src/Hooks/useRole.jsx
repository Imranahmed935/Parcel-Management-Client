import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const {user}=  useAuth()
    const {data:roleUser, isLoading}= useQuery({
         queryKey:['roleValue', user?.email],
         queryFn:async()=>{
            const {data} = await axiosSecure.get(`/users/role/${user?.email}`)
            return data.role;
         }

    })
    return [roleUser, isLoading]
};

export default useRole;