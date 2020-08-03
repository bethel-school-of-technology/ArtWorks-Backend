var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require("body-parser"); 
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const ArtWorks = require ('./models/artists');


const mongoose = require('mongoose'); 
mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0.yy25u.gcp.mongodb.net/charityWater?retryWrites=true&w=majority' , { useNewUrlParser: true });; 

var db=mongoose.connection; 
var Schema = mongoose.Schema;
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gallery', usersRouter);

  
  
console.log("server listening at port 3000"); 

module.exports = app;
