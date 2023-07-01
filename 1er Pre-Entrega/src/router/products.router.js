import { Router } from 'express';
import ProductManager from "../manager/ProductManager.js";
import __dirname from '../utils.js';

const router = Router();
const manager = new ProductManager(`${__dirname}/files/products.json`);

router.get('/', async (req, res) => {
    const { limit } = req.query;
    let products = await manager.getProducts();
    if(limit) products = products.slice(0, Number(limit));
    res.send({ status: 'success', payload: products });
});

router.get('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const product = await manager.getProductsById(productId)
    if(!product) {
        return res.status(400).send({ error: `The product with id: ${productId}, doesn't exist!` })
    } 
    res.send({ status: 'success', payload: product })
})

router.post('/', async (req, res) => {
    const body = req.body;
    const product = await manager.addProduct(body)
    if(!product) {
        return res.status(400).send({ error: `The product could not be added, check the fields and try again!` })
    } 
    res.send({ status: 'success', payload: product })
})

router.put('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const body = req.body;
    const product = await manager.updateProduct({...body, id: productId})
    if(!product) {
        return res.status(400).send({ error: `Can't find the product with id: ${productId}` })
    } 
    res.send({ status: 'success', payload: product })
})

router.delete('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const product = await manager.deleteProduct(productId)
    if(!product) {
        return res.status(400).send({ error: `Can't find the product with id: ${productId}` })
    } 
    res.send({ status: 'success', payload: product })
})

export default router