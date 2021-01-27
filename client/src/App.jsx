import React from 'react';
import styled from 'styled-components';
import TaskList from './components/TaskList.jsx';

const MainView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Title = styled.h1`
    font-family: Arial;
    text-align: center;
`;

const Button = styled.button`
    background-color: white;
    color: gray;
    border-radius: 15px;
    border: 2px solid gray;
    width: fit-content;
    font-size: 1em;
    &:hover {
        cursor: pointer;
        box-shadow: 10px 10px 20px gray;
    }
`;

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            modal: false
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showModal() {
        this.setState({
            modal: true
        });
    }

    closeModal() {
        this.setState({
            modal: false
        });
    }

    render() {
        return (
            <MainView>
                <Title>accountaBuddy</Title>
                <Button onClick={this.showModal}>New Task</Button>
                <TaskList show={this.state.modal} close={this.closeModal}/>
            </MainView>
        )
    }
}

export default App;