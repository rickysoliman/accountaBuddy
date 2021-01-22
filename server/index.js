const express = require('express');
const path = require('path');
const pool = require('../db/queries.js');
const bodyParser = require('body-parser');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

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

app.post('/api/tasks', (request, response) => {
    console.log(request.body);
    const queryString = `INSERT INTO tasks (task, completed, time) VALUES($1, $2, $3);`
    const queryValues = ['do the dishes', 0, '2:58pm'];
    pool
        .query(queryString, queryValues)
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err.stack);
        });
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});