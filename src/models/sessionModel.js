const mongoose = require('mongoose')
const mongooseSchema = mongoose.Schema

let schema = new mongooseSchema(
    {
        userId: [{
            type: mongooseSchema.Types.ObjectId,
            ref: 'User',
            required: "User is required",
        }],
        workingDuration: {
            type: Number,
            default: 25
        },
        breakDuration: {
            type: Number,
            default: 5
        },
		objective: {
			type: Number,
			default: 3
		},
		state: {
			type: Boolean,
			default: true
		},
		dateCreate: {
			type: Date,
			default: Date.now()
		},
		dateEnd: {
			type: Date
		}
	}
);

module.exports = mongoose.model('Session', schema)