const path = require("path"),  
    express = require("express"),
    bodyParser = require('body-parser'),
    jwt    = require('jsonwebtoken'),
    config=require('./config')

const DIST_DIR = path.join(__dirname, "dist"),  
    PORT = 3000,
    app = express()

const users = require('./app/Routes/UserRoutes')
const transactions = require('./app/Routes/TransactionRoutes')

app.use(express.static(DIST_DIR))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/user",users)

app.use((req, res, next)=>{
	let token = req.headers['x-access-token']
  	if (token) {
    	jwt.verify(token, config.secretToken, function(err, decoded) {      
	      	if (err) {
	        	return res.json({ status: "error", message: 'Failed to authenticate token.' })
	    	}else {
		        req.decoded = decoded
		        next()
	    	}
	    })
	}else {
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
    	})
   		next()
   	}
})

app.use("/transaction",transactions)

app.use((req, res, next)=> {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
})

app.use((err, req, res)=> {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	})
})

app.listen(PORT)