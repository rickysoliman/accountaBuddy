import React from 'react';
import styled from 'styled-components';
import Task from './Task.jsx';

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
            tasks: [
                {task: 'take out the trash', completed: false, deleted: false},
                {task: 'feed the cat', completed: false, deleted: false},
                {task: 'love Suzzy', completed: false, deleted: false}
            ],
            newTask: ''
        }

        this.delete = this.delete.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        input.value = '';
        var newTask = {
            completed: false,
            deleted: false
        };
        newTask.task = this.state.newTask;
        var newState = this.state.tasks;
        newState.push(newTask);
        this.setState({
            tasks: newState,
            newTask: ''
        });
    }

    handleChange(e) {
        var text = e.target.value;
        this.setState({
            newTask: text
        });
    }

    render() {
        const tasks = this.state.tasks.map(task => {
            if (!task.deleted) {
                return (
                    <>
                        <Task task={task.task} completed={task.completed}/>
                        <Delete id={task.task} onClick={this.delete}>Delete</Delete>
                    </>
                )
            }
        });
        return (
            <>
                <Input onChange={this.handleChange} id="input" rows={5} placeholder="What do you need to do?"/>
                <Button onClick={this.saveTask}>Save</Button>
                <Title>Task List</Title>
                <List>{tasks}</List>
            </>
        )
    }
}

export default TaskList;