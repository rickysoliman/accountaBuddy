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
    }

    render() {
        const tasks = this.state.tasks.map(task => {
            return <Task task={task}/>
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