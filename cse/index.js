const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/Form.html");
});

mongoose.connect('mongodb://localhost:27017/devopscse')
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log("MongoDB connection error:", err));

const cgpaschema = new mongoose.Schema({
    rollNo: String,
    name: String,
    branch: String,
    email: String,
    mobile: String,
    cgpa: Number
},{ versionKey:false });

const cgpaModel = mongoose.model('cgpacse', cgpaschema, "csecgpa");

app.get("/cse", (req, res) => {
    cgpaModel.find().then(data => res.json(data));
});

app.post("/data", (req, res) => {

    const createAndSave = (rollNo) => {
        const data = {
            rollNo: rollNo,
            name: req.body.name,
            branch: req.body.branch,
            email: req.body.email,
            mobile: req.body.mobile,
            cgpa: req.body.cgpa
        };
        const m = new cgpaModel(data);
        m.save()
         .then(info => res.json(info))
         .catch(err => res.status(500).json({ error: err.message }));
    };

    if (req.body._id && req.body._id.trim()) {
        createAndSave(req.body._id.trim());
    } else {
        cgpaModel.find().then(docs => {
            let max = 0;
            docs.forEach(d => {
                const n = parseInt(d.rollNo);
                if (!isNaN(n) && n > max) max = n;
            });
            createAndSave(String(max + 1));
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});