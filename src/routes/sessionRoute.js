const verify = require('../utils/jwt')
const sessionController = require('../controllers/sessionController')

module.exports = (app) => {
    app.route('/session')
        .post(verify.requiredToken, sessionController.setSession);
    app.route('/session/:id')
        .get(verify.requiredToken, sessionController.getSessionById)
        .delete(verify.requiredToken, sessionController.deleteSession);
	app.route('/session/activeSession')
		.get(verify.requiredToken, sessionController.getActiveSessionByUser)
    app.route('/sessions')
        .get(verify.requiredToken, sessionController.getAllSessionsByUser)
}