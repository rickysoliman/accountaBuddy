import React from 'react';
import styled from 'styled-components';

const MainView = styled.div`
    display: flex;
    justify-content: center;
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
            </MainView>
        )
    }
}

export default App;