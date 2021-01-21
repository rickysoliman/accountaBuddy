import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    // position: relative;
    // display: inline-block;
    // cursor: pointer;
    // outline: none;
    // border: 0;
    // vertical-align: middle;
    // text-decoration: none;
    // font-size: 1.5rem;
    // color:var(--colorShadeA);
    // font-weight: 700;
    // text-transform: uppercase;
    // font-family: inherit;

    // padding: 1em 2em;
    // border: 2px solid var(--colorShadeA);
    // border-radius: 1em;
    // background: var(--colorShadeE);
    // transform-style: preserve-3d;
    // transition: all 175ms cubic-bezier(0, 0, 1, 1);

    // &:before {
    //     position: absolute;
    //     content: '';
    //     width: 100%;
    //     height: 100%;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
    //     background: var(--colorShadeC);
    //     border-radius: inherit;
    //     box-shadow: 0 0 0 2px var(--colorShadeB), 0 0.75em 0 0 var(--colorShadeA);
    //     transform: translate3d(0, 0.75em, -1em);
    //         transition: all 175ms cubic-bezier(0, 0, 1, 1);
    // }

    // &:hover {
    //     background: var(--colorShadeD);
    //     transform: translate(0, 0.375em);
    // }

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