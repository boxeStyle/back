const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://' + process.env.DB_CONTAINER + "/" + process.env.DB_NAME, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(
		() => console.log('connected to db')
	).catch(
		err => console.log('MongoDB error when connecting:' + err)
	)
}