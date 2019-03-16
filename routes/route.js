var express = require('express');
const router = express.Router();

const User = require('../models/user');
// signup 
// post method
router.post('/contacts',(req,res,next)=>{
console.log(req.body);
    let newUser = new User({
        first_name: req.body.first,
        last_name: req.body.last
    });
console.log(newUser);

    newUser.save(function(err){
        if(err){
            // log the error
res.send(err);
        }
        else{
            // succssfull 
		res.send('hello');
        }
    });
});

// login
// get method
router.get('/login',(req,res,next)=>{
    User.find(function(err, user){
        res.json(user);
    })
});
router.get('/index',function(req,res) {
    res.status(200).send('hi');
});



module.exports = router;
