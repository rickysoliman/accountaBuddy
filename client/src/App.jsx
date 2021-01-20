import React from 'react';
import styled from 'styled-components';
import TaskList from './components/TaskList.jsx';
import Date from './components/Date.jsx';

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

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <MainView>
                <Title>accountaBuddy</Title>
                <Date/>
                <TaskList/>
            </MainView>
        )
    }
}

export default App;