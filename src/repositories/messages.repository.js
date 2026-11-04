import MessagesDao from '../dao/messages.dao.js';

export default class MessagesRepository {
    constructor() {
        this.dao = new MessagesDao();
    }
    async getMessages() {
        return await this.dao.getAll();
    }
    async createMessage(messageData) {
        return await this.dao.create(messageData);
    }
}