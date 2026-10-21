import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/services.json');

export default class ServicesDao {
    async #readData() {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') return [];
            throw error;
        }
    }

    async #writeData(data) {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    }

    // Métodos crudos de acceso a datos sin lógica de negocio
    async getAll() {
        return await this.#readData();
    }

    async getById(id) {
        const services = await this.#readData();
        return services.find(s => s.id === id) || null;
    }

    async create(serviceData) {
        const services = await this.#readData();
        const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
        const newService = { id: newId, ...serviceData };
        services.push(newService);
        await this.#writeData(services);
        return newService;
    }

    async update(id, updateData) {
        const services = await this.#readData();
        const index = services.findIndex(s => s.id === id);
        if (index === -1) return null;
        
        services[index] = { ...services[index], ...updateData, id };
        await this.#writeData(services);
        return services[index];
    }

    async delete(id) {
        const services = await this.#readData();
        const index = services.findIndex(s => s.id === id);
        if (index === -1) return null;
        
        const deletedService = services.splice(index, 1)[0];
        await this.#writeData(services);
        return deletedService;
    }
}