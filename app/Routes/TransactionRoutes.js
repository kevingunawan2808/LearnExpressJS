const express = require('express'),
	router = express.Router(),
	Transaction=require('../models/Transaction')

router.post('/rent',async(req,res)=>{
	let assetNumber=req.body.assetNumber,
		username=req.decoded.username,
		hour=req.body.hour
	if(assetNumber){
		res.json(await Transaction.rent(assetNumber,username,hour))
	}else{
		res.send("Internal Server Error")
	}
})

router.post('/callAsset',async(req,res)=>{
	let assetNumber=req.body.assetNumber
	if(assetNumber){
		res.json(await Transaction.callAsset(assetNumber))
	}else{
		res.send("Internal Server Error")
	}
})

router.post('/getTransactions',async(req,res)=>{
	let username=req.decoded.username
	if(username){
		res.json(await Transaction.getTransactions(username))
	}else{
		res.send("Internal Server Error")
	}
})

module.exports=router