import ServicesRepository from '../repositories/services.repository.js';

const repository = new ServicesRepository();

export default class ServicesService {
    async getServices(query) {
        let services = await repository.getAll();
        
        // Reglas de negocio y filtros
        if (query.category) {
            services = services.filter(s => s.category === query.category);
        }
        if (query.available) {
            const isAvailable = query.available === 'true';
            services = services.filter(s => s.available === isAvailable);
        }
        
        return services;
    }

    async getServiceById(id) {
        return await repository.getById(id);
    }

    async createService(serviceData) {
        // La validación de campos obligatorios la dejaremos en el controller
        return await repository.create(serviceData);
    }

    async updateService(id, updateData) {
        return await repository.update(id, updateData);
    }

    async deleteService(id) {
        return await repository.delete(id);
    }
}