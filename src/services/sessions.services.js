const mongoose = require('mongoose')
const Model = mongoose.model("Session")
const ApplicationError = require("../errors/application.errors")
const {isValid} = require('../utils/validationParams')

/**
 *  Check if a document exists and is valid given its id. Throws errors accordingly if not.
 *  @param {String} id
 *  @return true
 * */
exports.checkId = async (id) => {
    if (!isValid(id)) {
        throw new ApplicationError("This id is not valid : " + id, 400)
    } else {
        const exist = await Model.exists({_id: id})
        if (!exist) throw new ApplicationError("This id do not exist : " + id, 400)
    }

    return true
}

exports.checkActive = async (id) => {

	const filter = {
		sessionId: id,
		state: true,
	}

	const isActive = await Model.find(filter).exec((error, result) => {
		if (error) console.log(error)
		return !!result
	})

	if (!isActive) throw new ApplicationError("The session Id provided isn't active")
	return true
}