const express=require("express")
const movieStore=require("../Models/movie.models")
const MovieRouter=express.Router()

MovieRouter.post("/create-movie",async(req,res)=>{
    const {name,rating,title,genre,description,releaseDate}=req.body
 try {
    const movie=movieStore({
        name,
        rating,
        title,
        genre,
        releaseDate,
        description
    })
    await movie.save()
    res.status(201).json({"msg":"create movie successfully"})
 } catch (error) {
    res.status(401).json({"msg":"create movie not successfully",error})
 }
})
MovieRouter.get("/movies",async(req,res)=>{
    const {title,rating,sortBy,q,page=1,limit=10}=req.query
    let filter = {};
    if (title) filter.title = title;
    if (rating) filter.rating = rating;
    if (q) filter.title = new RegExp(q, 'i');
    try {
        const movies = await movieStore.find(filter)
        .sort(sortBy)
        .skip((page - 1) * limit)
        .limit(Number(limit));
      res.json(movies);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})
MovieRouter.patch("/update-movie/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const updateMovie=await movieStore.findByIdAndUpdate({_id:id},req.body)
        res.status(201).json({"msg":"movie update",updateMovie})
    } catch (error) {
        res.status(404).json({"msg":"movie not update",error})
    }
})
MovieRouter.delete("/delete-movie/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const updateMovie=await movieStore.findByIdAndDelete({_id:id},req.body)
        res.status(201).json({"msg":"movie Deleted",updateMovie})
    } catch (error) {
        res.status(404).json({"msg":"movie not Deleted",error})
    }
})
module.exports=MovieRouter