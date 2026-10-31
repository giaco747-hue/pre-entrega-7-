import ServicesService from '../services/services.service.js';

const servicesService = new ServicesService();

export const getServices = async (req, res) => {
    try {
        // Le pasamos el req.query al service para que él aplique los filtros
        const services = await servicesService.getServices(req.query);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const id = req.params.sid;
        const service = await servicesService.getServiceById(id);
        
        if (!service) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Error interno' });
    }
};

export const createService = async (req, res) => {
    try {
        const { name, description, duration, price, category, available } = req.body;
        
        if (!name || !description || duration === undefined || price === undefined || !category || available === undefined) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios. Se requiere: name, description, duration, price, category y available.'
            });
        }
        
        const createdService = await servicesService.createService(req.body);
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
};

export const updateService = async (req, res) => {
    try {
        const id = req.params.sid;
        const updatedService = await servicesService.updateService(id, req.body);
        
        if (!updatedService) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
};

export const deleteService = async (req, res) => {
    try {
        const id = req.params.sid;
        const deletedService = await servicesService.deleteService(id);
        
        if (!deletedService) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json({ message: 'Servicio eliminado correctamente', service: deletedService });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
};