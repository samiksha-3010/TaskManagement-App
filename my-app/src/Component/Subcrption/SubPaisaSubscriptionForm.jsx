



import React, { useState } from 'react';
import axios from 'axios';
// Import SubPaisa SDK components if available
// import { SubPaisaPaymentElement } from 'subpaisa-sdk';  // Hypothetical import

const SubPaisaSubscriptionForm = () => {
    const [planId, setPlanId] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Step 1: Tokenize payment details using SubPaisa SDK or send to backend
            // If using SubPaisa's SDK, tokenization is done client-side
            // For this example, we'll assume a backend endpoint handles tokenization
            const tokenResponse = await axios.post('http://localhost:8000/create-subscription', {
                cardNumber: paymentDetails.cardNumber,
                expiryMonth: paymentDetails.expiryMonth,
                expiryYear: paymentDetails.expiryYear,
                cvv: paymentDetails.cvv,
            });

            const paymentMethodToken = tokenResponse.data.paymentMethodId;

            // Step 2: Create subscription
            const subscriptionResponse = await axios.post('/api/subpaisa/create-subscription', {
                planId: planId,
                paymentMethodToken: paymentMethodToken,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Adjust as per your auth
                },
            });

            setSuccess(subscriptionResponse.data.message);
        } catch (err) {
            console.error('Subscription Error:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Subscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Plan ID:</label> 
                    <input
                        type="text"
                        value={planId}
                        onChange={(e) => setPlanId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Card Number:</label> 
                    <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handleInputChange}
                        required
                    /> <br/>
                </div>
                <div>
                    <label>Expiry Month:</label>
                    <input
                        type="text"
                        name="expiryMonth"
                        value={paymentDetails.expiryMonth}
                        onChange={handleInputChange}
                        required
                    /> <br/>
                </div>
                <div>
                    <label>Expiry Year:</label>
                    <input
                        type="text"
                        name="expiryYear"
                        value={paymentDetails.expiryYear}
                        onChange={handleInputChange}
                        required
                    /> <br/>
                </div>
                <div>
                    <label>CVV:</label>
                    <input 
                        type="text"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handleInputChange}
                        required
                    /> <br/>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Subscribe'}
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
            </form>
        </div>
    );
};

export default SubPaisaSubscriptionForm;


