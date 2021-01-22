import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Button = styled.button`
    background-color: ${props => props.completed ? '#CCDAD1' : '#3E92CC'};
    border-radius: 5px;
    font-family: Arial;
    font-size: 2em;
    color: white;
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
    border: 3px solid transparent;
    width: fit-content;
    height: fit-content;
    margin: 5px;
    &:hover {
        cursor: pointer;
        border: 3px solid #16324F;
    }
`;

const Time = styled.div`
    font-family: Arial;
    font-size: 20px;
    color: white;
`;

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task: this.props.task,
            completed: this.props.completed,
            time: this.props.time,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
            completed: !this.state.completed
        });
        this.props.onClick(this.state.task);
    }

    render() {
        return (
            this.state.time === null ? 
                <Button onClick={this.handleClick} completed={this.state.completed}>{this.props.task}</Button> :
                <>
                    <Button onClick={this.handleClick} completed={this.state.completed}>{this.props.task}{<Time>{this.state.time}</Time>}</Button>
                </>
        )
    }
}

export default Task;