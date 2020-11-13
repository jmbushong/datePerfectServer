const router = require('express').Router();
const User= require("../db").import("../models/user");

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');

//POST: '/signup' ---Use creates an account
router.post('/signup', (req, res) =>{
    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 12)
      
    })

    .then(user =>{
        const token= jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:"7d"})
      
        res.json({
            user:user,
            message:"user was created successfully",
            sessionToken: token
        })
    }) .catch(err=> res.status(500).json(err))
 
})



//POST 	Allows log in with an existing user.

router.post('/login', (req, res) =>{

    User.findOne({
        where:{username: req.body.user.username}
    })
    .then(user => {
        if(user){
            
                bcrypt.compare(req.body.user.password, user.password, (err, matches) =>{
                    if(matches){
                        const token=jwt.sign({id:user.id},process.env.JWT_SECRET, {expiresIn:"7d"})
                        res.status(200).json({
                            user:user,
                            message: "successfully authenticated",
                            sessionToken:token
                        })
                    }else {
                        res.status(502).json({error:'password mismatch'})
                    }
                })
            
        } else {
            res.status(500).json({error:'user not found'});
        }
    })
    .catch(err=> res.status(500).json({error:err}))
})


module.exports= router;




