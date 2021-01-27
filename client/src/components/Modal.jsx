import React from 'react';
import styled from 'styled-components';

const ModalBox = styled.div`
    position: fixed;
    top: 30%;
    left: 20;
    width: fit-content;
    height: fit-content;
    z-index: 3;
    text-align: center;
    background-color: transparent;
`;

const Input = styled.textarea`
    height: auto;
    font-family: Arial;
    background-color: #F4F4F4;
    border-radius: 5px;
    font-size: 1em;
    box-shadow: 10px 10px 20px gray;
    padding: 10px;
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

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.show) {
            return (
                <>
                    <ModalBox>
                        <Input onChange={this.props.handleChange} id="input" rows={5} placeholder="What do you need to do?" />
                        <div class="actions">
                            <Button onClick={this.props.close}>
                                X
                            </Button>
                            <Button onClick={this.props.saveTask}>Save</Button>
                        </div>
                    </ModalBox>
                </>
            )
        } else {
            return null;
        }
    }
}

export default Modal;