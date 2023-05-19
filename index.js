const express = require('express');
const app = express();
const {connection} = require('./db');
const { UserRoute } = require('./routes/User.route');
const { ProductRoute } = require('./routes/Product.route');
const { auth } = require('./middleware/auth.middleware');
const { CartRoute } = require('./routes/Cart.route');
const { OrderRoute } = require('./routes/Order.route');
const { admin_middleware } = require('./middleware/admin.middleware');
const { AdminRoute } = require('./routes/Admin.route');

app.use(express.json())
app.use('/user',UserRoute)
app.use('/products',ProductRoute)

app.use(admin_middleware);
app.use('/admin',AdminRoute)

app.use(auth)
app.use('/orderhistory',OrderRoute)
app.use('/cart',CartRoute)



app.listen(8080,async()=>{
    try {
        await connection;
        console.log('connected to db')
        console.log("server is running at port 8080")
    } catch (error) {
        console.log("something went wrong while run server")
    }
})