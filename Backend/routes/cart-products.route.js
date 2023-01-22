const { Router } = require("express");
const { CartProductModel } = require("../models/cart-product.model.js");
const cartProductsRouter = Router();


cartProductsRouter.get("/", async(req, res)=>{
    const uid = req.body.user_id
    try {
        const data = await CartProductModel.find({user_id:uid});
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

cartProductsRouter.post('/', async(req, res)=>{
    try {
        const cartproduct = new CartProductModel({...req.body, quantity:1});
        await cartproduct.save();
        res.send("Product has been added to the Cart");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = { cartProductsRouter }
