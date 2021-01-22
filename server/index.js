const express = require('express');
const path = require('path');
const pool = require('../db/queries.js');
const bodyParser = require('body-parser');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// retrieve all tasks
app.get('/api/tasks', (request, response) => {
    pool
        .query('SELECT * FROM tasks;')
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err.stack);
        });
});

// retrieve a specific task
app.get('/api/tasks/:task_id', (request, response) => {
    var id = request.params.task_id;
    pool
        .query(`SELECT * FROM tasks WHERE task_id = ${id};`)
        .then(res => {
            response.send(res.rows[0]);
        })
        .catch(err => {
            response.send(err.stack);
        });
});

// toggle a task's completion
app.get('/api/tasks/:task_id/toggle', (request, response) => {
    var id = request.params.task_id;
    pool
        .query(`UPDATE tasks SET completed = NOT completed WHERE task_id = ${id};`)
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err.stack);
        });
});

// delete a task
app.delete('/api/tasks/:task_id/delete', (request, response) => {
    var id = request.params.task_id;
    pool
        .query(`DELETE FROM tasks WHERE task_id = ${id};`)
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err.stack);
        });
});

// post a new task
app.post('/api/tasks', (request, response) => {
    const queryString = `INSERT INTO tasks (task, completed, time) VALUES($1, $2, $3);`
    const queryValues = [request.body.task, request.body.completed, request.body.time];
    pool
        .query(queryString, queryValues)
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err.stack);
        });
});

// edit a task


app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});