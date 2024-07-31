const express=require("express")
const userModel=require("../Models/user.model")
const userRouter=express.Router()
userRouter.post("/create-user",async(req,res)=>{
    const{ name, email, password}=req.body
    try {
       let user=await userModel.findOne({email});
       if(user){
        return res.status(400).json({"msg":"already user create"});
       }
         user=new userModel({
            name,
            email,
            password
        })
       await user.save()
       res.status(200).json({"msg":"create user"})
    } catch (error) {
        res.status(404).json({"msg":"user not create"})
    }
})
userRouter.get("/get-user",async(req,res)=>{
    try {
        let users=await userModel.find()
        res.status(201).json(users)
    } catch (error) {
        res.status(404).json({"msg":"user not get"},error)
    }

})
userRouter.patch("/update-User/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        let UpdateUsers=await userModel.findByIdAndUpdate({_id:id},req.body)
           res.status(200).json({"msg":"update user",UpdateUsers})
    } catch (error) {
        res.status(404).send(`user not update"${error}`)
    }
    
})
userRouter.delete("/delete-user/:id",async(req,res)=>{
const {id}=req.params;
try {
    let DeleteUser=await userModel.findByIdAndDelete({_id:id},req.body)
    res.status(200).json({"msg":"delete user ",DeleteUser})
    
} catch (error) {
    res.status(404).send(`user not delete${error}`)
}
})
module.exports=userRouter