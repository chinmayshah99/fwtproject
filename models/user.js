// user database schema

var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    first_name:{
        type: String,
	required: true
    },
    last_name:{
        type: String,
	required: true
    }
});

const User = module.exports = mongoose.model('user_login', UserSchema);
