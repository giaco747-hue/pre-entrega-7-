import ServicesService from '../services/services.service.js';
import BookingsService from '../services/bookings.service.js';

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

export const renderServices = async (req, res) => {
    try {
        // Le pasamos req.query (o un objeto vacío) para que el service no falle al buscar 'category'
        const services = await servicesService.getServices(req.query || {});
        
        const plainServices = JSON.parse(JSON.stringify(services));
        
        res.render('services', { services: plainServices });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la vista de servicios');
    }
};

export const renderAvailability = async (req, res) => {
    try {
        const bookings = await bookingsService.getBookings(req.query || {});
        const plainBookings = JSON.parse(JSON.stringify(bookings));
        
        res.render('availability', { bookings: plainBookings });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la vista de reservas');
    }
};