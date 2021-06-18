const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/db.config')
const userRoute = require('./routes/userRoute');
const sessionRoute = require('./routes/sessionRoute');
const timerRoute = require('./routes/timerRoute');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

dbConnect()

userRoute(app);
sessionRoute(app);
timerRoute(app);

app.listen(process.env.PORT, () =>console.log('Host: ' + process.env.HOST + '| Port: ' + process.env.PORT))

module.exports = app;