import fs from 'fs';
import ProductManager from './ProductManager.js';
import __dirname from '../utils.js';

const manager = new ProductManager(`${__dirname}/files/products.json`)

class CartsManager {

    constructor(path) {
        this.path = path
    }
    
    addNewCart = async() => {
        try {
            if(fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data);

                let id = carts[carts.length -1].id + 1;

                carts.push({id: id, products: []});

                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

            } else {
                const carts = [{id: 1, products: []}];
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            }
        } catch(err) {
            console.log(err);
        }
    }

    getCart = async (id) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(data);
            const cartIndex = carts.findIndex( c => c.id === id)

            if(cartIndex === -1) return console.log(`Can't find cart whith id: ${id}`)

            return carts[cartIndex].products 
            
        } catch(err) {
            console.log(err)
        }
    }

    addProduct = async (cid, pid) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(data);
            const cartIndex = carts.findIndex( c => c.id === cid)

            if(cartIndex === -1) return console.log(`Can't find cart whith id: ${cid}`)

            const productData = await manager.getProducts()
            const existsProductId = productData.find( p => p.id === pid)
            
            if(!existsProductId) return console.log(`Can't find product whith id: ${pid}`)

            const cart = carts[cartIndex].products

            if(cart.length === 0) {
                cart.push({product: pid, quantity: 1})
                
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

                return cart
            } else {
                let sameProduct = cart.find( p => p.product === pid )
                if(!sameProduct){
                    cart.push({ product :pid, quantity: 1 })
                
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

                    return cart
                } else {
                    const cartIndex = cart.findIndex( p => p.product === pid);
                    cart[cartIndex].quantity = cart[cartIndex].quantity + 1;
                
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

                    return cart
                }
            }

        } catch(err) {
            console.log(err)
        }
    }

}

export default CartsManager