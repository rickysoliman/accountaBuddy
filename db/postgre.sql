\c dvdrental;

DROP DATABASE IF EXISTS accountabuddy;

CREATE DATABASE accountabuddy WITH OWNER rickymarasigan;

\c accountabuddy;

CREATE SCHEMA accountabuddy;

CREATE TABLE tasks (
    task_id SERIAL,
    task VARCHAR(50) NOT NULL,
    completed BOOLEAN NOT NULL,
    time VARCHAR(50),
    PRIMARY KEY (task_id)
);

/*
INSERT INTO tasks (task, completed, time) VALUES('do the dishes', 0, '2:58pm');
*/

SELECT * FROM tasks;

/*
\i '/Users/rickymarasigan/Desktop/accountaBuddy/db/postgre.sql';
*/