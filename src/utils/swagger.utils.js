import __dirname from "../../dirname.js"

const opts = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Ecomerce',
            version: '1.0.0',
            description: 'Es un ecomerce utilizado como ejercicio',
        },
    },
    apis: [`${__dirname}/src/docs/*.yaml`],
};

export default opts
