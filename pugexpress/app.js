const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const pug = require('pug');

app.use(express.json());
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'pug');

let b = mongoose.connect("mongodb://localhost:27017/devopscse");

b.then(() => {
    console.log("Connection success");
});
b.catch(() => {
    console.log("Connection failed");
});

let marksschema = new mongoose.Schema({
    id: Number,
    name: String,
    branch: String,
    college: String,
    marks: Number,
    grade: String
}, { versionKey: false });

let marksmodal = new mongoose.model("markscse", marksschema, "devopsmarks");



app.post("/data", (req, res) => {
    let data = {
        id: req.body.id,
        name: req.body.name,
        branch: req.body.branch,
        college: req.body.college,
        marks: req.body.marks,
        grade: req.body.grade
    };
    const m = new marksmodal(data);
    m.save().then(() => res.send("SUCCESS"));
});



app.get("/pugdisplay", (req, res) => {
    let b = marksmodal.find();
    b.then((data) => res.render("sample", { data }));
});



app.get("/pugdisplay/sort", (req, res) => {
    let b = marksmodal.find().sort({ marks: -1 });
    b.then((data) => res.render("sample", { data }));
});



app.get("/marks/top3", (req, res) => {
    let b = marksmodal.find().sort({ marks: -1 }).limit(3);
    b.then((data) => res.render("sample", { data }));
});

app.get("/marks/bottom3", (req, res) => {
    let b = marksmodal.find().sort({ marks: 1 }).limit(3);
    b.then((data) => res.render("sample", { data }));
});
app.get("/grades/top3", (req, res) => {
    let b = marksmodal.find().sort({ marks: -1 }).limit(3);
    b.then((data) => res.render("sample", { data }));
});

app.get("/grades/bottom3", (req, res) => {
    let b = marksmodal.find().sort({ marks: 1 }).limit(3);
    b.then((data) => res.render("sample", { data }));
}); 
app.listen(3000, () => {
    console.log("Server running successfully");
});
