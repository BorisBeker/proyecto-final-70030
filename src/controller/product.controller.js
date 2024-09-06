import { productDBManager } from '../managers/productDBManager.js';

const ProductService = new productDBManager();

export class ProductController {
    static async getAllProducts(req, res) {
        try {
            const result = await ProductService.getAllProducts(req.query);
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    static async getProductByID(req, res) {
        try {
            const result = await ProductService.getProductByID(req.params.pid);
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

    static async createProduct(req, res) {
        try {
            const result = await ProductService.createProduct(req.body);
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

    static async updateProduct(req, res) {
        try {
            const result = await ProductService.updateProduct(req.params.pid, req.body);
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

    static async deleteProduct(req, res) {
        try {
            const result = await ProductService.deleteProduct(req.params.pid);
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
}