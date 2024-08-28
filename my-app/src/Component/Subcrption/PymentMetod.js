import React, { useState } from 'react';
import axios from 'axios';

const PaymentMetod = () => {
    const [email, setEmail] = useState('');
    const [planId, setPlanId] = useState('');  // Your SubPaisa Plan ID
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/create-subscription', {
                email,
                planId,
            });

            setSuccessMessage('Subscription created successfully!');
            setErrorMessage(null);
        } catch (err) {
            setErrorMessage(err.response ? err.response.data.message : err.message);
            setSuccessMessage(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Plan ID"
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
                required
            />
            <button style={{marginTop:"10%"}} type="submit">Subscribe via SubPaisa</button>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default PaymentMetod;