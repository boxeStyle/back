const mongoose = require('mongoose')
const Schema = require('../models/sessionModel')
const Model = mongoose.model("Session")
const sessionService = require('../services/sessions.services')
//const timersServices = require('../services/timers.services')
const {errorHandler} = require('../utils/errorsHandler')

exports.setSession = async (req, res) => {
    try {
        const user = req.user._id

		console.log(user)

        const filter = {
            userId: user,
            state: true
        }

        const isActive = await Model.findOne(filter, (error, result) => {
            if (error) console.log(error)
            return !!result;
        });

        if (isActive) {
			const filter = {
				_id: isActive._id
			}
	
			const update = {
				state: false,
				dateEnd: Date.now(),
			}

			//timersServices.endActiveTimer(isActive._id)
	
			Model.findOneAndUpdate(filter, update, {new: true,}, async (error, updated) => {
				if (error) console.log(error)
				return res.status(200).json(updated)
			})
        } else {
			const newObject = new Schema({
				userId: user,
				workingDuration: req.body.workingDuration,
				breakDuration: req.body.breakDuration,
				objective: req.body.objective,
			})
	
			newObject.save(async (error, created) => {
				if (error) console.log(error)
				return res.status(200).json(created)
			})
		}
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getAllSessionsByUser = async (req, res) => {
	try {
        const filter = {
            userId: req.user._id
        }

        Model.find(filter).exec((error, result) => {
            if (error) console.log(error)
            res.status(200).json(result)
        })
    } catch (error) {
		errorHandler(error, res)
    }
}

exports.getSessionById = async (req, res) => {
	try {
		const session = req.params.id
        await sessionService.checkId(session)
		
        const filter = {
			_id: session
        }
		
        await Model.findById(filter).exec((error, result) => {
			if (error) console.log(error)
            res.status(200).json(result)
        })
		
    } catch (error) {
		errorHandler(error, res)
    }
}

exports.getActiveSessionByUser = async (req, res) => {
    try {
        const filter = {
            userId: req.user._id,
			state: true,
        }

        Model.find(filter).exec((error, result) => {
            if (error) console.log(error)
            res.status(200).json(result)
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

exports.deleteSession = async (req, res) => {
    try {
		const session = req.params.id
        await sessionService.checkId(session)

        const filter = {
            _id: session
        }

        Model.remove(filter, (error) => {
            if (error) console.log(error)
            res.status(200).json({message: "Session successfully removed"})
        })

    } catch (error) {
        errorHandler(error, res)
    }
}
