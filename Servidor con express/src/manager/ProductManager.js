import fs from 'fs'

class ProductManager {

    constructor(path) {
        this.path = path;
    };

    addProduct = async(product) => {

        try {

            const products = await this.getProducts();
            
            //validacion de que existen todos los campos! 
            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || product.stock == undefined){
                return console.log('Complete all fields');
            };
            
            //verificacion de que el campo code no exista en otro producto
            const codeRepetido = products.find(p => p.code == product.code);
            if(codeRepetido) {
                return console.log('The insert code already exist!');
            };

            //metodo para agregar automaticamente un id autoincremental!
            let id;
            if(products.length == 0) {
                id = 1
            } else {
                id = products[products.length -1].id + 1
            }

            //pusheo mi producto al array y actualizo el archivo .json
            products.push({
                ...product,
                id
            });

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return console.log('The product was succesfully added!')

        } catch (err) {
            console.log(err);
        };                   

    };

    getProducts = async() => {
        try {
            //si existe mi archivo obtengo sus datos y los retorno, y sino retorno un array vacio. 
            if(fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, 'utf-8');
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

            //si encuentro un producto con el id ingresado retorno el producto sino un 'not found'
            if(product) {
                return product;
            } else {
                return { error: `The product with id: ${id}, doesn't exist!` };
            };
        } catch (err) {
            console.log(err);
        };
    };

    updateProduct = async(product) => {
        try {

            const products = await this.getProducts();
            const productToUpdate = products.find( p => p.id == product.id );
            
            //si no encontro este producto en nuestro .json retorno que no se encontro este producto
            if(!productToUpdate) {
                return console.log(`Can't find the product with id: ${product.id}`);
            };
            
            //busco el indice del producto para actualizar, actualizo ese producto, ya sea 1 campo o todos y actualizo el .json
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
            const indexProduct = products.findIndex( p => p.id === id );

            //validacion para ver si encontro el producto, de no ser asi retorna que no encontro el producto con ese id.
            if(indexProduct === -1) {
                return console.log(`Can't find the product with id: ${id}`);
            };

            //elimino del array el producto que se desea borrar, actualizo el .json y retorno el array sin ese producto 
            products.splice(indexProduct, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return products;

        } catch(err) {
            console.log(err);
        };
    };

};

export const arrayProducts = [
    {
        title: "Jack Daniel's",
        description: "Whiskey Jack Daniel's Old Nº 7 750ml",
        price: 13635,
        thumbnail: 'url imagen',
        code: "000001",
        stock: 50
    },
    {
        title: 'Jameson Black Barrel',
        description: 'Whiskey Jameson Black Barrel 700ml',
        price: 10675,
        thumbnail: 'url imagen',
        code: "000002",
        stock: 50
    },
    {
        title: 'Chivas Regal',
        description: 'Whisky Chivas Regal Extra 13 Años, con estuche 750ml',
        price: 11136,
        thumbnail: 'url imagen',
        code: "000003",
        stock: 50
    },
    {
        title: 'Johnnie Walker Black Label',
        description: 'Johnnie Walker Black Label 1L',
        price: 13955,
        thumbnail: 'url imagen',
        code: "000004",
        stock: 50
    },
    {
        title: 'Buffalo Trace Bourbon',
        description: 'Whiskey Buffalo Trace Bourbon 750ml Kentucky American',
        price: 17100,
        thumbnail: 'url imagen',
        code: "000005",
        stock: 50
    },
    {
        title: "Ballantine's",
        description: "Ballantine's Blended Scotch Finest 1L",
        price: 6213,
        thumbnail: 'url imagen',
        code: "000006",
        stock: 50
    },
    {
        title: "Gran Old Parr",
        description: "Gran Old Parr De Luxe 750ml Scotch Blended",
        price: 9300,
        thumbnail: 'url imagen',
        code: "000007",
        stock: 50
    },
    {
        title: "Buchanans Deluxe",
        description: "Buchanans Deluxe 12 años Scotch Blend 750ml",
        price: 11521,
        thumbnail: 'url imagen',
        code: "000008",
        stock: 50
    },
    {
        title: "Scapa Skiren",
        description: "Scapa Skiren Single Malt Scotch 700ml",
        price: 20963,
        thumbnail: 'url imagen',
        code: "000009",
        stock: 50
    },
    {
        title: "Jim Beam Black Full",
        description: "Jim Beam Black Full",
        price: 12126,
        thumbnail: 'url imagen',
        code: "000010",
        stock: 50
    }
];

export default ProductManager;