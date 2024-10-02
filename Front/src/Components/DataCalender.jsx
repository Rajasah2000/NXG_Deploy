import moment from 'moment';
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const DataCalender = () => {
    const [date, setDate] = useState("");
console.log("jhgfhghsdgfhsdg", date);

    const onChange = (newDate) => {
      console.log("hjhjhjhjh", moment(new Date(newDate)).format('DD-MM-YYYY'));
      
        setDate(newDate);
    };
    return (
        <div className="calenderDiv">
            <Calendar
                onChange={onChange}
                value={date}
                showNeighboringMonth={true}
                showNavigation={true}
                numberOfMonths={2}
                disableMonthPicker
                disableYearPicker
            />
        </div>
    )
}

export default DataCalender
