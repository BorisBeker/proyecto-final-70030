const socket = io();

socket.on("getProducts", (data) => {
    const products = document.getElementById("products_list");
    console.log("getProducts", data)
    products.innerHTML = ""
    data.forEach(product => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.price}</p>
            <p>${product.description}</p>
        `;
        products.appendChild(div);
        console.log("todo cargado")
    })
});

socket.on('connect', () => {
    console.log(`Conectado al servidor con ID: ${socket.id}`);
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});