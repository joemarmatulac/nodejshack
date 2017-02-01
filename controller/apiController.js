/*jshint esversion: 6*/

var todos = require('../model/todoModel');
var bodyParser = require('body-parser');
var promise = require('promise')

var app = null;
function setupExpresApp(exapp) {
    app = exapp;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}

var mongoCall = {
    byUname: function findTodosByUname(app) {
        app.get('/api/todos/:uname', (req, res) => {
            return new Promise((resolve, reject) => {
                todos.find({ username: req.params.uname }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            }).then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error);
            })
        });
    },

    byTodoId: function findTodoById(app) {
        app.get('/api/todo/:id', (req, res) => {
            return new Promise((resolve, reject) => {
                todos.findById({ _id: req.params.id }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            }).then(result => {
                res.send(result)
            }).catch(error => {
                console.log(error);
            })
        });
    },

    findAll: function findAllTodo(app) {
        app.post('/api/todo', (req, res) => {
            if (req.body.id) {
                return new Promise((resolve, reject) => {
                    todos.findByIdAndUpdate(req.body.id, {
                        todo: req.body.todo, isDone:
                        req.body.isDone, hasAttachment:
                        req.body.body.hasAttachment
                    }, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    })
                }).then(() => {
                    res.send('Success');
                })
            } else {
                var newTodo = todos({
                    username: req.body.username,
                    todo: req.body.todo,
                    isDone: req.body.isDone,
                    hasAttachment: req.body.hasAttachment
                });
                return new Promise((resolve, reject) => {
                    newTodo.save((error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    });
                }).then(() => {
                    res.send('Success');
                }).catch((error) => console.log(error));
            }
        });
    },

    delete: function deleteDotos(app) {
        app.delete('/api/todo', (req, res) => {
            todos.findByIdAndRemove(req.body.id, (err) => {
                if (err) throw err;
                res.send('Success');
            });
        });
    }
}

module.exports = {
    mcalls: mongoCall,
    initApp: setupExpresApp
}