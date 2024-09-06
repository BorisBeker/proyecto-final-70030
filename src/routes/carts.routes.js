import { Router } from 'express';
import { CartController } from '../controller/cart.controller.js';
import { cartDto } from '../dto/cart.dto.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.get('/:cid', CartController.getCartByID);

router.post('/', validate(cartDto), CartController.createCart);

router.post('/:cid/product/:pid', CartController.addProductToCart);

router.post('/:cid/purchase', CartController.purchaseCart);

router.delete('/:cid/product/:pid', CartController.deleteProductFromCart);

router.put('/:cid', CartController.updateAllProducts);

router.put('/:cid/product/:pid', CartController.updateProductInCart);

router.delete('/:cid', CartController.deleteAllProducts);

export default router;