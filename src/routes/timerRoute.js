const verify = require('../utils/jwt')
module.exports = (app) => {
    let timerController = require('../controllers/timerController')
    app.route('/timer/')
        .post(verify.requiredToken, timerController.setTimer);
    app.route('/timer/:id')
        .delete(verify.requiredToken, timerController.deleteTimer);
    app.route('/timer/session/:id')
        .get(verify.requiredToken, timerController.getTimersBySession);
	app.route('/timer/activeTimer/:id')
        .get(verify.requiredToken, timerController.getActiveTimerBySession);
}