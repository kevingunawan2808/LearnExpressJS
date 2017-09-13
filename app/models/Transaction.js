const db = require('../DB/db')
const moment = require('moment')

exports.rent = async(assetNumber,username) =>{
	try{
		let values=[username,assetNumber,moment().format()]
	  	let ins= await db.execute('INSERT INTO TRANSACTIONS (USERNAME,asset_Number,created_at) VALUES(?, ?, ?)', values)
	  	return {username:username,assetNumber:assetNumber,status:"succes"}
	}catch(err){
		console.log(err)
		return err
	}
}

exports.getAsset=async(assetNumber) =>{
	try{
		let values=[assetNumber]
	  	let result= (await db.execute('SELECT ASSET_NUMBER,TYPE FROM ASSETS WHERE ASSET_NUMBER= ?', values))[0]
	  	if(!result.length){
	  		return {status:"error",message:"Invalid Asset"}
	  	}
	  	return {assetNumber:result[0].ASSET_NUMBER,type:result[0].TYPE,status:"succes"}
	}catch(err){
		console.log(err)
		return err
	}
}