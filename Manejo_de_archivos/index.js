import ProductManager from "./manager/ProductManager.js";

const manager = new ProductManager('./files/products.json');

//producto completo
const producto1 = {
    title: 'Lapiz',
    description: 'Es un lapiz',
    price: 250,
    thumbnail: 'url imagen',
    code: 78651,
    stock: 20
}

//producto completo
const producto2 = {
    title: 'Goma',
    description: 'Es una goma',
    price: 300,
    thumbnail: 'url imagen',
    code: 5431513,
    stock: 20
}

// producto con stock 0, se agrega igual!!
const producto3 = {
    title: 'Cartuchera',
    description: 'Es una cartuchera',
    price: 1200,
    thumbnail: 'url imagen',
    code: 45684,
    stock: 0
}

//producto con un campo faltante
const producto4 = {
    title: 'Algo',
    description: 'Es algo',
    price: 1200,
    code: 45231,
    stock: 0
}

const nuevosProductos = async() => {

    await manager.addProduct(producto1);
    await manager.addProduct(producto2);
    await manager.addProduct(producto3);
    await manager.addProduct(producto4);

    console.log(await manager.getProducts());

    console.log(await manager.getProductsById(1));

    console.log(await manager.updateProduct({id: 1, stock: 200}))

    console.log(await manager.deleteProduct(1))

    await manager.addProduct(producto1);


}

nuevosProductos()