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

    addProduct() {
        let id = 0
        products.forEach(p => {
            if(p.id > id) {
                id = p.id
            }
        })
        const codeRepetido = products.find(p => p.code == this.code)
        if(this.title && this.description && this.price && this.thumbnail && this.code && this.stock != '' && !codeRepetido){
            products.push({
                title: this.title,
                description: this.description,
                price: this.price,
                thumbnail: this.thumbnail,
                code: this.code,
                stock: this.stock,
                id: id++
            })
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