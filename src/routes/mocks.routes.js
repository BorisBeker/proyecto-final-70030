import { Router } from 'express';
import { generateMockUsers, generateMockProducts } from '../controller/mocking.controller.js';

const router = Router();

router.get('/users/:n', async (req, res) => {
    const count = parseInt(req.params.n);
    if (isNaN(count) || count <= 0) {
        return res.status(400).json({ error: 'Invalid number of users' });
    }
    try {
        const users = await generateMockUsers(count);
        res.json({ message: `${count} users created`, users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/products/:n', async (req, res) => {
    const count = parseInt(req.params.n);
    if (isNaN(count) || count <= 0) {
        return res.status(400).json({ error: 'Invalid number of products' });
    }
    try {
        const products = await generateMockProducts(count);
        res.json({ message: `${count} products created`, products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;