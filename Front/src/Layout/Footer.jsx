import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer -type-3 text-white bg-dark-1">
        <div className="container">
          <div className="pt-60 pb-60">
            <div className="row y-gap-40 justify-between xl:justify-start">
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <h5 className="text-16 fw-500 mb-30">Contact Us</h5>
                <div className="mt-30">
                  <div className="text-14 mt-30">Customer Support Contact</div>
                  <a href="#" className="text-18 fw-500 mt-5">
                    +(91) 7260905098
                  </a>
                </div>
                <div className="mt-35">
                  <div className="text-14 mt-30">Need live support?</div>
                  <a href="#" className="text-18 fw-500 mt-5">
                    yourdjdaddy@gmail.com
                  </a>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <h5 className="text-16 fw-500 mb-30">Company</h5>
                <div className="d-flex y-gap-10 flex-column">
                  <a href="/">Home</a>
                  <a href="#">About</a>

                  <a href="#">Blog</a>
                  <a href="">Contact</a>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <h5 className="text-16 fw-500 mb-30">Support</h5>
                <div className="d-flex y-gap-10 flex-column">
                  <a href="#">Legal Notice</a>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms and Conditions</a>
                  <a href="#">Sitemap</a>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <h5 className="text-16 fw-500 mb-30">Other Services</h5>
                <div className="d-flex y-gap-10 flex-column">
                  <a href="#">Custom Soundtracks and Music Curation</a>
                  <a href="#">Live Mashups and Remixes</a>

                  <a href="#">Audio Editing and Mastering</a>
                  <a href="#">Event Sound and Lighting</a>
                  <a href="#">Premium Web & App Development</a>
                </div>
              </div>
              {/* <div className="col-xl-4 col-lg-4 col-sm-6">
            <h5 className="text-16 fw-500 mb-30">Get Updates &amp; More</h5>
            <div className="single-field relative d-flex justify-end items-center pb-30">
              <input
                className="bg-white rounded-8"
                type="email"
                placeholder="Your Email"
              />
              <button className="absolute px-20 h-full text-15 fw-500 underline text-dark-1">
                Subscribe
              </button>
            </div>
          </div> */}
            </div>
          </div>
          <div className="py-20 border-top-white-15">
            <div className="row justify-between items-center y-gap-10">
              <div className="col-auto">
                <div className="row x-gap-30 y-gap-10">
                  <div className="col-auto">
                    <div className="d-flex items-center">
                      © 2024 NXG All rights reserved.
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="d-flex x-gap-15">
                      <a href="#">Privacy</a>
                      <a href="#">Terms</a>
                      <a href="#">Site Map</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <div className="row y-gap-10 items-center">
                  <div className="col-auto">
                    <div className="d-flex items-center">
                      <button className="d-flex items-center text-14 fw-500 text-white mr-10">
                        <i className="icon-globe text-16 mr-10" />
                        <span className="underline">English (US)</span>
                      </button>
                      <button className="d-flex items-center text-14 fw-500 text-white">
                        <i className="icon-usd text-16 mr-10" />
                        <span className="underline">USD</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="d-flex x-gap-20 items-center">
                      <a
                        target="_blank"
                        href="https://www.facebook.com/yourdjnxg?mibextid=ZbWKwL"
                      >
                        <i className="icon-facebook text-14" />
                      </a>
                      <a
                        target="_blank"
                        href="https://youtube.com/@yourdjnxg?si=GbgpvESfh2J49t2i"
                      >
                        {/* <i className="icon-twitter text-14" /> */}
                        <i className="fab fa-youtube text-14" />
                      </a>
                      <a
                        target="_blank"
                        href="https://www.instagram.com/yourdjnxg?igsh=MTYzOXN1M3h0aXp3OA=="
                      >
                        <i className="icon-instagram text-14" />
                      </a>
                      <a href="#">
                        <i className="icon-linkedin text-14" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
