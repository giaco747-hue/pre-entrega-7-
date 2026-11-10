import BookingsService from '../services/bookings.service.js';

const bookingsService = new BookingsService();

export const createBooking = async (req, res) => {
    try {
        const { clientName, date } = req.body;
        if (!clientName || !date) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: clientName y date' });
        }
        
        const newBooking = await bookingsService.createBooking(req.body);
        
        // --- INYECCIÓN DE SOCKET.IO: Avisar al frontend que hay una nueva reserva ---
        const io = req.app.get('socketio');
        const updatedBookings = await bookingsService.getBookings({});
        io.emit('updateBookings', updatedBookings);
        // --------------------------------------------------------------------------
        
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const id = req.params.bid;
        const booking = await bookingsService.getBookingById(id);
        
        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la reserva' });
    }
};

export const addServiceToBooking = async (req, res) => {
    try {
       const bookingId = req.params.bid;
        const serviceId = req.params.sid;

        const updatedBooking = await bookingsService.addServiceToBooking(bookingId, serviceId);
        
        // --- INYECCIÓN DE SOCKET.IO: Avisar al frontend que la reserva cambió ---
        const io = req.app.get('socketio');
        const updatedBookings = await bookingsService.getBookings({});
        io.emit('updateBookings', updatedBookings);
        // ------------------------------------------------------------------------
        
        res.status(200).json(updatedBooking);
        
    } catch (error) {
        if (error.message === 'SERVICE_NOT_FOUND') {
            return res.status(404).json({ error: 'El servicio que intentas agregar no existe' });
        }
        if (error.message === 'BOOKING_NOT_FOUND') {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(500).json({ error: 'Error al agregar el servicio a la reserva' });
    }
};