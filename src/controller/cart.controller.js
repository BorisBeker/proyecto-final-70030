import { productDBManager } from '../managers/productDBManager.js';
import { cartDBManager } from '../managers/cartDBManager.js';
import { ticketModel } from '../models/ticket.model.js';
import { userModel } from '../models/user.model.js';

const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

export class CartController {
    static async getCartByID(req, res) {
        try {
            const result = await CartService.getProductsFromCartByID(req.params.cid);
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error.message
            });
        }
    }

    static async createCart(req, res) {
        try {
            const { products } = req.body;
            const cart = await CartService.createCart({ products });
            res.status(201).json(cart);
        } catch (error) {
            res
                .status(500)
                .json({ error: "Error al crear el carrito", details: error.message });
        }
    }

    static async addProductToCart(req, res) {
        try {
            const result = await CartService.addProductByID(req.params.cid, req.params.pid);
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error.message
            });
        }
    }

    static async deleteProductFromCart(req, res) {
        try {
            const result = await CartService.deleteProductByID(req.params.cid, req.params.pid);
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error.message
            });
        }
    }

    static async updateAllProducts(req, res) {
        try {
            const result = await CartService.updateAllProducts(req.params.cid, req.body.products);
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error.message
            });
        }
    }

    static async updateProductInCart(req, res) {
        try {
            const result = await CartService.updateProductByID(req.params.cid, req.params.pid, req.body.quantity);
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error.message
            });
        }
    }

    static async deleteAllProducts(req, res) {
        try {
            const result = await CartService.deleteAllProducts(req.params.cid);
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error.message
            });
        }
    }

    static async purchaseCart(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await CartService.getProductsFromCartByID(cartId);

            if (!cart) {
                return res.status(404).send({ status: 'error', message: 'Carrito no encontrado.' });
            }

            let totalAmount = 0;
            const unavailableProducts = [];

            for (const item of cart.products) {
                const product = await ProductService.getProductByID(item.product);

                if (product.stock >= item.quantity) {
                    // Restar el stock del producto
                    product.stock -= item.quantity;
                    totalAmount += product.price * item.quantity;
                    await product.save();
                } else {
                    unavailableProducts.push(item.product);
                }
            }

            // Crear el ticket si hubo productos disponibles
            if (totalAmount > 0) {
                
                const user = await userModel.findOne({ carts: { $elemMatch: { cart: cartId } } });
                if (!user) {
                    return res.status(404).send({ status: 'error', message: 'Usuario no encontrado.' });
                }
                console.log(user);
                const ticket = new ticketModel({
                    amount: totalAmount,
                    purchaser: user.email
                });
                await ticket.save();
            }

            // Filtrar los productos no comprados
            const remainingProducts = cart.products.filter(item => unavailableProducts.includes(item.product));

            // Actualizar el carrito con los productos restantes
            cart.products = remainingProducts;
            await cart.save();

            res.send({
                status: 'success',
                message: 'Compra finalizada.',
                ticket: totalAmount > 0 ? ticket : null,
                unavailableProducts
            });

        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }
}