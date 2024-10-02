import moment from 'moment';
import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const DateTimePicker = ({ selectedDate, handleDateChange }) => {
    const yesterday = moment().subtract(1, 'day');
    const valid = (current) => {
        return current.isAfter(yesterday);
    }
    return (
        <Datetime
            //isValidDate={valid}
            value={selectedDate}
            onChange={handleDateChange}
            dateFormat="YYYY-MM-DD"
            timeFormat="hh:mm A"
        // timeFormat="HH:mm:ss.SSZ"
        />





    );
};

export default DateTimePicker;
