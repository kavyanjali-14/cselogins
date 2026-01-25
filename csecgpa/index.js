const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/devopscse')
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch(() => {
    console.log("MongoDB connection failed");
});

// Schema
const cgpaSchema = new mongoose.Schema({
    rollno: Number,          
    name: String,
    branch: String,
    email: String,
    mobile: Number,
    cgpa: Number
});

// Model
const CgpaModel = mongoose.model("cgpacse", cgpaSchema, "csecgpa");

// POST API
app.post("/postdata", (req, res) => {
    const data = {
        rollno: req.body.rollno,
        name: req.body.name,
        branch: req.body.branch,
        email: req.body.email,
        mobile: req.body.mobile,
        cgpa: req.body.cgpa
    };

    const m = new CgpaModel(data);

    m.save()
     .then(info => res.json(info))
     .catch(err => res.status(500).json(err));
});
app.get("/cse",(req,res)=>{
})
app.listen(3000, () => {
    console.log("Server running on port 3000");
});