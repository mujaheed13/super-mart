const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { json } = require("express");
const { userRouter } = require("./routes/user.route.js");
const { connection } = require("./configs/mongoose.connection.js");
const { productRouter } = require("./routes/products.route.js");
const { auth } = require("./middlewares/auth.js");
const { cartProductsRouter } = require("./routes/cart-products.route.js");

//Middlewares
app.use(cors({origin:"*"}));
app.use(json());


//routes
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cartproducts", auth);
app.use("/cartproducts", cartProductsRouter);

app.get("/", (req, res)=>{
    res.json("Super Mart");
})

app.get("*", (req, res)=>{
    res.json("Invalid end point");
})

app.listen(process.env.port, async()=>{
    console.log(`Server is running at http://localhost:${process.env.port}`);
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error while connecting to Database");
        console.log(error);
    }
})