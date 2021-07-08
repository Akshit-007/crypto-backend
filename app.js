const express = require('express')
const app=express()

const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const expressvalidator = require("express-validator");
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

//db
mongoose.connect
        (   process.env.MONGO_URI,
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true , useFindAndModify: false }    
        )
            .then( () => {console.log('db connected')} )

mongoose.connection.on('error', err => {
    console.log(`db connection error: ${err.message} `)
} );

// bring in routes
const authroutes=require('./route/auth');
const userroutes=require('./route/user');
//apidocs
app.get('/',(req,res) =>
{
    fs.readFile('docs/apidocs.json',(err,data)=>
    {
        if(err)     res.status(400).json({error:err});
        
        const docs=JSON.parse(data);
        res.json(docs);
    })
})


//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressvalidator()); 
app.use(cors());
app.use("/",authroutes);
app.use("/",userroutes);

// custom middleware
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorised!"});
    }});



const port=process.env.PORT || 8080;

if(process.env.NODE_ENV == 'production')
{
    app.use(express.static("food-front-react-main/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'food-front-react-main','build','index.html'))
    })
}

app.listen(port,()=>{   console.log(`A node JS API : ${port}`); })