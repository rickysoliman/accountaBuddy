\c dvdrental;

DROP DATABASE IF EXISTS accountabuddy;

CREATE DATABASE accountabuddy WITH OWNER rickymarasigan;

\c accountabuddy;

CREATE SCHEMA accountabuddy;

CREATE TABLE tasks (
    task_id SERIAL,
    task VARCHAR(50) NOT NULL,
    PRIMARY KEY (task_id)
);

SELECT * FROM tasks;

/*
\i '/Users/rickymarasigan/Desktop/accountaBuddy/postgre.sql';
*/