const profile = require('../models/profile');

const router = require('express').Router();
const Profile= require("../db").import("../models/profile");

//POST '/' --- User creates profile


// router.post('/profile', (req, res) => {
//     Profile.name({ where: { name: req.params.Profile }})
//       .then(name => res.status(200).json(name))
//       .catch(err => res.status(500).json({ error: err}))

//   });

//GET '/' --- Pulls up profile for individual user



//PUT '/:name' --- Individual user can update his/her profile

//DELETE '/:name' --- Individual user can delete his/her profile

// GET '/:name' ------- Gets an individual's log by name

module.exports= router; 