// Nos conectamos al socket del servidor
const socket = io();

// Escuchamos el evento 'updateServices' que crearemos en el backend
socket.on('updateServices', (services) => {
    // Buscamos la lista <ul> que está en nuestro services.handlebars
    const servicesList = document.getElementById('services-list');
    
    if (servicesList) {
        // Vaciamos la lista actual
        servicesList.innerHTML = '';
        
        // Recorremos los servicios nuevos y los agregamos al HTML
        services.forEach(service => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${service.name}</strong> (${service.category}) <br>
                Descripción: ${service.description} <br>
                Duración: ${service.duration} min | Precio: $${service.price} <br>
                Disponibilidad: ${service.availability}
            `;
            servicesList.appendChild(li);
        });
    }
});