import ServicesDao from '../dao/services.dao.js';

const dao = new ServicesDao();

export default class ServicesRepository {
    async getAll() {
        return await dao.getAll();
    }

    async getById(id) {
        return await dao.getById(id);
    }

    async create(serviceData) {
        return await dao.create(serviceData);
    }

    async update(id, updateData) {
        return await dao.update(id, updateData);
    }

    async delete(id) {
        return await dao.delete(id);
    }
}