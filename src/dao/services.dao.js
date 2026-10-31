import { ServiceModel } from '../models/service.model.js';

export default class ServicesDao {
    async getAll() {
        return await ServiceModel.find();
    }

    async getById(id) {
        return await ServiceModel.findById(id);
    }

    async create(serviceData) {
        return await ServiceModel.create(serviceData);
    }

    async update(id, updateData) {
        return await ServiceModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(id) {
        return await ServiceModel.findByIdAndDelete(id);
    }
}