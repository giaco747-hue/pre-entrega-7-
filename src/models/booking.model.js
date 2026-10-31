import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending' },
    services: [{
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
}, {
    timestamps: true
});

export const BookingModel = mongoose.model('Booking', bookingSchema);