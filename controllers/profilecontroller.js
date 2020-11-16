const router = require('express').Router();
const validateSession= require('../middleware/validate-session');
const Profile= require("../db").import("../models/profile");
const cloudinary= require('cloudinary');

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
      Profile.findOne({where:{owner:req.user.id}})
      const result= await user.update({
          url:req.body.profile.url
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



//POST '/' --- User creates  profile
router.post('/', validateSession, (req,res) => {
    const profilePage= {
        name: req.body.profile.name,
        age: req.body.profile.age,
        interestedIn: req.body.profile.interestedIn,
        activities: req.body.profile.activities,
        food: req.body.profile.food,
        owner: req.user.id //added
    }
    Profile.create(profilePage)
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json({error:err}))

})

//GET '/' --- Pulls up all profiles for individual user (can we make it so the user only creates one?)
router.get('/', validateSession, function (req, res) {
    Profile.findAll({
        where: {owner:req.user.id}
    })
    .then(profile => res.status(200).json(profile))
    .catch(err=> res.status(500).json({error:err}))
});



//GET '/' --- Pulls up all profiles 
router.get('/all', validateSession, function (req, res) {
    Profile.findAll()
    .then(profile => res.status(200).json(profile))
    .catch(err=> res.status(500).json({error:err}))
});


//PUT '/:id' --- Individual user can update his/her profile


router.put("/:id", validateSession, function(req, res){
    const updateProfile= {
       name: req.body.profile.name,
       age: req.body.profile.age,
       interestedIn: req.body.profile.interestedIn,
       activities: req.body.profile.activities,
       food: req.body.profile.food
    };
    const query= { where: {id: req.params.id, owner: req.user.id}}

    Profile.update(updateProfile, query)
       .then((profile)=> res.status(200).json(profile))
       .catch((err) => res.status(500).json({error:err}))
})


//DELETE '/:name' --- Individual user can delete his/her profile
router.delete("/:id", validateSession, function (req, res){
    const query= {where: {id: req.params.id, owner:req.user.id}};
    Profile.destroy(query)
    .then(()=> res.status(200).json({message: "profile is removed"}))
    .catch((err) => res.status(500).json({error:err}))
})

// GET '/:id' ------- Gets an individual's log by id

// find one profile by it's name
// http://localhost:8080/spanishfood/tacos
// : tells the code that name is a parameter, meaning a variable in the url
// when sending a request you do not need the :name, you simply write the name as it appears in the database
//why does the name appear as null? //Had to be CAPITALIZED! DUH!
router.get('/:name', (req, res) => {
    Profile.findAll({
      where: {
        name: req.params.name
      }
    })
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json({
      error: err
    }))
  });
  

module.exports= router; 