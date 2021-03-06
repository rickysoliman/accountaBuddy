import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Task from './Task.jsx';
import DateAndTime from './DateAndTime.jsx';
import Modal from './Modal.jsx';

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
        box-shadow: 10px 10px 20px gray;
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

        this.sortByTime = this.sortByTime.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
        this.delete = this.delete.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.receiveDateAndTime = this.receiveDateAndTime.bind(this);
        this.checkForAlerts = this.checkForAlerts.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }

    componentDidMount() {
        this.fetchTasks();
    }

    sortByTime(array) {
        array.sort((a, b) => {
            return Date.parse('06/21/1992 ' + a.time) - Date.parse('06/21/1992 ' + b.time);
        });
        return array;
    }

    fetchTasks() {
        axios.get('/api/tasks')
            .then(res => {
                var data = res.data;
                data = this.sortByTime(data);
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
        var id;
        for (let i = 0; i < this.state.tasks.length; i++) {
            var currentTask = this.state.tasks[i];
            if (currentTask.task === task) {
                id = currentTask.task_id;
                break;
            }
        }
        console.log(id);
        axios.delete(`/api/tasks/${id}/delete`)
            .then(res => {
                console.log(res.status);
            })
            .catch(err => {
                console.log(err.stack);
            });
        this.fetchTasks();
    }

    saveTask(message, time) {
        this.props.close();
        if (message === '') {
            return null;
        }
        for (let i = 0; i < this.state.tasks.length; i++) {
            var task = this.state.tasks[i];
            if (task.task === message) {
                window.alert('This item is already on your list!');
                return null;
            }
        }
        var newTask = {
            completed: 0,
            task: message,
            time: time
        };
        axios.post('/api/tasks', newTask)
            .then(res => {
                this.fetchTasks();
            })
            .catch(err => {
                console.log(err.stack);
            });
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
                if (task.completed === false) {
                    if (task.time) {
                        var currentHour = Number(this.state.time.split(':')[0]);
                        var currentMinute = Number(this.state.time.split(':')[1]);
                        var currentSecond = Number(this.state.time.split(':')[2].slice(0, 2));
                        var currentDaytime = this.state.time.split(':')[2].slice(3);
                        var taskHour = Number(task.time.split(':')[0]);
                        var taskMinute = Number(task.time.split(':')[1].slice(0, 2));
                        var taskDaytime = task.time.split(':')[1].slice(3);

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

    toggleCompletion(task) {
        var id;
        for (let i = 0; i < this.state.tasks.length; i++) {
            var current = this.state.tasks[i];
            if (current.task === task) {
                id = current.task_id;
            }
        }
        axios.get(`/api/tasks/${id}/toggle`)
            .then(res => {
                this.fetchTasks();
            })
            .catch(err => {
                console.log(err.stack);
            });
    }

    render() {
        const tasks = this.state.tasks.map(task => {
            return (
                <>
                    <Task onClick={this.toggleCompletion} id={task.task} task={task.task} completed={task.completed} time={task.time}/>
                    <Delete id={task.task} onClick={this.delete}>Delete</Delete>
                </>
            )
        });
        return (
            <>
                <Modal handleChange={this.handleChange} saveTask={this.saveTask} show={this.props.show} close={this.props.close}/>
                <DateAndTime transferDateAndTime={this.receiveDateAndTime}/>
                <Title>Task List</Title>
                <List>{tasks}</List>
            </>
        )
    }
}

export default TaskList;