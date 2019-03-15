// import 
import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';
import path from 'path';


var app = express();

const route = require('./routes/route');


// MONGO connect

// connect to mongo
mongoose.connect('url');

// on connection
mongoose.connection.on('connected',()=>{
    console.log('connect to database');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in connececting' + err);
    }
});


// port
const port = 3000;


app.use(cors());

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',route);


app.get('/',(req,res)=>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log("server listening at port:" + port);
});