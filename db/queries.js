const { Pool } = require('pg');

const pool = new Pool({
    user: 'rickymarasigan',
    host: 'localhost',
    database: 'accountabuddy',
    password: 'C#minor7',
    port: 5432
});

module.exports = pool;