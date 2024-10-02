import React from 'react'

const CheckDeparture = () => {
    return (
        <>
            <div className="departure-arival-section">
                <p className="main-route main-para">Guyana to London</p>
                <p className="main-route-desc main-para">
                    All departure/arrival times are in local time
                </p>
                <div className="main-box">
                    <div className="main-box-boxes ">
                        <div className="plane-logo">
                            <img src="./images/6E.png" alt="" />
                            IndiGo | 6E 427
                        </div>
                        <span className="economy-tagline">
                            ECONOMY | <span className="bold-para">SAVER</span>
                        </span>
                    </div>
                    <div className="main-box-boxes jouerny-time">
                        <p className="main-box-para">
                            Start on<span className="bold-para">- 12 Mar, Tue 2024</span>
                        </p>
                        <p className="main-box-para">
                            Arrive on<span className="bold-para">- 12 Mar, Tue 2024</span>
                        </p>
                    </div>
                    <div className="main-box-boxes">
                        <p className="main-time">19:25</p>
                        <p className="bold-para">2h 10m</p>
                        <p className="main-time">21:35</p>
                    </div>
                    <div className="main-box-boxes port-sort duration">
                        <p className="main-route">CCU</p>
                        <p style={{ color: "grey" }} className="duration-time">
                            Duration
                        </p>
                        <p className="main-route">HYD</p>
                    </div>
                    <div className="main-box-boxes">
                        <p className="bold-para main-route-desc">Guyana</p>
                        <p className="bold-para main-route-desc">London</p>
                    </div>
                    <div className="main-box-boxes airport-name">
                        <p style={{ color: "grey" }} className="airport">
                            Netaji Subhash Chandra Bose International Airport, India
                        </p>
                        <p style={{ color: "grey" }} className="airport arival-port">
                            Rajiv Gandhi International Airport, India
                        </p>
                    </div>
                    <div className="terminal-no1 duration">
                        <p className="terminal">Terminal 1</p>
                    </div>
                    <div className="diviser" />
                    <div className="main-box-boxes">
                        <div className="specificatuion">
                            <span className="specification-para1">Baggage -</span>
                            <span>
                                <i className="fa-solid fa-suitcase-rolling" />
                            </span>
                            <span>7 Kgs (1 piece only)</span>
                            <span className="specification-para1">Cabin</span>
                            <span>
                                <i className="fa-solid fa-weight-hanging" />
                            </span>
                            <span>15 Kgs (1 piece only)</span>
                            <span className="specification-para1">Check-In</span>
                        </div>
                        <a href="/" className="baggage-link">
                            View Baggage Details
                        </a>
                    </div>
                    <div className="middle-area ">
                        <p className="middle-para main-route">
                            2h 15m Layover in Bengaluru
                        </p>
                        <p className="middle-para duration">
                            <img src="./images/fltShadow.png" width="16px" alt="" /> Plane
                            Change
                        </p>
                    </div>
                    <div className="main-box-boxes">
                        <div className="plane-logo">
                            <img src="./images/6E.png" alt="" />
                            IndiGo | 6E 427
                        </div>
                        <span className="economy-tagline">
                            ECONOMY | <span className="bold-para">SAVER</span>
                        </span>
                    </div>
                    <div className="main-box-boxes jouerny-time">
                        <p className="main-box-para">
                            Start on<span className="bold-para">- 12 Mar, Tue 2024</span>
                        </p>
                        <p className="main-box-para">
                            Arrive on<span className="bold-para">- 12 Mar, Tue 2024</span>
                        </p>
                    </div>
                    <div className="main-box-boxes">
                        <p className="main-time">19:25</p>
                        <p className="bold-para">2h 10m</p>
                        <p className="main-time">21:35</p>
                    </div>
                    <div className="main-box-boxes port-sort duration">
                        <p className="main-route">CCU</p>
                        <p style={{ color: "grey" }} className="duration-time">
                            Duration
                        </p>
                        <p className="main-route">HYD</p>
                    </div>
                    <div className="main-box-boxes">
                        <p className="bold-para main-route-desc">Guyana</p>
                        <p className="bold-para main-route-desc">London</p>
                    </div>
                    <div className="main-box-boxes airport-name">
                        <p style={{ color: "grey" }} className="airport">
                            Netaji Subhash Chandra Bose International Airport, India
                        </p>
                        <p style={{ color: "grey" }} className="airport arival-port">
                            Rajiv Gandhi International Airport, India
                        </p>
                    </div>
                    <div className="terminal-no2 duration">
                        <p className="terminal">Terminal 1</p>
                    </div>
                    <div className="diviser" />
                    <div className="main-box-boxes">
                        <div className="specificatuion">
                            <span className="specification-para1">Baggage -</span>
                            <span>
                                <i className="fa-solid fa-suitcase-rolling" />
                            </span>
                            <span>7 Kgs (1 piece only)</span>
                            <span className="specification-para1">Cabin &nbsp;&nbsp;</span>
                            <span>
                                <i className="fa-solid fa-weight-hanging" />
                            </span>
                            <span>15 Kgs (1 piece only)</span>
                            <span className="specification-para1">Check-In</span>
                        </div>
                        <a href="/" className="baggage-link">
                            View Baggage Details
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckDeparture