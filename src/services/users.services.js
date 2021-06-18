const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Model = mongoose.model("User")
const ApplicationError = require('../errors/application.errors')
const {isValid} = require("../utils/validationParams")
const Joi = require('@hapi/joi');

/**
 *  hash password
 *  @param {String} password
 *  @return hashed password
 * */
exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw new Error("hash error")
    }
}

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

exports.validation = async (data, psw = true) =>{
    const schema = {}

    schema.email = Joi.string().min(8).required().email().error( new ApplicationError('Please insert a valid email',400))
    if (psw) schema.password = Joi.string().min(8).required().error(new ApplicationError('Please insert a password of more than 8 characters',400))

    return Joi.validate(data, schema);
}

/**
 *  Check if the data sent in the request is valid for the operation. Throws errors accordingly if not.
 *  @param {Array} req
 *  @return true
 * */
exports.checkData = async (req) => {
    const isLogged = req.user
    const email = req.body.email
    let used
    
    if (isLogged) {
        const user = isLogged._id
        used = await Model.exists({_id: {$nin: user}, email: email})
        await this.validation(req.body, false)
    } else {
        used = await Model.exists({email: email})
        await this.validation(req.body)
    }

    if (used) throw new ApplicationError('This email is already used')
}