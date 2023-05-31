const products = []

class ProductManager {

    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    };

    addProduct(product) {
        let id = 0
        products.forEach(p => {
            if(p.id > id) {
                id = p.id
            }
        })
        const codeRepetido = products.find(p => p.code == product.code)
        if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock != '' && !codeRepetido){
            products.push({ ...product, id: id++ })
        } else {
            console.log('Complete all fields')
        }
    };

    getProducts() {
        return products
    }

    getProductsById(id) {
        const productById = products.filter(p => p.id == id)
        if (productById) {
            return productById
        }
        return console.log("Not Found")
    }

};