import { Button } from '@/components/ui/button';
import useAuth from '@/Hooks/useAuth';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {handleSocialLogin}= useAuth()
    const axiosPublic  = useAxiosPublic()
    const navigate = useNavigate()
    const handleGoogle =()=>{
        handleSocialLogin()
        .then((result)=>{
            const user = {
                email:result.user?.email,
                name:result.user?.displayName,
                photo:result.user?.photoURL,
                phone:'017348904500',
                role:'user'
              }
              axiosPublic.post('/users',user)
              .then((res)=>{
                console.log(res.data)
                navigate('/')
              })
        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    return (
        <div>
            <div onClick={handleGoogle} className='flex justify-center items-center gap-4 rounded-full border-blue-500 w-full border  py-2 '>
            <FaGoogle className='text-blue-600'/>
            <button>SignUp With Google</button>
        </div>
        </div>
    );
};

export default SocialLogin;