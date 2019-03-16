// user database schema

import mongoose from 'monggose';

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

const User = module.exports = mongoose.model('Contact', UserSchema);