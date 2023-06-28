import { Router } from 'express';
import CartsManager from '../manager/CartsManager.js';
import __dirname from '../utils.js';

const router = Router();
const manager = new CartsManager(`${__dirname}/files/carts.json`);

router.post('/', async (req, res) => {
   manager.addNewCart()
   res.send({ status: 'success' })
});

router.get('/:cid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const cart = await manager.getCart(cartId)
    res.send({ status: 'success', payload: cart })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);
    const cart = await manager.addProduct(cartId, productId)
    res.send({ status: 'success', payload: cart })
})

export default router