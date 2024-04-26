const express = require('express');
const app = express();
require('dotenv/config');
const api = process.env.API_URL;
const dbString = process.env.Connection_String;
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/errorHandler')
const productsRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories')
const usersRouter = require('./routers/users')
const ordersRouter = require('./routers/orders')

app.use(cors());
app.options('*',cors());
//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

app.use(`${api}/products`,productsRouter)
app.use(`${api}/categories`,categoriesRouter)
app.use(`${api}/users`,usersRouter)
app.use(`${api}/orders`,ordersRouter)

mongoose.connect(dbString)
.then(()=>{
    console.log('Connected to db successfully');
})
.catch((err)=>{
    console.log(err);
});
// app.listen(3000,()=>{
//     console.log("The server is now running at port http://localhost:3000");
// });
var server = app.listen(process.env.PORT || 3000,function(){
    var port = server.address().port;
    console.log("Express is working on port" +  port);
})