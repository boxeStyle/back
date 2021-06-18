const mongoose = require('mongoose')
const schema = require('../models/timerModel')
const Model = mongoose.model("Timer")
const sessionService = require('../services/sessions.services')
const timerService = require('../services/timers.services')
const {errorHandler} = require('../utils/errorsHandler')

exports.setTimer = async (req, res) => {
    try {
        const session = req.body.sessionId
        await sessionService.checkId(session)
        await sessionService.checkActive(session)

        const filter = {
            sessionId: session,
            end: null,
        }

        const isActive = await Model.findOne(filter, (error, result) => {
            if (error) console.log(error)
            return !!result
        })

        if (isActive) {
            const filter = {
                _id: isActive._id
            }

            const update = {
                end: Date.now()
            }

            Model.findOneAndUpdate(filter, update, {new: true}, async (error, updated) => {
                if (error) console.log(error)

                res.status(200).json({
                    message: "Timer stopped",
                    active: false,
                    data: updated
                })
            })

        } else {
            const newObject = new schema({
                sessionId: session,
                type: req.body.type,
            })

            newObject.save((error, created) => {
                if (error) console.log(error)

                res.status(200).json({
                    message: "Timer started",
                    active: true,
                    data: created
                })
            })
        }
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getTimersBySession = async (req, res) => {
    try {
        const session = req.params.id
        await sessionService.checkId(session)

        const filter = {
            sessionId: session
        }

        Model.find(filter).exec((error, result) => {
            if (error) console.log(error)
            res.status(200).json(result)
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getActiveTimerBySession = async (req, res) => {
    try {
        const session = req.params.id
        await sessionService.checkId(session)

        const filter = {
            sessionId: session,
			end: null,
        }

        Model.find(filter).exec((error, result) => {
            if (error) console.log(error)
            res.status(200).json(result)
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

exports.deleteTimer = async (req, res) => {
    try {
        const timer = req.params.id
        await timerService.checkId(timer)

        const filter= {
            _id: req.params.id
        }

        Model.remove(filter, (error) => {
            res.status(200).json({"message": "timer successfully removed"})
            if (error) console.log(error)
        })

    } catch (error) {
        errorHandler(error, res)
    }
}
