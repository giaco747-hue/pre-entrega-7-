import BookingsRepository from '../repositories/bookings.repository.js';
import ServicesRepository from '../repositories/services.repository.js'; // Importamos el repo de servicios para validar

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export default class BookingsService {
    async createBooking(bookingData) {
        return await bookingsRepository.create(bookingData);
    }

    async getBookingById(id) {
        return await bookingsRepository.getById(id);
    }

    async addServiceToBooking(bookingId, serviceId) {
        // 1. Validar que el servicio exista
        const serviceExists = await servicesRepository.getById(serviceId);
        if (!serviceExists) {
            throw new Error('SERVICE_NOT_FOUND');
        }

        // 2. Validar que la reserva exista
        const booking = await bookingsRepository.getById(bookingId);
        if (!booking) {
            throw new Error('BOOKING_NOT_FOUND');
        }

        // 3. REGLA DE NEGOCIO: Buscar si el servicio ya está en la reserva
        const existingServiceIndex = booking.services.findIndex(s => s.service === serviceId);

        if (existingServiceIndex !== -1) {
            // Si ya existe, incrementamos la cantidad (quantity)
            booking.services[existingServiceIndex].quantity += 1;
        } else {
            // Si no existe, lo agregamos con quantity en 1
            booking.services.push({ service: serviceId, quantity: 1 });
        }

        // 4. Guardar la reserva actualizada
        return await bookingsRepository.update(bookingId, booking);
    }
}