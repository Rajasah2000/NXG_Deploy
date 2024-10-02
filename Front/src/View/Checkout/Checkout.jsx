import React, { useContext, useEffect } from 'react'
import './Checkout.css';
import CheckDeparture from "../Checkout/CheckDeparture";
import CheckCancelSec from "../Checkout/CheckCancelSec";
import FareSummary from "../Checkout/FareSummary";
import CheckDiscount from "../Checkout/CheckDiscount"
import { Colorcontext } from '../../Components/Context/ColorContext';
const Checkout = () => {
    const colordata = useContext(Colorcontext);
    useEffect(() => {
        colordata.setcolor(true);
        return () => {
            colordata.setcolor(false);
        };
    }, []);
    return (
        <>
         <div className="header-margin" />
            <section className='checkoutSec'>

                {/* <Banner image={bannerimg} text='Review your booking' /> */}

                <div className="CheckoutMain">
                    <div className="container">
                        <div className="main-container">
                            <div className="checkMainLeft">
                                <CheckDeparture />
                                <CheckCancelSec />
                            </div>

                            <div className="right-sections">
                                <FareSummary />
                                <CheckDiscount />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout
