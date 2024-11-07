import { faker } from '@faker-js/faker';
import { userModel } from "../models/user.model.js";
import { productDBManager } from "../managers/productDBManager.js"

const ProductDBManager = new productDBManager();

export const generateMockUsers = async (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const user = new userModel({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 80 }),
            password: faker.internet.password(),
            role: faker.helpers.arrayElement(["admin", "user"]),
            carts: []
        });
        await user.save();
        users.push(user);
    }
    return users;
};

export const generateMockProducts = async (count) => {
    const products = [];
    for (let i = 0; i < count; i++) {
        const productData = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.uuid(),
            price: parseFloat(faker.commerce.price()),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.commerce.department()
        };
        const product = await ProductDBManager.createProduct(productData); 
        products.push(product);
    }
    return products;
};