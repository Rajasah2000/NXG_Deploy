import React from "react";
import charperimage from "../../Images/djim.jpg";

const WhenCharterHelicopter = () => {
  return (
    <>
      <section className="whenCharterHelicopter_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-12 m-auto">
              <h2 className="heading">
                <span style={{ fontSize: "44px", color: "black" }}>E</span>
                vent{" "}
                <span style={{ fontSize: "44px", color: "blueviolet" }}>
                  DJ
                </span>{" "}
                Bookings
              </h2>
              <p className="desc">
                Suited to business and leisure travel, helicopter charters
                offers speed, convenience and tremendous flexibility. Helicopter
                charters are ideal for point-topoint travel, getting you
                directly to your desired destination on your schedules.
              </p>
              <p className="desc">
                Elevate your event with GrooveMasters Entertainment, where we
                specialize in providing top-notch DJ services tailored to your
                unique needs. Our experienced DJs curate personalized playlists
                that perfectly match the vibe of your event, whether it's a
                wedding, corporate function, birthday party, or nightclub gig.
                We offer state-of-the-art sound and lighting equipment, ensuring
                a flawless performance and immersive experience!.
              </p>
            </div>

            <div className="col-lg-5 col-md-6 col-12">
              <div className="image_wrap">
                <img src={charperimage} className="img-fluid" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhenCharterHelicopter;
