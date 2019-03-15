import express from 'express';

const router = express.Router();

const User = require('../models/user');
// signup 
// post method
router.post('/contacts',(req,res,next)=>{
    let newUser = new User({
        first_name : req.body.first_name,
        last_name: req.body,last_name
    });

    newUser.save((err, user)=>{
        if(err){
            // log the error
        }
        else{
            // succssfull 
        }
    })
});


// login
// get method
router.get('/login',(req,res,next)=>{
    User.find(function(err, user){
        res.json(user);
    })
});


module.exports = router;