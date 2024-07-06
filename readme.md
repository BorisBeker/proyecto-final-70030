# Sistema de Gestión de Carrito de Compras

Este proyecto implementa un sistema de gestión de carrito de compras utilizando Node.js, Express y MongoDB (con Mongoose). Permite a los usuarios realizar operaciones como agregar productos al carrito, actualizar cantidades, eliminar productos y obtener información detallada del carrito y de los productos.

# Uso
## Peticiones y Rutas
GET /api/cart/:cid

Recupera todos los productos en el carrito identificado por :cid.

POST /api/cart/

Crea un nuevo carrito de compras vacío.

POST /api/cart/:cid/product/:pid

Agrega un producto identificado por :pid al carrito identificado por :cid.

DELETE /api/cart/:cid/product/:pid

Elimina un producto identificado por :pid del carrito identificado por :cid.

PUT /api/cart/:cid/product/:pid

Actualiza la cantidad de un producto identificado por :pid en el carrito identificado por :cid.

## Ejemplos de Uso
GET /api/cart/6689c0cfcfe4c79b580adb3e
```
{
    "status": "success",
    "payload": {
        "_id": "6689c0cfcfe4c79b580adb3e",
        "products": []
    }
}
```

POST /api/cart/6689c0cfcfe4c79b580adb3e/product/6689c117cfe4c79b580adb40

```
{
    "status": "success",
    "payload": {
        "_id": "6689c0cfcfe4c79b580adb3e",
        "products": [
            {
                "product": "6689c117cfe4c79b580adb40",
                "quantity": 1
            }
        ]
    }
}

```