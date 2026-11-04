import MessagesRepository from '../repositories/messages.repository.js';

export default class MessagesService {
    constructor() {
        this.repository = new MessagesRepository();
    }
    async getMessages() {
        return await this.repository.getMessages();
    }
    async createMessage(messageData) {
        return await this.repository.createMessage(messageData);
    }
}