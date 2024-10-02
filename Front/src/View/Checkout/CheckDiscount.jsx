import React from 'react'
import { Link } from 'react-router-dom'

const CheckDiscount = () => {
    return (
        <>
            <section className="discount-section">
                <p className="discount-title">Apply Discount</p>
                <p className="discount-desc">Have a discount/ promo code to redeem</p>
                <div className="discount-cupon">
                    <input type="text" placeholder="Promo code" />
                    <button className="btn btn-sm btn-rounded btn-primary">
                        Apply
                    </button>
                </div>
                <p className="view-coupons">VIEW ALL COUPONS</p>
               
        </section >
        <div><Link to='/cruisebooking' style={{
                    background: '#e9d22d',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    marginTop: '20px',
                    display: 'inline-block',
                    fontSize: '16px',marginLeft:'auto',display:'table'
                }}>Proceed</Link>
            </div>
        </>
    )
}

export default CheckDiscount