const express=require('express');
const mongoose=require('mongoose');

const app=express();

let cse=mongoose.connect('mongodb://localhost:27017/devopscse');
cse.then(()=>{
    console.log("connection success");
});
cse.catch(()=>{
    console.log("connection failed");
});
let cseSchema=new mongoose.Schema({
    _id:Number,
    name:String,
    city:String
});
let modelcse=new mongoose.model("csedata",cseSchema);

app.get('/cse/get',(req,res)=>{
    modelcse.find().then(data=>{res.send(data)});

});


app.listen(3000, () => {
    console.log("SERVER RUNNING");
});
//model is the interface between datbase and schema