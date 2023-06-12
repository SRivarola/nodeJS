import fs from 'fs'
// const fs = require('fs');

export default class ProductManager {

    constructor(path) {
        this.path = path;
    };

    addProduct = async(product) => {

        try {

            const products = await this.getProducts();
            const codeRepetido = products.find(p => p.code == product.code);
            
            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || product.stock == undefined){
                return console.log('Complete all fields');
            };
            
            if(codeRepetido) {
                return console.log('The insert code already exist!');
            };

            let id;

            if(products.length == 0) {
                id = 1
            } else {
                id = products[products.length -1].id + 1
            }

            products.push({
                ...product,
                id
            });

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return products

        } catch (err) {
            console.log(err);
        };                   

    };

    getProducts = async() => {
        try {
            if(fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, 'utf-8');
                console.log(data);
                const parseData = JSON.parse(data);

                return parseData;

            } else {
                return [];
            };
        } catch (err) {
            console.log(err);
        };
    };

    getProductsById = async(id) => {
        try {
            let resultado = await this.getProducts();
            let product = resultado.find( p => p.id == id );

            if(product) {
                return console.log(product);
            } else {
                return console.error("Not Found");
            };
        } catch (err) {
            console.log(err);
        };
    };

    updateProduct = async(product) => {
        try {

            const products = await this.getProducts();
            const productToUpdate = products.find( p => p.id == product.id );
            
            if(!productToUpdate) {
                return console.log(`Can't find the product with id: ${product.id}`);
            };
            
            const indexOfProduct = products.findIndex( p => p.id == product.id );

            products[indexOfProduct] = {
                ...productToUpdate,
                ...product
            };

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return products[indexOfProduct];

        } catch (err) {
            console.log(err);
        };

    };

    deleteProduct = async(id) => {
        try {

            const products = await this.getProducts();
            const indice = products.findIndex( p => p.id === id );

            if(indice < 0) {
                return console.log(`Can't find the product with id: ${id}`);
            };

            products.splice(indice, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return products;

        } catch(err) {
            console.log(err);
        };
    };

};

// const manager = new ProductManager('./files/products.json');

// //producto completo
// const producto1 = {
//     title: 'Lapiz',
//     description: 'Es un lapiz',
//     price: 250,
//     thumbnail: 'url imagen',
//     code: 78651,
//     stock: 20
// }

// //producto completo
// const producto2 = {
//     title: 'Goma',
//     description: 'Es una goma',
//     price: 300,
//     thumbnail: 'url imagen',
//     code: 5431513,
//     stock: 20
// }

// // producto con stock 0, se agrega igual!!
// const producto3 = {
//     title: 'Cartuchera',
//     description: 'Es una cartuchera',
//     price: 1200,
//     thumbnail: 'url imagen',
//     code: 45684,
//     stock: 0
// }

// //producto con un campo faltante
// const producto4 = {
//     title: 'Algo',
//     description: 'Es algo',
//     price: 1200,
//     code: 45231,
//     stock: 0
// }

// const nuevosProductos = async() => {

//     await manager.addProduct(producto1);
//     await manager.addProduct(producto2);
//     await manager.addProduct(producto3);
//     await manager.addProduct(producto4);

//     console.log(await manager.getProducts());

//     console.log(await manager.getProductsById(1));

//     console.log(await manager.updateProduct({id: 1, stock: 200}))

//     console.log(await manager.deleteProduct(1))

//     await manager.addProduct(producto1);


// }

// nuevosProductos()