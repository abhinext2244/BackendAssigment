const express=require("express")
const connection=require("./config/db")
const MovieRouter=require("./routes/movie.route")
const server=express()
server.use(express.json())
server.use("/movie",MovieRouter)
const PORT=3003
server.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server running in port:${PORT}`)
        console.log("database connected ")
    } catch (error) {
        console.log(`database not connected${error}`)
    }
})