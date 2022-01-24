
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();


app.use(function(req,res,next){
console.log("Hello World");
next();
})

// app.get('/',function(req, res) {
//     console.log("hello express")
//   res.send("Hello Express");
// })

app.use(function(req, res, next) {
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
})


app.use("/public",express.static(__dirname+"/public"));

app.get('/',function(req,res) {
  res.sendFile(__dirname+'/views/index.html')
});

// app.get('/json', function(req,res){
//   res.json({"message": "Hello json"});
// });








app.use('/json',function(req,res){
  if(process.env.MESSAGE_STYLE = "uppercase"){
     console.log("first if")
    res.json({"message": "HELLO JSON"});
   
  }else {
    res.json({"message": "Hello json"});
  }
  }

);


// app.get('/json', function(req,res){
  
//  var response = {"message": "Hello json"};

// if (mySecret === "uppercase") {
//   console.log("first if")
//  response.message = response.message.toUpperCase();
  
// } 
  
//   res.json(response);

// })
function currentTime(){
  return new Date().toString();
}

app.get('/now',function(req,res,next){
  req.time = currentTime();
  next();
}, function(req,res){
  res.json({"time":req.time});
}
)

app.get("/:word/echo",function(req,res){
  res.json({"echo":req.params.word});
})

app.get('/name',function(req,res){
  console.log(req.query);
  res.json({name: req.query.first+" "+req.query.last})
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.post('/name',function(req,res){
  console.log(req.query);
  res.json({name: req.body.first+" "+req.body.last})
});



module.exports = app;
