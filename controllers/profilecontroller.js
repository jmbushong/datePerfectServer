const router = require('express').Router();
const Profile= require("../db").import("../models/profile");
const validateSession = require('../middleware/validate-session');

//POST '/' --- User creates a profile
router.post('/create', validateSession, (req, res) =>{
    const profileEntry = {
        name: req.body.profile.name,
        age: req.body.profile.age,
        interestedIn: req.body.profile.interestedIn,
        activities: req.body.profile.activities,
        food: req.body.profile.food,
        owner: req.user.id
    }
    Profile.create(profileEntry)
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json({ error:err}))

})

//GET '/' --- Pulls up all profile for individual user
router.get('/', validateSession, (req, res) =>{
   Profile.findAll({
        where: { owner: req.user.id }
    })
    .then(profiles => res.status(200).json(profiles))
    .catch(err => res.status(500).json({ error: err }));
})

//PUT '/:name' --- Individual user can update his/her profile
router.put('/update/:id', validateSession, (req, res) =>{
    const updateProfileEntry = {
        name: req.body.profile.name,
        age: req.body.profile.age,
        interestedIn: req.body.profile.interestedIn,
        activities: req.body.profile.interestedIn,
        food: req.body.profile.food
    };
    const query = {
        where: {
            id: req.params.id, 
            owner: req.user.id
        }
    }
    
    Profile.update(updateProfileEntry, query)
    .then((profiles) => res.status(200).json(profiles))
    .catch((err) => res.status(500).json({ error:err })) 

})

//DELETE '/:name' --- Individual user can delete his/her profile
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { 
        where:{id: req.params.id, 
                owner: req.user.id}
    }
    Profile.destroy(query)
    .then(() => res.status(200).json({ message: "Profile Entry Removed"}))
    .catch((err) => res.status(500).json({ error:err }))
})



// GET '/:name' ------- Gets an individual's log by name
router.get('/:name', (req, res) => {
    let name = req.params.name.toLowerCase();

    Profile.findAll({
        where: {name : name}
    })
    .then(profiles => res.status(200).json(profiles))
    .catch(err => res.status(500).json({ error: err }))
})

module.exports= router; 