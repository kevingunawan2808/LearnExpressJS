const express = require('express'),
	router = express.Router(),
	User=require('../models/User')

router.post('/login',async(req,res)=>{
	let username=req.body.username,
		password=req.body.password
	if(username && password){
		res.json(await User.login(username,password))
	}else{
		res.send("Internal Server Error")
	}
})

router.post('/register',async(req,res)=>{
	let username=req.body.username,
		password=req.body.password
	if(username && password){
		res.json(await User.save(username,password))
	}else{
		res.send("Internal Server Error")
	}
})
module.exports=router