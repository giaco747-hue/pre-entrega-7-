import MessagesService from '../services/messages.service.js';

const messagesService = new MessagesService();

export const getMessages = async (req, res) => {
    try {
        const messages = await messagesService.getMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
};

export const createMessage = async (req, res) => {
    try {
        const { user, message } = req.body;
        if (!user || !message) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        const newMessage = await messagesService.createMessage(req.body);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el mensaje' });
    }
};