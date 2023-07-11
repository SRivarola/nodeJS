import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js';
import realTimeProducts from './router/realTimeProducts.router.js';
import ProductManager from './manager/ProductManager.js';
import __dirname from './utils.js';

const manager = new ProductManager(`${__dirname}/files/products.json`);
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static((`${__dirname}/public`)))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use('/realtimeproducts', realTimeProducts);

const server = app.listen(8080, console.log('Listening on 8080'));

const io = new Server(server);

io.on('connection', async socket => {

    console.log('cliente conectado');

    socket.on('dataProduct', async data => {
        const product = await manager.addProduct(data)
        if(product){
            const successfully = `<span id='errorMessage' class='successfullMessage'>Product added successfully!</span>`
            socket.emit('message', successfully)
            const product = await manager.getProducts()
            socket.send()
        } else {
            const errorMessage = `<span id='errorMessage' class='errorMessage'>Something went wrong, try again</span>`
            socket.emit('message', errorMessage)
        }
    })

    try {
        const productData = await manager.getProducts()
        socket.emit('data', productData)
    } catch (error) {
        console.log(error)
    }

    socket.on('deleteData', async data => {
        const product = await manager.deleteProduct(data)
        console.log(product)
        if(product){
            const deleteMessage = `<span id='errorDeleteMessage' class='successfullMessage'>The product was delete successfully!</span>`
            socket.emit('deleteMessage', deleteMessage)
        } else {
            const deleteMessage = `<span id='errorDeleteMessage' class='errorMessage'>Something went wrong, try again!</span>`
            socket.emit('deleteMessage', deleteMessage)
        }
    })

});

