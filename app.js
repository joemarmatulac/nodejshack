'use strict';
var dotenv = require('dotenv').config();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config/mongoConnString');
var apiController = require('./controller/apiController');
var setupController = require('./controller/setUpController');
var sqlController = require('./controller/sqlController');


var port = process.env.PORT || 3000;

mongoose.connect(config.mongoConnectionString());
setupController.initTodo(app);
apiController.initApp(app);
apiController.mcalls.byTodoId(app);
apiController.mcalls.byUname(app);
apiController.mcalls.delete(app);
apiController.mcalls.findAll(app);
sqlController(app);

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

console.log(port);
app.listen(port);