import React from 'react'

const HelicopterCharterEnquiry = () => {
    return (
        <>
            <section className='HelicopterCharterEnquiry_sec' id='CharterEnquiryForm'>
                <div className='container'>
                    <h2 className='heading'>Helicopter Charter Enquiry Form</h2>
                    <p className='desc'>Tell us your requirements and one of our charter experts will provide you with a no obligation quote as soon as possible.</p>

                    <form>

                        <div className="form-group">
                            <label>Name<span>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Full Name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number<span>*</span></label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Phone Number"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email<span>*</span></label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Departing<span>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="From"
                            />
                        </div>

                        <div className="form-group">
                            <label>Destination<span>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="To"
                            />
                        </div>

                        <div className="form-group">
                            <label>Return Date & Time<span>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Date & Time"
                            />
                        </div>

                        <div className="form-group">
                            <label>Number of Passengers<span>*</span></label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Number of Passengers"
                            />
                        </div>

                        <div className="form-group">
                            <label>Luggage</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Luggage"
                            />
                        </div>


                        <div className="form-group">
                            <label>Additional Information</label>
                            <textarea
                                className="form-control"
                                rows={5}
                                defaultValue={""}
                            />
                        </div>


                        <button type="submit" className="Submit_btn">
                            Submit
                        </button>

                    </form>



                </div>
            </section>
        </>
    )
}

export default HelicopterCharterEnquiry