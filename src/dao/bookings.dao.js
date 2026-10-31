import { BookingModel } from '../models/booking.model.js';

export default class BookingsDao {
    async create(bookingData) {
        return await BookingModel.create(bookingData);
    }

    async getById(id) {
        return await BookingModel.findById(id).populate('services.service');
    }

    async update(id, updateData) {
        return await BookingModel.findByIdAndUpdate(id, updateData, { new: true });
    }
}