import React, { useEffect, useState } from "react";
import video1 from "../../Images/th (3).jpg";
import video2 from "../../Images/th (1).jpg";

function CruiseBooking() {
  const [iframeHeight, setIframeHeight] = useState(450);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setIframeHeight(200); // Height for small screens
      } else if (window.innerWidth <= 768) {
        setIframeHeight(300); // Height for medium screens
      } else {
        setIframeHeight(450); // Initial height for larger screens
      }
    };

    // Set initial height
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className="section-bg layout-pt-lg layout-pb-lg">
        <div className="section-bg__item -right -w-1165 bg-light-2"></div>

        <div
          className="section-bg__item -video-left"
          style={{
            padding: "20px", // Optional: Add some padding if needed
          }}
        >
          <div
            className="section-bg__item -video-left"
            style={{
              padding: "20px", // Optional padding
            }}
          >
            <div
              className="row y-gap-60"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto", // Centers the row
              }}
            >
              <div
                className="col-sm-6"
                style={{
                  margin: "0",
                  height: `${iframeHeight}px`, // Set height dynamically
                  width: "100%",
                  maxWidth: "600px",
                }}
              >
                <iframe
                  width="100%"
                  height="100%" // Responsive height
                  src="https://www.youtube.com/embed/eCUKeWkVf3Q?autoplay=1&mute=1"
                  // src="https://www.youtube.com/embed/mQhFApQIVMc?autoplay=1&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    borderRadius: "12px",
                    display: "block",
                    width: "100%",
                    height: "100%",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="container lg:mt-30">
          <div className="row">
            <div className="offset-xl-6 col-xl-5 col-lg-6">
              <h2 className="text-30 fw-600">
                <span style={{ fontSize: "44px", color: "blueviolet" }}>
                  NxG
                </span>{" "}
                is a World Leading DJ / Music Artist Booking Platform
              </h2>
              <p className="text-dark-1 mt-40 lg:mt-20 sm:mt-15">
                The all-inclusive booking platform for everyone looking to book
                DJs and Music Artists, perfect for Parties, Events, Festivals, &
                Concerts.
              </p>

              <div
                className="d-inline-block mt-40 lg:mt-30 sm:mt-20"
                onClick={() => {
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth",
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <a
                  // href="#CharterEnquiryForm"
                  className="button -md -blue-1 bg-yellow-1 text-dark-1"
                >
                  Inquire Now <div className="icon-arrow-top-right ml-15"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CruiseBooking;
