import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL:'https://pms-server-one.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;