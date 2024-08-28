
// const axios = require('axios');
// const { default: user } = require('../model/user.js');




// /controllers/stripeController.js

//  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a Stripe customer and subscription
export const createSubscription = async (req, res) => {
    const { email, paymentMethodId, planId } = req.body;
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


    try {
        // Create customer
        const customer = await stripe.customers.create({
            email,
            payment_method: paymentMethodId,
            invoice_settings: { default_payment_method: paymentMethodId },
        });

        // Create subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: planId }],  // planId corresponds to the price in Stripe
            expand: ['latest_invoice.payment_intent'],
        });

        res.status(200).json({
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






// import user from '../model/user.js';


// export const createSubscription = async (req, res) => {
//     const userId = req.user.id;  
//     const { planId, paymentMethodToken } = req.body;  
//     if (!planId || !paymentMethodToken) {
//         return res.status(400).json({ message: 'Plan ID and Payment Method are required' });
//     }

//     try {
//         // Fetch user from the database
//         const user = await user.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Step 1: Create a customer in SubPaisa if not already created
//         let customerId = user.subpaisaCustomerId;
//         if (!customerId) {
//             const customerResponse = await axios.post(`${process.env.SUBPASA_API_BASE_URL}/customers`, {
//                 email: user.email,
//                 name: user.name,
//                 payment_method: paymentMethodToken,  // Assuming token represents payment method
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${process.env.SUBPASA_API_KEY}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             customerId = customerResponse.data.id;  
//             user.subpaisaCustomerId = customerId;
//             await user.save();
//         }

//         const subscriptionResponse = await axios.post(`${process.env.SUBPASA_API_BASE_URL}/subscriptions`, {
//             customer_id: customerId,
//             plan_id: planId,
//             payment_method: paymentMethodToken,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.SUBPASA_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         const subscriptionData = subscriptionResponse.data;
//         const subscriptionId = subscriptionData.id;  
//         const status = subscriptionData.status;      

//         // Step 3: Save subscription details to the database
//         const subscription = new Subscription({
//             user: userId,
//             subpaisaSubscriptionId: subscriptionId,
//             planId: planId,
//             status: status,
//         });

//         await subscription.save();

//         res.status(201).json({
//             message: 'Subscription created successfully',
//             subscriptionId: subscriptionId,
//             status: status,
//         });

//     } catch (error) {
//         console.error('Error creating subscription:', error.response ? error.response.data : error.message);
//         res.status(500).json({
//             message: 'Failed to create subscription',
//             error: error.response ? error.response.data : error.message,
//         });
//     }
// };
