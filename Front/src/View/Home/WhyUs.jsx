import React from "react";
import icon1 from "../../Images/featureIcons/3/1.svg";
import icon2 from "../../Images/featureIcons/3/2.svg";
import icon3 from "../../Images/featureIcons/3/3.svg";
import icon4 from "../../Images/featureIcons/3/4.svg";
import v1 from "../../Images/2 (131).svg";
import v2 from "../../Images/Range-aircraft.png";
import v3 from "../../Images/2 (121).svg";
function WhyUs() {
  return (
    <>
      {/* <section className="layout-pt-lg layout-pb-md">
      <div className="container">
        <div className="row y-gap-30">
          <div className="col-xl-4 col-lg-5">
            <h2 className="text-30 fw-600">Why Choose Us</h2>
            <p className="mt-5">These popular destinations have a lot to offer</p>

            <p className="text-dark-1 mt-40 sm:mt-20">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

   
            <button className='whyus_btn'>
             <span className='why-btn-text'>Learn More</span> 
             <div className="icon-arrow-top-right"></div>
            </button>

          </div>

          <div className="col-xl-6 offset-xl-1 col-lg-7">
            <div className="row y-gap-60">

              <div data-anim-child="slide-up delay-3" className="col-sm-6">
                <img src={icon1} alt="image" className="size-60"/>
                <h5 className="text-18 fw-500 mt-10">Best Price Guarantee</h5>
                <p className="mt-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              <div data-anim-child="slide-up delay-4" className="col-sm-6">
                <img src={icon2} alt="image" className="size-60"/>
                <h5 className="text-18 fw-500 mt-10">Best Price Guarantee</h5>
                <p className="mt-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              <div data-anim-child="slide-up delay-5" className="col-sm-6">
                <img src={icon3} alt="image" className="size-60"/>
                <h5 className="text-18 fw-500 mt-10">Best Price Guarantee</h5>
                <p className="mt-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              <div data-anim-child="slide-up delay-6" className="col-sm-6">
                <img src={icon4} alt="image" className="size-60"/>
                <h5 className="text-18 fw-500 mt-10">Best Price Guarantee</h5>
                <p className="mt-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section> */}
      <section className="layout-pt-lg layout-pb-md">
        <div data-anim-wrap="" className="container">
          <div
            data-anim-child="slide-up delay-1"
            className="row justify-center text-center"
          >
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Why Choose DJ Booking Service
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  When time, service and speed is needed
                </p>
              </div>
            </div>
          </div>
          <div className="row y-gap-40 justify-between pt-50">
            <div
              data-anim-child="slide-up delay-2"
              className="col-lg-4 col-md-6 col-sm-6"
            >
              <div className="featureIcon -type-1 ">
                <div className="d-flex justify-center CharterService_icon">
                  <img
                    src={v1}
                    data-src="img/featureIcons/1/1.svg"
                    alt="image"
                    className="js-lazy"
                  />
                </div>
                <div className="text-center mt-30">
                  <h4 className="text-18 fw-500">Top Talent Access</h4>
                  <p className="text-15 mt-10">
                    Gain exclusive access to a wide range of top DJs and music
                    artists, ensuring your event features exceptional and
                    memorable performances.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-anim-child="slide-up delay-3"
              className="col-lg-4 col-md-6 col-sm-6"
            >
              <div className="featureIcon -type-1 ">
                <div className="d-flex justify-center CharterService_icon">
                  <img
                    style={{ height: "70px", width: "120px" }}
                    src="https://cdn.pixabay.com/photo/2017/11/08/14/42/event-2930674_640.png"
                    data-src="img/featureIcons/1/2.svg"
                    alt="image"
                    className="js-lazy"
                  />
                </div>

                <div className="text-center mt-30">
                  <h4 className="text-18 fw-500">Custom Event Experience</h4>
                  <p className="text-15 mt-10">
                    Personalize your event with a DJ who can adapt to your
                    specific music preferences, creating an atmosphere that
                    perfectly matches your audience's taste.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-anim-child="slide-up delay-4"
              className="col-lg-4 col-md-6 col-sm-6"
            >
              <div className="featureIcon -type-1 ">
                <div className="d-flex justify-center CharterService_icon">
                  <img
                    src={v3}
                    data-src="img/featureIcons/1/3.svg"
                    alt="image"
                    className="js-lazy"
                  />
                </div>
                <div className="text-center mt-30">
                  <h4 className="text-18 fw-500">Hassle-Free Booking</h4>
                  <p className="text-15 mt-10">
                    Enjoy a seamless booking process with comprehensive support,
                    from selecting the right DJ to managing all logistics,
                    ensuring your event runs smoothly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyUs;
