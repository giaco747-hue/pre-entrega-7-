import { MessageModel } from '../models/message.model.js';

export default class MessagesDao {
    async getAll() {
        return await MessageModel.find();
    }
    async create(messageData) {
        return await MessageModel.create(messageData);
    }
}