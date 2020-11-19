//This code  validates whether or not a user has permission to access a certain endpoint in your server. Permission is granted through tokens.  

const jwt= require('jsonwebtoken');
const User= require('../db').import('../models/user');


//ASYNC STYLE FOR VALIDATION
module.exports= async (req, res, next) => {
    console.log('validating')
    const token= req.headers.authorization; //Postman -- headers (key) Authorization
    try{
        const decoded= await jwt.verify(token, process.env.JWT_SECRET)
        console.log('decoded', decoded.id)
        const user = await User.findOne({where:{id: decoded.id}});
        if(!user) throw new Error('no user found');
        console.log('user found')
        req.user=user;
        next();
    }catch(err){
        res.status(500).json({error:err})
    }
}

