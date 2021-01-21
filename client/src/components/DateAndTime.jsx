import React from 'react';
import styled from 'styled-components';

const Clock = styled.div`
    font-family: Courier;
`;

class DateAndTime extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            time: ''
        }

        this.getDate = this.getDate.bind(this);
    }

    getDate() {
        var months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];
        var currentDate = new Date();
        var month = months[currentDate.getMonth()];
        var day = currentDate.getDate();
        var year = currentDate.getFullYear();
        var hh = currentDate.getHours();
        var daytime = 'am';
        if (hh >= 12) {
            daytime = 'pm';
            if (hh > 12) {
                hh -= 12;
            }
        } 
        var mm = currentDate.getMinutes();
        if (mm < 10) {
            mm = `0${mm}`;
        }
        var seconds = currentDate.getSeconds();
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        var time = `${hh}:${mm}:${seconds} ${daytime}`;
        var date = `${month} ${day}, ${year}`;
        this.setState({
            date: date,
            time: time
        });
        this.props.transferDateAndTime(date, time);
        setTimeout(this.getDate, 1000);
    }

    componentWillMount() {
        this.getDate();
    }

    render() {
        return (
            <>
                <Clock>{this.state.date}</Clock>
                <Clock>{this.state.time}</Clock>
            </>
        )
    }
}

export default DateAndTime;