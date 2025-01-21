import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY)

const Payment = () => {
    
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