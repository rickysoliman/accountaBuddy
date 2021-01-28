import React from 'react';
import styled from 'styled-components';

const ModalBox = styled.div`
    position: fixed;
    top: 30%;
    left: 20;
    width: 500px;
    height: 250px;
    border-radius: 15px;
    z-index: 3;
    text-align: center;
    background-color: white;
    border: 2px solid black;
    box-shadow: 10px 10px 20px gray;
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
    background-color: ${props => props.value === 'X' ? 'red' : 'white'};
    color: ${props => props.value === 'X' ? 'white' : 'gray'};
    border-radius: 15px;
    border: 2px solid ${props => props.value === 'X' ? 'black' : 'gray'};
    width: fit-content;
    font-size: 1em;
    &:hover {
        cursor: pointer;
        box-shadow: 10px 10px 20px gray;
    }
`;

const DropDowns = styled.div`
    padding: 20px 0px;
    font-family: Arial;
    color: gray;
    display: flex;
    justify-content: center;
    z-index: 5;
`;

const Select = styled.select`
    backgoround-color: transparent;
    border: none;
    color: green;
    font-size: 1em;
    &:hover {
        cursor: pointer;
    }
`;

const Option = styled.option`
    background-color: transparent;
`;

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            hour: '',
            minute: '',
            daytime: ''
        }

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleHourChange = this.handleHourChange.bind(this);
        this.handleMinuteChange = this.handleMinuteChange.bind(this);
        this.handleDaytimeChange = this.handleDaytimeChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleMessageChange(e) {
        var message = e.target.value;
        this.setState({
            message: message
        });
    }

    handleHourChange(e) {
        var hour = e.target.value;
        this.setState({
            hour: hour
        });
    }

    handleMinuteChange(e) {
        var minute = e.target.value;
        this.setState({
            minute: minute
        });
    }

    handleDaytimeChange(e) {
        var daytime = e.target.value;
        this.setState({
            daytime: daytime
        });
    }

    save() {
        var time;
        var message;
        if (this.state.hour === '' && this.state.minute === '' && this.state.daytime === '') {
            time = null;
        } else {
            time = `${this.state.hour}:${this.state.minute} ${this.state.daytime}`;
        }
        message = this.state.message;
        this.setState({
            message: '',
            hour: '',
            minute: '',
            daytime: ''
        });
        this.props.saveTask(message, time);
    }

    render() {
        if (this.props.show) {
            return (
                <>
                    <ModalBox>
                        <Input onChange={this.handleMessageChange} id="input" rows={5} placeholder="What do you need to do?" />
                        <DropDowns>
                            <div>Time?</div>
                            <Select name="hour" value={this.state.hour} onChange={this.handleHourChange}>
                                <Option value="" selected disabled hidden>{this.state.hour}</Option>
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                                <Option value={5}>5</Option>
                                <Option value={6}>6</Option>
                                <Option value={7}>7</Option>
                                <Option value={8}>8</Option>
                                <Option value={9}>9</Option>
                                <Option value={10}>10</Option>
                                <Option value={11}>11</Option>
                                <Option value={12}>12</Option>
                            </Select>
                            <div>:</div>
                            <Select name="minute" value={this.state.minute} onChange={this.handleMinuteChange}>
                                <Option value="" selected disabled hidden>{this.state.minute}</Option>
                                <Option value="00">00</Option>
                                <Option value="01">01</Option>
                                <Option value="02">02</Option>
                                <Option value="03">03</Option>
                                <Option value="04">04</Option>
                                <Option value="05">05</Option>
                                <Option value="06">06</Option>
                                <Option value="07">07</Option>
                                <Option value="08">08</Option>
                                <Option value="09">09</Option>
                                <Option value="10">10</Option>
                                <Option value="11">11</Option>
                                <Option value="12">12</Option>
                                <Option value="13">13</Option>
                                <Option value="14">14</Option>
                                <Option value="15">15</Option>
                                <Option value="16">16</Option>
                                <Option value="17">17</Option>
                                <Option value="18">18</Option>
                                <Option value="19">19</Option>
                                <Option value="20">20</Option>
                                <Option value="21">21</Option>
                                <Option value="22">22</Option>
                                <Option value="23">23</Option>
                                <Option value="24">24</Option>
                                <Option value="25">25</Option>
                                <Option value="26">26</Option>
                                <Option value="27">27</Option>
                                <Option value="28">28</Option>
                                <Option value="29">29</Option>
                                <Option value="30">30</Option>
                                <Option value="31">31</Option>
                                <Option value="32">32</Option>
                                <Option value="33">33</Option>
                                <Option value="34">34</Option>
                                <Option value="35">35</Option>
                                <Option value="36">36</Option>
                                <Option value="37">37</Option>
                                <Option value="38">38</Option>
                                <Option value="39">39</Option>
                                <Option value="40">40</Option>
                                <Option value="41">41</Option>
                                <Option value="42">42</Option>
                                <Option value="43">43</Option>
                                <Option value="44">44</Option>
                                <Option value="45">45</Option>
                                <Option value="46">46</Option>
                                <Option value="47">47</Option>
                                <Option value="48">48</Option>
                                <Option value="49">49</Option>
                                <Option value="50">50</Option>
                                <Option value="51">51</Option>
                                <Option value="52">52</Option>
                                <Option value="53">53</Option>
                                <Option value="54">54</Option>
                                <Option value="55">55</Option>
                                <Option value="56">56</Option>
                                <Option value="57">57</Option>
                                <Option value="58">58</Option>
                                <Option value="59">59</Option>
                            </Select>
                            <div></div>
                            <Select name="daytime" value={this.state.daytime} onChange={this.handleDaytimeChange}>
                                <Option value="" selected disabled hidden>{this.state.daytime}</Option>
                                <Option value="AM">AM</Option>
                                <Option value="PM">PM</Option>
                            </Select>
                        </DropDowns>
                        <div class="actions">
                            <Button onClick={this.props.close} value="X">
                                X
                            </Button>
                            <Button onClick={this.save} value="Save">Save</Button>
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