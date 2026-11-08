import BookingsDao from '../dao/bookings.dao.js';

const dao = new BookingsDao();

export default class BookingsRepository {
    async getBookings(query = {}) {
        return await dao.getBookings(query);
    }
    async create(bookingData) {
        return await dao.create(bookingData);
    }

    async getById(id) {
        return await dao.getById(id);
    }

    async update(id, updateData) {
        return await dao.update(id, updateData);
    }
}