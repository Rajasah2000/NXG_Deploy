import React, { useState } from 'react';

const CheckCancelSec = () => {

    const [value, setValue] = useState(true);

    const handelonChange = () => {
        setValue(!value)
    }

    const loop = [
        { id: 1, tophead: 'Cancellation Charges', headone: 'Cancel Between (IST)', headtwo: 'Fee For All Passenger(s)', date: 'Now - 13 Mar', time: '16:25', fareone: '₹3800', datefrom: '13 Mar', timefrom: '16:25', dateto: '13 Mar', timeto: '19:25', faretwo: '₹6314', },
        {
            id: 2, tophead: 'Reschedule Charges', headone: 'Reschedule Between (IST)', headtwo: 'Fee For All Passenger(s)', date: 'Now - 13 Mar', time: '16:25', fareone: '₹3550 + Fare difference', datefrom: '13 Mar', timefrom: '16:25', dateto: '13 Mar', timeto: '19:25', faretwo: 'Non Changeable',
        }];

    return (
        <>
            <div className="cancel-section">
                <p className="cancel-title">CANCELLATION &amp; DATE CHANGE POLICY</p>
                <div className="cancel-main-box">
                    <div className="cancel-main-upper-box">
                        <div className="cancel-flight">
                            <span className="flight-logo">
                                <img src="./images/6E.png" width="25px" alt="" />
                            </span>
                            <span className="cancel-route">
                                <p>Guyana - London</p>
                            </span>
                        </div>
                        <div className="cancel-flight">
                            <span className="refund-title">
                                <p>Partially Refundable</p>
                            </span>
                            <span className="action-btn" onClick={handelonChange}>
                                <i className={value ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'} />
                            </span>
                        </div>
                    </div>
                    {value &&
                        <div className="cancel-main-lower-box">
                            {loop.map((item, index) => {
                                return (
                                    <div className="cancelation-reshedule-box" key={index}>
                                        <div className="cancelation-charges-policy-box">
                                            <span className="cancelation-charges">
                                                {item.tophead}
                                            </span>
                                            <span className="cancel-policy">
                                                <a href="/">View Policy</a>
                                            </span>
                                        </div>
                                        <table className='cancelTbl'>
                                            <thead>
                                                <th>{item.headone}</th>
                                                <th>{item.headtwo}</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><span>{item.date},</span>{item.time}</td>
                                                    <td className='boldTd'>{item.fareone}</td>
                                                </tr>
                                                <tr>
                                                    <td><span>{item.datefrom},</span>{item.timefrom} - <span>{item.dateto},</span>{item.timeto}</td>
                                                    <td className='boldTd'>{item.faretwo}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })}

                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default CheckCancelSec