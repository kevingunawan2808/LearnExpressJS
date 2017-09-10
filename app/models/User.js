const db = require('../DB/db'),
	crypto = require('crypto'),
    jwt    = require('jsonwebtoken'),
	config=require('../../config')

exports.save = async(username, password) =>{
	let salt=generateSalt(8)
	let hashedPassword=hashPassword(password,salt)
  	let values = [username, hashedPassword,salt]
	try{
	  	let ins= await db.execute('INSERT INTO user (username,password,salt) VALUES(?, ?, ?)', values)
	  	return {username:username,status:"succes"}
	}catch(err){
		console.log(err)
	  	return {username:username,status:"error",message:"Username already registered"}
	}
}

exports.login = async(username, password) =>{
	try{
		let salt= (await db.execute('SELECT SALT FROM USER WHERE USERNAME =?',[username]))[0]
		if(!salt.length)
			return {status:"error",message:"Invalid Username or Password"}

		let hashedPassword=hashPassword(password,salt[0].SALT)
  		let values = [username, hashedPassword]

		let result=(await db.execute('SELECT USERNAME FROM USER WHERE USERNAME=? AND PASSWORD=?', values))[0]
		if(!result.length)
			return {status:"error",message:"Invalid Username or Password"}

		let user= {username:result[0].USERNAME}
		var token = jwt.sign(user,config.secretToken, {
          expiresIn: 60*60*24 // expires in 24 hours
        });
		return{username:result[0].USERNAME,token:token}
	}catch(err){
		console.log(err)
	}
}

const generateSalt=(length)=>{
	return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length)
}

const hashPassword=(password,salt)=>{
	var hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
    hash.update(password)
    var value = hash.digest('hex')
    return value
}