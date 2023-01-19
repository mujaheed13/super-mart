const {Router, query} = require("express");
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

productRouter.get("/", async(req, res)=>{
    const category = req.query.category;
    const order = req.query.sort;
    try {
        if(category){
            const data = await ProductModel.find({category});
            res.json(data);
        } else if(order && category){
            if(order=="asc"){
                const data = await ProductModel.find({category}).sort({price: 1});
                res.json(data);
            }else if(order=="dsc"){
                const data = await ProductModel.find({category}).sort({price: -1});
                res.json(data);
            }
        } else if(order){
            if(order=="asc"){
                const data = await ProductModel.find().sort({price: 1});
                res.json(data);
            }else if(order=="dsc"){
                const data = await ProductModel.find().sort({price: -1});
                res.json(data);
            }
        }else {
            const data = await ProductModel.find();
            res.json(data);
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = { productRouter }