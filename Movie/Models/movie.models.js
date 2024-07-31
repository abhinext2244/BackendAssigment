const mongoose=require("mongoose")
const movieSchema= new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        rating: {
            type: Number,
            required: true
          },
          description: {
            type: String
          },
          releaseDate: {
            type: Date,
            required: true
          },
          genre:{
            type:String
          }
})
const movieStore=mongoose.model("movie",movieSchema)

module.exports=movieStore