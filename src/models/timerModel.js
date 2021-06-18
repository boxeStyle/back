const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Timer', new Schema(
    {
        sessionId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: "project is required"
        },
        type: {
            type: Boolean,
			default: false
        },
		start: {
            type: Date,
			default: Date.now()
        },
        end: {
            type: Date
        }
    }
))