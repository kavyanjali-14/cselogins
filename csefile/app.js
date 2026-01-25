const express= require('express');
const aws = require("aws-sdk");
const fs= require("fs");
const dotenv = require('dotenv');   
dotenv.config();


const app = express();
const id= process.env.AWS_ACCESS_KEY_ID;
const secret = process.env.AWS_SECRET_ACCESS_KEY;

const cses3 = new aws.S3(
    {
        accessKeyId: id,
        secretAccessKey: secret
    }
)

const uploadfile = (filename) =>{
    const file = fs.readFileSync(filename);
    const params = {
        Bucket: "kavya-09",
        Key: "23MH1A05K8.jpeg",
        Body: file
    };
cses3.upload(params, (err,data) =>{ 
    if(err){
        throw(err);
    }
    console.log("file uploaded successfully");
    });
};
uploadfile('D:/devops/csefile/public//1.jpg');
app.listen(3000, ()=>{
    console.log("Server running successfully");
});