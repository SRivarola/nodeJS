
class ProductManager {

    constructor() {
        this.products = []
    };

    addProduct(title, description, price, thumbnail, code, stock) {
        const codeRepetido = this.products.find(p => p.code == code)
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.products.length + 1
        }
        if(title && description && price && thumbnail && code && stock != undefined && !codeRepetido){
            this.products.push(product)
        } else {
            console.log('Complete all fields')
        }
    };

    getProducts() {
        return this.products
    };

    getProductsById(id) {
        
        const productById = this.products.find(p => p.id == id)
        if (productById) {
            return productById
        }
        return console.error("Not Found")
    };

};

const productos1 = new ProductManager()
productos1.addProduct('Lapiz', 'Es un lapiz', 240, 'url imagen', 5431513, 100)
productos1.addProduct('Goma', 'Es una goma', 200, 'url imagen', 1043250, 0)
productos1.addProduct('Lapiz', 'Es un lapiz', 240, 'url imagen', 100)


const productoId1 = productos1.getProductsById(1)


productos1.getProductsById(4)

console.log(productos1.getProducts())

console.log(productoId1)