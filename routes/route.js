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
	return bcrypt.hashSync(password, salt1, null);
};


function comparePassword(plainPass, hashword) {
   return bcrypt.compareSync(plainPass, hashword);
};

// signup 
// post method
router.post('/signup/',urlencodedParser, (req, res, next)=>{
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
        		// req.session.user = user._id;
		    	// res.send('hello');
		        res.redirect('/signin.html');
		}
    });
});

// login
// post method
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
                    // req.session.user = user._id;
                    // res.send(user);
                    res.redirect('/welcome.html');
                }
                else{
                    return res.redirect('/sigin.html');    
                }		
			}
        }
    })
});


// review post 
// post method
router.get('/reviewpost/',urlencodedParser, (req,res,next)=>{
    console.log(JSON.stringify(req.body));
    let newReview = new Review({
        user_id: req.session.user,
        location: req.body.location,
        a_review: req.body.rreview
    });
    console.log(newReview);

    newReview.save(function(err){
        if(err){
            // log the error
            console.log(err);
        }
        else{
		    	// res.send('hello');
		        res.redirect('/welcome.html');
		}
    });
});


// display last N reviews 
// post method
router.get('/reviewsearchtotal/',urlencodedParser, (req,res,next)=>{
    console.log(JSON.stringify(req.body));
    Review.find().reverse().limit(3).exec(function(err, user){
        if(err){
            // log the error
			res.send(err);
        }
        else{
            // succssfull 
			if(user.length === 0){
				res.send('review not found');
			}
			else{
                    return res.redirect('/');    
            }				
		}
    })
});



// display last N reviews by location 
// post method
router.get('/reviewsearch/',urlencodedParser, (req,res,next)=>{
    console.log(JSON.stringify(req.body));
    Review.find({'location': req.body.location},'a_review').reverse().limit(3).exec(function(err, user){
        if(err){
            // log the error
			res.send(err);
        }
        else{
            // succssfull 
			if(user.length === 0){
				res.send('review not found');
			}
			else{
                    return res.redirect('/');    
            }		
		}
    })
});


// review search by user
// post method
router.get('/reviewsearch/',urlencodedParser, (req,res,next)=>{
    console.log(JSON.stringify(req.body));
    Review.find({'user_id': req.session.user},'location a_review').reverse().limit(3).exec(function(err, user){
        if(err){
            // log the error
			res.send(err);
        }
        else{
            // succssfull 
			if(user.length === 0){
				res.send('review not found');
			}
			else{
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
        res.clearCookie('user_sid');
        res.redirect('/');
    }
});


module.exports = router;
