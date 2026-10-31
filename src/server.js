import app from './app.js';
import { connectDB } from './config/env.config.js'; // conexión importada mongodb

const PORT = process.env.PORT || 8080;

connectDB(); 

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});