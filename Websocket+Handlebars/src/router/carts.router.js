import { Router } from 'express';
import CartsManager from '../manager/CartsManager.js';
import ProductManager from '../manager/ProductManager.js';
import __dirname from '../utils.js';

const router = Router();
const manager = new CartsManager(`${__dirname}/files/carts.json`);
const productManager = new ProductManager(`${__dirname}/files/products.json`)

router.post('/', async (req, res) => {
   const cart = await manager.addNewCart()
   res.send({ status: 'success', payload: cart })
});

router.get('/:cid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const cart = await manager.getCart(cartId)
    if(!cart) {
        return res.status(400).send({ error: `The cart with id: ${cartId}, doesn't exist!` })
    } 
    res.send({ status: 'success', payload: cart })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);
    // verifico si el producto con este id existe!
    const product = await productManager.getProductsById(productId)
    if(!product) {
        return res.status(400).send({ error: `The product with id: ${productId}, doesn't exist!` })
    } 

    const cart = await manager.addProduct(cartId, productId)
    if(!cart) {
        return res.status(400).send({ error: `Can't find cart whith id: ${cartId}` })
    } 
    res.send({ status: 'success', payload: cart })
})

export default router