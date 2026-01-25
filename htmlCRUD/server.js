const express = require('express')
const app=express();
const fs =require("fs");
const path=require('path');

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.get('/home',(req,res)=>
{
    res.sendFile(__dirname + '/public/home.html');
});
app.post('/formpost',(req,res)=>
{
    let data=JSON.parse(fs.readFileSync(__dirname + '/cse.json'));
    data.push(req.body);
    fs.writeFile(__dirname + "/cse.json" , JSON.stringify(data), (err)=>
    {
        res.send("SUCCESSFULLY ADDED");
    });

});

app.get('/cse/deletebyid/:idno', (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/cse.json'));
    let id = req.params.idno;

    let newData = data.filter(obj => obj.uid != id);

    fs.writeFile(__dirname + '/cse.json', JSON.stringify(newData), (err) => {
        res.send("SUCCESSFULLY DELETED");
    });
});
app.get('/cse/updatebyid/:idno', (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/cse.json'));
    let id = req.params.idno;
    let obj = data.find(o => o.uid == id || o.id == id);
    if (!obj) {
        res.send("ID NOT FOUND");
        return;
    }
    res.send(`
     
      <form action="/cse/updatebyid/${id}" method="post">
            <input type="text" name="uid" placeholder="Enter ID" />
            <input type="text" name="uname" placeholder="Enter Name" />
            <input type="text" name="ucity" placeholder="Enter City" />

            <input type="submit" value="CLICKME" />
            </form>
    `);
});
app.post('/cse/updatebyid/:idno', (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/cse.json'));
    let oldId = req.params.idno;

    for (let i = 0; i < data.length; i++) {
        if (data[i].uid == oldId || data[i].id == oldId) {
    data[i].uid = req.body.uid;
    data[i].uname = req.body.uname;
    data[i].ucity = req.body.ucity;
}
    }
    fs.writeFileSync(__dirname + '/cse.json', JSON.stringify(data, null, 2));
    res.send("SUCCESS");
});


app.listen(3000,()=>
{
    console.log("SERVER RUNNING");
});