const express=require("express")
const productModel=require("../Models/product.model")
const productRouter=express.Router()
productRouter.post("/create-product",async(req,res)=>{
    const {name,price,title}=req.body
    try {
      const product= productModel({
        name,
        price,
        title
      })
       await product.save()
      res.status(201).json({"msg":"create product"})
    } catch (error) {
        res.status(404).json({"msg":"product not create"})
    }
})
productRouter.get("/get-product",async(req,res)=>{
    try {
        const product=await productModel.find()
        res.status(201).json({"msg":"get product",product})
        
    } catch (error) {
        res.status(404).json({"msg":"product not get"})
    }
})
productRouter.patch("/update-product/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const product=await productModel.findByIdAndUpdate({_id:id},req.body)
        res.status(201).json({"msg":"update successfully",product})
    } catch (error) {
        res.status(404).json({"msg":"product not update"})
    }
})
productRouter.delete("/delete-product/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const product=await productModel.findByIdAndDelete({_id:id},req.body)
        res.status(201).json({"msg":"Delete successfully",product})
    } catch (error) {
        res.status(404).json({"msg":"product not Delete successfully"})
    }
    
    
})
module.exports=productRouter