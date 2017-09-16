const db = require('../DB/db')
const moment = require('moment')

exports.rent = async(assetNumber,username,hour) =>{
	try{

		let asset= await getAsset(assetNumber)
		let values=[username,assetNumber,asset.price*hour,hour,moment().format()]
	  	let ins= await db.execute('INSERT INTO TRANSACTIONS (USERNAME,asset_Number,payment,hour,created_at) VALUES(?, ?, ?, ?, ?)', values)
	  	return {username:username,assetNumber:assetNumber,hour:hour,payment:asset.price*hour,status:"succes"}
	}catch(err){
		console.log(err)
		return err
	}
}

exports.getTransactions = async(username) =>{
	try{
		let values=[username]
	  	let result= (await db.execute('SELECT ASSET_NUMBER,created_at,payment,hour FROM TRANSACTIONS WHERE USERNAME= ?', values))[0]
	  	return {result:result,status:"succes"}
	}catch(err){
		console.log(err)
		return err
	}
}

exports.callAsset=async(assetNumber) =>{
	try{
	  	let result= await getAsset(assetNumber)
	  	return result
	}catch(err){
		console.log(err)
		return err
	}
}

const getAsset=async(assetNumber)=>{
	try{
		let values=[assetNumber]
	  	let result= (await db.execute('SELECT ASSET_NUMBER,TYPE,PRICE FROM ASSETS WHERE ASSET_NUMBER= ?', values))[0]
	  	if(!result.length){
	  		return {status:"error",message:"Invalid Asset"}
	  	}
	  	return {assetNumber:result[0].ASSET_NUMBER,type:result[0].TYPE,price:result[0].PRICE,status:"succes"}
	}catch(err){
		console.log(err)
		return err
	}
}