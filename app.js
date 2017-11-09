var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/RESTapi");

var schema = mongoose.Schema;

var userSchema = new schema({
	'name' : String,
	'age' : Number,
	'desig' : String
});

var User = mongoose.model("users", userSchema);

var app = express();

app.use(bodyParser());

app.get('/api/users',function(req,res){
	
	User.find({},function(err,obj){
		if(err){
			return res.json({status:"error",msg:err});
		}
			return res.json({status:'success', data:obj})
	})
});

app.post('/api/users',function(req,res){
	var data = req.body;
	User.create(data,function(err,obj){
		if(err){
			return res.json({status:"error",msg:err});
		}
			return res.json({status:'success', data:obj})
		
	})
});

app.get(/.*?\.\w{2,4}$/,function(req,res){
	console.log("dir: ",__dirname);
	console.log("req.Url: ",req.url);
	res.sendFile(__dirname+'/client/'+req.url);
});

app.get("*",function(req,res){
	res.sendFile(__dirname+'/client/index.html')
});

app.listen(9000,function(){
	console.log("listening to port 9000");
});