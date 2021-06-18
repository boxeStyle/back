const mongoose = require('mongoose')
const mongooseSchema = mongoose.Schema

let schema = new mongooseSchema(
	{
		email:{
			type: String,
			required: "E-mail is required"
		},
		password:{
			type: String,
				required: "Password is required",
				min: 8,
				max: 255
		},
		active: {
			type: Boolean,
			default: true
		},
		dateCreate: {
			type: Date,
			default: Date.now()
		},
		dateUpdate: {
			type: Date
		}
	}
);

module.exports = mongoose.model('User', schema)