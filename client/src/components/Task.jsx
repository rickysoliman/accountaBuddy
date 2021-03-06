import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background-color: ${props => props.completed ? '#CCDAD1' : '#3E92CC'};
    border-radius: 15px;
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
        box-shadow: 10px 10px 20px gray;
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            task: nextProps.task,
            completed: nextProps.completed,
            time: nextProps.time
        });
    }

    handleClick() {
        this.props.onClick(this.state.task);
    }

    render() {
        return (
            this.state.time === null ? 
                <Button onClick={this.handleClick} completed={this.state.completed}>{this.props.task}</Button> :
                <Button onClick={this.handleClick} completed={this.state.completed}>{this.props.task}{<Time>{this.state.time}</Time>}</Button>
        )
    }
}

export default Task;