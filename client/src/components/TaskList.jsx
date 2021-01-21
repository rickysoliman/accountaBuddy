import React from 'react';
import styled from 'styled-components';
import Task from './Task.jsx';

const Title = styled.h1`
    font-family: Arial;
    text-align: center;
    font-size: 1em;
`;

const List = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Delete = styled.button`
    border-radius: 5px;
    background-color: red;
    color: white;
    &:hover {
        cursor: pointer;
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
            ]
        }

        this.delete = this.delete.bind(this);
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
        console.log(index);
        var newState = this.state.tasks;
        newState[index].deleted = true;
        this.setState({
            tasks: newState
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
                <Title>Task List</Title>
                <List>{tasks}</List>
            </>
        )
    }
}

export default TaskList;