import React from "react";
import "animate.css";

const AirCharterService = () => {
  return (
    <>
      <section
        className="layout-pt-lg layout-pb-md animate__animated animate__fadeInLeft"
        id="secondSection"
      >
        <div data-anim-wrap className="container">
          <div
            data-anim-child="slide-up delay-1"
            className="row y-gap-20 justify-center text-center"
          >
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Elevate Your Event with GrooveMasters Entertainment
                </h2>
                <p className=" sectionTitle__text mt-2 sm:mt-0">
                  GrooveMasters Entertainment delivers exceptional DJ services
                  for any event. Our expert DJs craft personalized playlists,
                  manage top-notch equipment, and create dynamic experiences
                  tailored to your needs. Book with us for a seamless,
                  unforgettable musical experience at your next event!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AirCharterService;
