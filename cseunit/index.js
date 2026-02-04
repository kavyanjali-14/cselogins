const express = require("express");
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/devopscse");



let cse1 = mongoose.Schema({
    id: Number,
    name: String,
    branch: String,
    college: String,
    marks: Number,
    grade: String
},
    {
        versionKey: false
    }
  );
  



let csem1 = new mongoose.model("cserocks", cse1, "devopsmarks");



app.get("/data/:id", async (req, res) => {

    const id = Number(req.params.id);

    const data = await csem1.findOne({ id: id });

    res.send(data);
});



app.post("/data", async (req, res) => {

    await csem1.deleteOne({ id: req.body.id });

    const data = new csem1(req.body);

    await data.save();

    res.send(data);

});



app.put("/data/:id", async (req, res) => {

    const id = Number(req.params.id);

    const data = await csem1.findOneAndUpdate(
        { id: id },
        req.body,
        { new: true }
    );

    res.send(data);
});


app.delete("/data/:id", async (req, res) => {

    const id = Number(req.params.id);

    await csem1.findOneAndDelete({ id: id });

    res.send({ message: "Deleted" });
});


app.get("/", (req, res) => {

    res.status(200).json({ message: "welcome to cse" });

});


module.exports = app;