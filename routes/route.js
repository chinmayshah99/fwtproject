var express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const User = require('../models/user');

// signup 
// post method
router.post('/signup/',urlencodedParser, (req,res,next)=>{
    console.log(JSON.stringify(req.body));
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
		    // res.send('hello');
		    res.redirect('/test.html');
		}
    });
});

// login
// get method
router.post('/login',urlencodedParser,(req,res,next)=>{
	console.log(req.body);
    User.find({'first_name': req.body.first, 'last_name': req.body.last}).exec(function(err, user){
        if(err){
            // log the error
			res.send(err);
        }
        else{
            // succssfull 
			if(user.length === 0){
				res.send('user not found');
			}
			else{
				req.session.userId = user._id;
                res.send(user);
                return res.redirect('/');
			}
        }
    })
});


router.get('/index',function(req,res) {
    res.status(200).send('hi');
});


router.get('/logout',function(req,res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});


module.exports = router;
