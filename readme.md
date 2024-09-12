# Sistema de Gestión de Carrito de Compras

Este proyecto implementa un sistema de gestión de carrito de compras utilizando Node.js, Express y MongoDB (con Mongoose). Permite a los usuarios realizar operaciones como agregar productos al carrito, actualizar cantidades, eliminar productos y obtener información detallada del carrito y de los productos.

Se agregó registro y autenticación de usuarios, junto con la finalización de una compra por parte de los mismos.

# Uso
## Ruta Testeada
POST /api/auth/register

Permite registrar un usuario, ya sea `user` o `admin`.

El body debe estar estructurado de la siguiente manera:

~~~
{
    "first_name": "nombre",
    "last_name": "apellido",
    "email": "ejample@mail.com",
    "role": "user",
    "age": "21",
    "password": "123"
}
~~~

O

~~~
{
    "first_name": "nombre",
    "last_name": "apellido",
    "email": "example@email.com",
    "role": "admin",
    "age": "21",
    "password": "123"
}
~~~

POST /api/login

Permite loguearte con el email y la contraseña que pusiste anteriormente en el registro.

El body debe estar estructurado de la siguiente manera:

~~~
{
    "email": "example@email.com",
    "password": "123"
}
~~~

GET /api/products

Muestra todos los productos.

POST /api/cart

Crea un carrito, dependiendo de lo que especifiques en el body, tendrás un carrito vacío o no.

Ejemplo:

**Carrito vacío**
~~~
{
    "email": "example@email.com"
}
~~~

**Carrito con un producto**
~~~
{
    "email": "example@email.com",
    "products": [
        {
            "product": "example_id",
            "quantity": 2
        }
    ]
}
~~~

GET /api/cart/:cid **En ":cid" va el ID del carrito**

Muestra el carrito al que le corresponda el ID.

POST /api/cart/:cid/product/:pid **En ":pid" va el ID del producto que deseas agregar**

Agrega un producto al carrito.

POST /api/cart/:cid/purchase

Realiza la compra y muestra el ticket, ademas de descontar el stock a los productos.


**SOLO PARA ADMIN**

POST /api/products

Agrega productos a la base de datos.

El body debe estar estructurado de la siguiente manera:

~~~
{
    "title": "Nombre de nuevo producto",
    "description": "Soy un nuevo producto",
    "code": "9014",
    "price": 800,
    "stock": 200,
    "category": "examplecategory"
}
~~~

GET /api/users

Muestra todos los usuarios registrados en la base de datos.

GET /api/users/:id

Muestra al usuario con el ID especificado.

DELETE /api/users/:id

Elimina al usuario con el ID especificado.

PUT /api/users/:id

Modifica al usuario con el ID especificado.

Ejemplo de como debe estar estructurado el body:

~~~
{
    "first_name": "nombre2"
}
~~~