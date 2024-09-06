import { Router } from 'express';
import { ProductController } from '../controller/product.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { productDto } from '../dto/product.dto.js';
import { authenticate, authorizations } from '../middlewares/authorization.middleware.js';

const router = Router();

router.get('/', ProductController.getAllProducts);

router.get('/:pid', ProductController.getProductByID);

router.post('/', validate(productDto), authenticate("jwt"), authorizations(["admin"]), ProductController.createProduct);

router.put('/:pid', validate(productDto), ProductController.updateProduct);

router.delete('/:pid', ProductController.deleteProduct);

export default router;