const express=require("express")
const connection=require("./config/db")
const userRouter=require("./Routes/user.route")
const productRouter=require("./Routes/product.route")
const server=express()
server.use(express.json())
server.use("/User",userRouter)
server.use("/Product",productRouter)
const PORT=5000

server.listen(PORT,async()=>{
    try {
        await connection
        console.log("server is running:",PORT)
        console.log("mongoose database connected")
    } catch (error) {
        console.log(`error mongoose database${error}`)
    }
})