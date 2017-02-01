var todos = require('../model/todoModel');
var starterTodos = [
    {
        username: 'joemar',
        todo: 'Buy me milk',
        isDone: false,
        hasAttachement: false
    },
    {
        username: 'joemar',
        todo: 'Learning Node',
        isDone: false,
        hasAttachement: false
    }
];

function initializeTodo(app) {
    app.get('/api/setupTodos', (req, res) => {
        return new Promise((resolve, reject) => {
            todos.create(starterTodos, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        }).then(result => {
            res.end(JSON.stringify(result));
        }).catch(error => {
                throw error;
        })
    });
}

module.exports = {
    initTodo: initializeTodo
}

