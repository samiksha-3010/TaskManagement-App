// models/Subscription.js

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subpaisaSubscriptionId: { type: String, required: true },
    planId: { type: String, required: true },  // The plan chosen by the user
    status: { type: String, required: true },  // e.g., active, pending, canceled
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },  // Optional, for when the subscription ends
    // Add other relevant fields
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
