import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Task from './Task.jsx';
import DateAndTime from './DateAndTime.jsx';

const Title = styled.h1`
    font-family: Arial;
    text-align: center;
    font-size: 2em;
    text-decoration: underline;
`;

const List = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Delete = styled.button`
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: red;
    color: white;
    &:hover {
        cursor: pointer;
        border: 1px solid white;
    }
`;

const Input = styled.textarea`
    height: auto;
    font-family: Arial;
    background-color: #F4F4F4;
    border-radius: 5px;
    font-size: 1em;
    box-shadow: 10px 10px 20px gray;
    padding: 10px;
`;

const Button = styled.button`
    border-radius: 5px;
    width: auto;
    height: fit-content;
    border: 1px solid transparent;
    background-color: #F4F4F4;
    box-shadow: 10px 10px 20px gray;
    z-index: 2;
    &:hover {
        cursor: pointer;
        border: 1px solid white;
    }
`;

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            newTask: '',
            date: '',
            time: ''
        }

        this.fetchTasks = this.fetchTasks.bind(this);
        this.delete = this.delete.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.receiveDateAndTime = this.receiveDateAndTime.bind(this);
        this.checkForAlerts = this.checkForAlerts.bind(this);
    }

    componentWillMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        axios.get('/api/tasks')
            .then(res => {
                var data = res.data;
                this.setState({
                    tasks: data
                });
            })
            .catch(err => {
                console.log(err.stack);
            });
    }

    delete(e) {
        var task = e.target.id;
        var index;
        for (let i = 0; i < this.state.tasks.length; i++) {
            var currentTask = this.state.tasks[i].task;
            if (currentTask === task) {
                index = i;
                break;
            }
        }
        var newState = this.state.tasks;
        newState[index].deleted = true;
        this.setState({
            tasks: newState
        });
    }

    saveTask() {
        if (this.state.newTask === '') {
            return;
        }
        var input = document.getElementById('input');
        for (let i = 0; i < this.state.tasks.length; i++) {
            var task = this.state.tasks[i].task;
            var deleted = this.state.tasks[i].deleted;
            if (task === this.state.newTask && !deleted) {
                window.alert('This item is already on your list!');
                input.value = '';
                return;
            }
        }
        var answer = window.confirm('Does this task need to be completed at a specific time?');
        var time;
        if (answer) {
            time = window.prompt('What time does this task need to be completed by?');
        }
        input.value = '';
        var newTask = {
            completed: 0,
            task: this.state.newTask,
            time: time === undefined ? null : time
        };
        axios.post('/api/tasks', newTask)
            .then(res => {
                this.fetchTasks();
                // res.end();
            })
            .catch(err => {
                console.log(err.stack);
            });

        // newTask.task = this.state.newTask;
        // var newState = this.state.tasks;
        // newState.push(newTask);
        // this.setState({
        //     tasks: newState,
        //     newTask: ''
        // });
    }

    handleChange(e) {
        var text = e.target.value;
        this.setState({
            newTask: text
        });
    }

    checkForAlerts() {
        if (this.state.date && this.state.time) {
            for (let i = 0; i < this.state.tasks.length; i++) {
                var task = this.state.tasks[i];
                if (task.deleted === false && task.completed === false) {
                    if (task.time) {
                        var currentHour = Number(this.state.time.split(':')[0]);
                        var currentMinute = Number(this.state.time.split(':')[1]);
                        var currentSecond = Number(this.state.time.split(':')[2].slice(0, 2));
                        var currentDaytime = this.state.time.split(':')[2].slice(3);
                        var taskHour = Number(task.time.split(':')[0]);
                        var taskMinute = Number(task.time.split(':')[1].slice(0, 2));
                        var taskDaytime = task.time.split(':')[1].slice(2);

                        if (currentHour === taskHour && currentMinute === taskMinute && currentDaytime === taskDaytime && currentSecond === 0) {
                            window.alert(`It's time to ${task.task}.`);
                        }
                    }
                }
            }
        }
    }

    receiveDateAndTime(date, time) {
        this.setState({
            date: date,
            time: time
        });
        this.checkForAlerts();
    }

    render() {
        const tasks = this.state.tasks.map(task => {
            if (!task.deleted) {
                return (
                    <>
                        <Task id={task.task} task={task.task} completed={task.completed} time={task.time}/>
                        <Delete id={task.task} onClick={this.delete}>Delete</Delete>
                    </>
                )
            }
        });
        return (
            <>
                <DateAndTime transferDateAndTime={this.receiveDateAndTime}/>
                <Input onChange={this.handleChange} id="input" rows={5} placeholder="What do you need to do?"/>
                <Button onClick={this.saveTask}>Save</Button>
                <Title>Task List</Title>
                <List>{tasks}</List>
            </>
        )
    }
}

export default TaskList;