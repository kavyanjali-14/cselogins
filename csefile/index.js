const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();

app.use(fileUpload());

app.post("/upload",(req,res,next)=> {

    if(req.files == null){
        return res.status(400).send("NO FILE UPLOADED");
    }

    let imagefile = req.files.file;
    uploadpath = __dirname + "/public/" + imagefile.name;

    imagefile.mv(uploadpath, (err)=> {
        if(err){
            return res.status(500).send(err);
        }
        res.send("UPLOADED");
    });
});

app.post("/upload/rename",(req,res,next)=> {
    let imagefile = req.files.file;
    uploadpath = __dirname + "/public/" + imagefile.name;
    imagefile.mv(uploadpath, (err)=> {
        if(err){
        return res.status(500).send(err);
        }
        fs.rename(uploadpath,__dirname + "/public/" + "kavya.jpeg",
        (err)=> {
            console.log("FAILED")
        });
    });
});
app.listen(3000,()=> {
    console.log("SERVER RUNNING");
});