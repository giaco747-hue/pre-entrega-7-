import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/bookings.json');

export default class BookingsDao {
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

    async create(bookingData) {
        const bookings = await this.#readData();
        const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
        
        // Inicializamos el array de servicios vacío
        const newBooking = { id: newId, ...bookingData, services: [] };
        bookings.push(newBooking);
        await this.#writeData(bookings);
        return newBooking;
    }

    async getById(id) {
        const bookings = await this.#readData();
        return bookings.find(b => b.id === id) || null;
    }

    async update(id, updateData) {
        const bookings = await this.#readData();
        const index = bookings.findIndex(b => b.id === id);
        if (index === -1) return null;
        
        bookings[index] = { ...bookings[index], ...updateData, id };
        await this.#writeData(bookings);
        return bookings[index];
    }
}