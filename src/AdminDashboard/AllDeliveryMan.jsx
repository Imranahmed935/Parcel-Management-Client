import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllDeliveryMan = () => {
    const axiosSecure =useAxiosSecure()
    const {data =[]}=useQuery({
        queryKey:['deliveryman'],
        queryFn:async ()=>{
          const res = axiosSecure.get('/user/deliveryman')
          return res.data
            
        }
    })
    return (
        <div>
            <h1>this is all delivery man page{data.length}</h1>
        </div>
    );
};

export default AllDeliveryMan;