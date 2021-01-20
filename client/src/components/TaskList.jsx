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
                'do the dishes',
                'clean my room',
                'love Suzzy'
            ]
        }

        this.delete = this.delete.bind(this);
    }

    delete(e) {
        var task = e.target.id;
        var index = this.state.tasks.indexOf(task);
        var newState = this.state.tasks;
        newState.splice(index, 1);
        this.setState({
            tasks: newState
        });
    }

    render() {
        const tasks = this.state.tasks.map(task => {
            return (
                <>
                    <Task task={task}/>
                    <Delete id={task} onClick={this.delete}>Delete</Delete>
                </>
            )
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