import React from "react";
import "animate.css";
function PopularDestiny() {
  return (
    <>
      <section className="layout-pt-lg layout-pb-md animate__animated animate__fadeInLeft" id="secondSection">
        <div data-anim-wrap className="container">
          <div
            data-anim-child="slide-up delay-1"
            className="row y-gap-20 justify-center text-center"
          >
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Popular Destinations</h2>
                <p className=" sectionTitle__text mt-2 sm:mt-0">
                  Interdum et malesuada fames ac ante ipsum
                </p>
              </div>
            </div>
          </div>

          <div className="row x-gap-10 y-gap-10 pt-40 sm:pt-20">
            <div
              data-anim-child="slide-up delay-2"
              className="col-xl col-lg-3 col-6"
            >
              <a
                href="#"
                className="citiesCard -type-5 d-flex items-center sm:flex-column sm:items-start px-20 py-20 sm:px-15 sm:py-20 bg-light-2 rounded-4"
              >
                <i className="icon-destination text-24"></i>

                <div className="ml-10 sm:ml-0 sm:mt-10">
                  <h4 className="text-16 fw-500">Guyana</h4>
                  <p className="text-14">4,090 Helicopters</p>
                </div>
              </a>
            </div>

            <div
              data-anim-child="slide-up delay-3"
              className="col-xl col-lg-3 col-6"
            >
              <a
                href="#"
                className="citiesCard -type-5 d-flex items-center sm:flex-column sm:items-start px-20 py-20 sm:px-15 sm:py-20 bg-light-2 rounded-4"
              >
                <i className="icon-destination text-24"></i>

                <div className="ml-10 sm:ml-0 sm:mt-10">
                  <h4 className="text-16 fw-500">Guyana</h4>
                  <p className="text-14">4,090 Helicopters</p>
                </div>
              </a>
            </div>

            <div
              data-anim-child="slide-up delay-5"
              className="col-xl col-lg-3 col-6"
            >
              <a
                href="#"
                className="citiesCard -type-5 d-flex items-center sm:flex-column sm:items-start px-20 py-20 sm:px-15 sm:py-20 bg-light-2 rounded-4"
              >
                <i className="icon-destination text-24"></i>

                <div className="ml-10 sm:ml-0 sm:mt-10">
                  <h4 className="text-16 fw-500">Guyana</h4>
                  Helicopters                </div>
              </a>
            </div>

            <div
              data-anim-child="slide-up delay-6"
              className="col-xl col-lg-3 col-6"
            >
              <a
                href="#"
                className="citiesCard -type-5 d-flex items-center sm:flex-column sm:items-start px-20 py-20 sm:px-15 sm:py-20 bg-light-2 rounded-4"
              >
                <i className="icon-destination text-24"></i>

                <div className="ml-10 sm:ml-0 sm:mt-10">
                  <h4 className="text-16 fw-500">Guyana</h4>
                  <p className="text-14">4,090 Helicopters</p>
                </div>
              </a>
            </div>

            <div
              data-anim-child="slide-up delay-7"
              className="col-xl col-lg-3 col-6"
            >
              <a
                href="#"
                className="citiesCard -type-5 d-flex items-center sm:flex-column sm:items-start px-20 py-20 sm:px-15 sm:py-20 bg-light-2 rounded-4"
              >
                <i className="icon-destination text-24"></i>

                <div className="ml-10 sm:ml-0 sm:mt-10">
                  <h4 className="text-16 fw-500">Guyana</h4>
                  <p className="text-14">4,090 Helicopters</p>
                </div>
              </a>
            </div>

            <div
              data-anim-child="slide-up delay-8"
              className="col-xl col-lg-3 col-6"
            >
              <a
                href="#"
                className="citiesCard -type-5 d-flex items-center sm:flex-column sm:items-start px-20 py-20 sm:px-15 sm:py-20 bg-light-2 rounded-4"
              >
                <i className="icon-destination text-24"></i>

                <div className="ml-10 sm:ml-0 sm:mt-10">
                  <h4 className="text-16 fw-500">Guyana</h4>
                  <p className="text-14">4,090 Helicopters</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PopularDestiny;
