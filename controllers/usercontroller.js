const router = require('express').Router();
const User= require("../db").import("../models/user");

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const cloudinary= require('cloudinary');
const validateSession = require('../middleware/validate-session');

//endpoint for signing pictures
router.get('/cloudsign', validateSession, async(req, res)=>{
    try{
        const ts= Math.floor(new Date().getTime() /1000).toString()
        const sig= cloudinary.utils.api_sign_request(
            {timestamp: ts, upload_preset: 'datePerfect'},
            process.env.CLOUDINARY_SECRET
        )
        res.status(200).json({
            sig, ts
        })
    } catch(err) {
        res.status(500).json({
            message:'failed to sign'
        })
    }
  })
  
  //UPDATE PIC
  router.put('/imageset', validateSession, async (req,res)=>{
    try{
        const user= await 
        User.findOne({where:{id:req.user.id}})
        const result= await user.update({
            url:req.body.user.url
        })
        res.status(200).json({
            message: 'avatar url saved',
            result
        })
  
    } catch (err) {
        res.status(500).json({
            message:'failed to set image'
        })
    }
  })
  
  

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
    }) .catch(err=> res.status(500).send(err))
 
})



//POST 	Allows log in with an existing user.

router.post('/login', (req, res) =>{

    User.findOne({
        where:{username: req.body.user.username}
    })
    .then(user => {
        if(user){
            if(user){
                bcrypt.compare(req.body.user.password, user.password, (err, matches) =>{
                    if(matches){
                        const token=jwt.sign({id:user.id},process.env.JWT_SECRET, {expiresIn:"7d"})
                        res.json({
                            user:user,
                            message: "successfully authenticated",
                            sessionToken:token
                        })
                    }else {
                        res.status(502).json({error:'password mismatch'})
                    }
                })
            }
        } else {
            res.status(500).json({error:'user not found'});
        }
    })
    .catch(err=> res.status(500).json({error:'error with database'}))
})


module.exports= router;




