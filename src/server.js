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
app.set('socketio', io);

io.on('connection', (socket) => {
    console.log('🟢 Nuevo cliente conectado por Socket.io:', socket.id);

    // Escuchamos el evento que emitirá el navegador
    socket.on('client_ready', (data) => {
        console.log('Mensaje del cliente:', data.message);
    });
});