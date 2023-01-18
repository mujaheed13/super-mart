const {Router} = require("express");
const { ProductModel } = require("../models/product.model.js");
const productRouter = Router();

productRouter.post("/add", async(req, res)=>{
    try {
        const product = ProductModel(req.body);
        await product.save();
        res.send("Product added");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = { productRouter }