const express = require('express');
const mongoose = require('mongoose');
const pug = require('pug');
const path = require('path');
const app = express();
app.use(express.json());
app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

let p = mongoose.connect('mongodb://localhost:27017/devopscse');
p.then(()=>console.log("Connection success"));
p.catch((err)=>console.log(err));

let pugschema = new mongoose.Schema({
    id: Number,
    name: String,
    branch: String,
    marks: Number
},{ versionKey: false });

let pugmodal = new mongoose.model("csemarks", pugschema, "pugmarks");

app.post("/data", (req, res) => {
    var data = {
        id: req.body.id,
        name: req.body.name,
        branch: req.body.branch,
        marks: req.body.marks
    };
    const m = new pugmodal(data);
    m.save().then(() => res.send("Successfully insert"));
});


app.get("/data", (req, res) => {
    pugmodal.find().then(info => res.send(info));
});


app.get("/data/:id", async (req, res) => {
    id = req.params.id;
    try {
        const info = await pugmodal.findOne({ id: id });
        if (!info) {
            res.status(404).json({ message: "No data found with id" });
        } else {
            res.status(200).send(info);
        }
    } catch (err) {
        res.status(500).send("Internal error");
    }
});


app.patch("/data/:id", async (req, res) => {
    id = req.params.id;
    try {
        let upinfo = await pugmodal.findOne({ id: id });
        if (!upinfo) {
            res.status(404).json({ message: "Data not found" });
        } else {
            await pugmodal.findOneAndUpdate(
                { id: id },
                { $set: req.body }
            );
            res.send("Updated successfully");
        }
    } catch (err) {
        res.status(500).send("Error");
    }
});


app.delete("/data/:id", async (req, res) => {
    id = req.params.id;
    try {
        const cse = await pugmodal.findOneAndDelete({ id: id });
        if (!cse) {
            res.status(404).json({ message: "Data not found" });
        } else {
            res.send("Deleted success");
        }
    } catch (err) {
        res.status(500).send("Err");
    }
});

app.get("/pugdata",(req,res)=>{
    let b = pugmodal.find();
    b.then(data => res.render('sample.pug',data));
});
app.listen(3000, () => {
    console.log("Server running");
});