// 1. Nos conectamos al socket del servidor
const socket = io();

// 2. Escuchamos el evento 'updateServices' del backend
socket.on('updateServices', (services) => {
    // Buscamos la etiqueta <ul> en el HTML
    const servicesList = document.getElementById('services-list');

    if (servicesList) {
        // Vaciamos la lista actual en la pantalla
        servicesList.innerHTML = '';

        // Iniciamos el ciclo: recorremos los servicios nuevos
        services.forEach(service => {
            const li = document.createElement('li');
            
            // Inyectamos los datos en el HTML
            li.innerHTML = `
                <strong>${service.name}</strong> (${service.category}) <br>
                Descripción: ${service.description} <br>
                Duración: ${service.duration} min | Precio: $${service.price} <br>
                Disponibilidad: ${service.available}
            `;
            servicesList.appendChild(li);
        });
        
    }
});

// 3. Emitimos el evento al servidor (AFUERA DEL CICLO, se envía una sola vez)
socket.emit('client_ready', { message: 'El cliente está listo y escuchando el DOM' });