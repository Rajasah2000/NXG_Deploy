import React from 'react'

const FareSummary = () => {
    return (
        <>
            <section className="fare-summary">
                <p className="fare-summarypara">FARE SUMMARY</p>
                <p className="person-amount">1 Adult</p>
                <div className="diviser" />
                <div className="fee-slip">
                    <div className="base-fare">
                        <span className="base-fare-btn">
                            <i className="fa-solid fa-plus" />
                        </span>
                        <span className="base-fare-title">Base Fare</span>
                        <div className="person-count">
                            <span className="person-img">
                                <img
                                    src="./images/price_adult-1645003922.png"
                                    width="20px"
                                    alt=""
                                />
                            </span>
                            <span className="person-calculation">Adult (1 x ₹5,048)</span>
                        </div>
                    </div>
                    <div className="base-fare-amount">
                        <p className="base-money">₹5,048</p>
                        <p className="base-money-rev">₹5,048</p>
                    </div>
                </div>
                <div className="diviser" />
                <div className="taxes">
                    <p className="tax-title">Taxes and Surcharges</p>
                    <p className="base-money">₹1,369</p>
                </div>
                <div className="diviser" />
                <div className="fee-slip">
                    <div className="charity">
                        <img src="./images/covid charity.png" width="18px" alt="" />
                        <span className="chrity-text">
                            Donate <b>₹10</b> to build resilient travel destinations.
                        </span>
                    </div>
                    <input type="checkbox" />
                </div>
                <div className="diviser" />
                <div className="grand-total">
                    <p className="grand-total-title">Grand Total</p>
                    <p className="grand-total-amount">₹6,417</p>
                </div>
            </section>
        </>
    )
}

export default FareSummary