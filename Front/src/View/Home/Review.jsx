import React from "react";
import CustomerReview from "./CustomerReview";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import p from "../../Images/1 - Copy.png";
function Review() {
  const loop = [1, 2, 3];
  return (
    <>
      {/* <div className="review_section_main">
        <div className="container">
          <div className="review_main">
            <p className="text-center security_service-title customer_review_title">
              Customer Reviews
            </p>
            <p className="text-center review_text">
              These popular destinations have a lot to offer
            </p>
            <div className="customer_review_box">
              <CustomerReview />
            </div>
          </div>
        </div>
      </div> */}

      <section className="layout-pt-lg layout-pb-lg bg-light-2 testi">
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-5 col-lg-6">
              <h2 className="text-30">
                What our customers are
                <br /> saying us?
              </h2>
              <p className="mt-20">
                Fantastic experience! The DJ made the night unforgettable with
                great music and energy. Everyone had an amazing time and we
                can't wait for the next event!
              </p>
              <div className="row y-gap-30 pt-60 lg:pt-40">
                <div className="col-sm-5 col-6">
                  <div className="text-30 lh-15 fw-600">13k+</div>
                  <div className="text-light-1 lh-15">Happy People</div>
                </div>
                <div className="col-sm-5 col-6">
                  <div className="text-30 lh-15 fw-600">4.88</div>
                  <div className="text-light-1 lh-15">Overall rating</div>
                  <div className="d-flex x-gap-5 items-center pt-10">
                    <div className="icon-star text-blue-1 text-10" />
                    <div className="icon-star text-blue-1 text-10" />
                    <div className="icon-star text-blue-1 text-10" />
                    <div className="icon-star text-blue-1 text-10" />
                    <div className="icon-star text-blue-1 text-10" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="overflow-hidden js-section-slider"
                data-scrollbar=""
                data-slider-cols="base-1"
              >
                <div className="" style={{ position: "relative" }}>
                  <Swiper
                    scrollbar={{
                      hide: false,
                    }}
                    modules={[Scrollbar]}
                    className="mySwiper"
                  >
                    {loop.map((item, index) => {
                      return (
                        <SwiperSlide>
                          <div className="">
                            <div className="row items-center x-gap-30 y-gap-20">
                              <div
                                className="col-auto"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src="https://cdn.pixabay.com/photo/2024/02/22/07/26/music-8589292_640.jpg"
                                  alt="image"
                                  style={{
                                    borderRadius: "50%",
                                    width: "80px", // Adjust width and height as needed
                                    height: "80px",
                                    objectFit: "cover", // Ensures the image covers the circle without distortion
                                  }}
                                />
                              </div>

                              <div className="col-auto">
                                <h5 className="text-16 fw-500">
                                  Annette Black
                                </h5>
                                <div className="text-15 text-light-1 lh-15">
                                  DJ / DJ Manager
                                </div>
                              </div>
                            </div>
                            <p className="text-18 fw-500 text-dark-1 mt-30 sm:mt-20">
                              Fantastic experience! The DJ made the night
                              unforgettable with great music and energy.
                              Everyone had an amazing time and we can't wait for
                              the next event!
                            </p>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className=" fw-500 js-current">01</div>
                  <div className=" fw-500 js-all">05</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Review;
