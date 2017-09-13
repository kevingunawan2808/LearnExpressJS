const express = require('express'),
	router = express.Router(),
	Transaction=require('../models/Transaction')

router.post('/rent',async(req,res)=>{
	let assetNumber=req.body.assetNumber,
		username=req.decoded.username
	if(assetNumber){
		res.json(await Transaction.rent(assetNumber,username))
	}else{
		res.send("Internal Server Error")
	}
})

router.post('/getAsset',async(req,res)=>{
	let assetNumber=req.body.assetNumber
	if(assetNumber){
		res.json(await Transaction.getAsset(assetNumber))
	}else{
		res.send("Internal Server Error")
	}
})

module.exports=router