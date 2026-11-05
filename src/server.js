import app from './app.js';
import { connectDB } from './config/env.config.js'; // conexión importada mongodb
import { Server } from 'socket.io';

const PORT = process.env.PORT || 8080;

connectDB();

// Guardamos el servidor que levanta Express en una constante
const httpServer = app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

// Le pasamos ese servidor a Socket.io
export const io = new Server(httpServer);

// Escuchamos cuando un cliente (el navegador) se conecte
io.on('connection', (socket) => {
    console.log('🟢 Nuevo cliente conectado por Socket.io:', socket.id);
});