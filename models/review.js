var mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    first_name:{
        type: String,
		required: true
    },
    location:{
        type: String,
		required: true
    },
	review:{
		type: String
	}
});

const Review = module.exports = mongoose.model('user_review', BlogSchema);