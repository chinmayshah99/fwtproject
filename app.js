// import 
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();
var session = require('express-session')


const route = require('./routes/route');


// MONGO connect

// connect to mongo
mongoose.connect('mongodb://localhost:27017/mydb');

// on connection
mongoose.connection.on('connected',()=>{
    console.log('connect to database');
	console.log('hello, world from database')
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

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));


app.use('/api',route);


app.get('/',(req,res)=>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log("server listening at port:" + port);
});
