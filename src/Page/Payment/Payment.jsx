import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY)

const Payment = () => {
    const {id} = useParams();
    console.log(id)
    
    return (
        <div>
            <div>
                <h1 className='text-2xl font-fold py-4'>Payment card</h1>
            </div>
            <Elements stripe={stripePromise}>
                    <CheckoutForm/>
            </Elements>
        </div>
    );
};

export default Payment;