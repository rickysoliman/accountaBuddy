import React from 'react';
import styled from 'styled-components';

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

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task: this.props.task,
            completed: this.props.completed
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            completed: !this.state.completed
        });
    }

    render() {
        return <Button onClick={this.handleClick} completed={this.state.completed}>{this.props.task}</Button>
    }
}

export default Task;