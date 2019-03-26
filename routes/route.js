var express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const User = require('../models/user');

// password encryption
var bcrypt = require('bcrypt');

// encrypts password
function cryptPassword(password) {
    var salt1 = bcrypt.genSaltSync(8);
	return bcrypt.hashSync(password,salt1,null);
};


function comparePassword(plainPass, hashword) {
   return bcrypt.compareSync(plainPass, hashword);
};

// signup 
// post method
router.post('/signup/',urlencodedParser, (req,res,next)=>{
    console.log(JSON.stringify(req.body));
    let newUser = new User({
        email: req.body.emaill,
        password: cryptPassword(req.body.password),
        first_name: req.body.first,
        last_name: req.body.last
    });
    console.log(newUser);

    newUser.save(function(err){
        if(err){
            // log the error
            res.redirect('/signin.html')
        }
        else{
        		req.session.user = user._id;
		    	res.send('hello');
		        // res.redirect('/test.html');
		}
    });
});

// login
// get method
router.post('/login',urlencodedParser,(req,res,next)=>{
	console.log(req.body);
    User.findOne({'email': req.body.email},'password').exec(function(err, user){
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
                // check for invalid password
                
                if(comparePassword(req.body.password,user.password)){
                    req.session.user = user._id;
                    // res.send(user);
                    return res.redirect('/');    
                }
                else{
                    return res.redirect('/sigin.html');    
                }
				
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
