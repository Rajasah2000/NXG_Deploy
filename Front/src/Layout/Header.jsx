import React, { useContext, useState } from "react";
// import logo from "../Images/logo-dark.901b75e9c0135f7db216.png";
// import logo from "../Images/djlogo.jpg"
import logo from "../Images/logo-removebg-preview.png";
import { Link } from "react-router-dom";
import { Colorcontext } from "../../src/Components/Context/ColorContext";
function Header() {
  const colorData = useContext(Colorcontext);
  const [hmenu, setHmenu] = useState();
  const [sticky, setSticky] = useState(false);

  const handleClickBar = () => {
    setHmenu(!hmenu);
  };

  const headerSticky = () => {
    if (window.scrollY > 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  window.addEventListener("scroll", headerSticky);

  const scrollToBottom = () => {
    // alert("jkjn h jhjhj");
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    setHmenu(false);
  };

  return (
    <>
      {/* <section className="header-banner py-5 bg-blue-1 z-2">
      <div className="container">
        <div className="row items-center justify-between">
          <div className="col-auto">
            <div className="row x-gap-15 y-gap-15 items-center">
              <div className="col-auto md:d-none">
                <a href="#" className="text-12 text-white">+(1) 123 456 7890</a>
              </div>

              <div className="col-auto md:d-none">
                <div className="w-1 h-20 bg-white-20"></div>
              </div>

              <div className="col-auto">
                <a href="#" className="text-12 text-white">hi@gotrip.com</a>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="row x-gap-15 items-center jusify-between">
              <div className="col-auto">

                <div className="row x-gap-20 items-center xxl:d-none">
                  <div className="col-auto">
                    <button className="d-flex items-center text-14 text-white" data-x-click="currency">
                      <span className="js-currencyMenu-mainTitle">USD</span>
                      <i className="icon-chevron-sm-down text-7 ml-10"></i>
                    </button>
                  </div>

                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20"></div>
                  </div>

                  <div className="col-auto">
                    <button className="d-flex items-center text-14 text-white" data-x-click="lang">
                      <img src={uk_img} alt="image" className="rounded-full mr-10"/>
                      <span className="js-language-mainTitle">United Kingdom</span>
                      <i className="icon-chevron-sm-down text-7 ml-15"></i>
                    </button>
                  </div>
                </div>

              </div>

              <div className="col-auto xxl:d-none">
                <div className="w-1 h-20 bg-white-20"></div>
              </div>

              <div className="col-auto md:d-none">
                <a href="#" className="text-12 text-white">Become An Expert</a>
              </div>

              <div className="col-auto md:d-none">
                <div className="w-1 h-20 bg-white-20"></div>
              </div>

              <div className="col-auto">
                <a href="#" className="text-12 text-white">Sign In / Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}

      <header
        data-add-bg="bg-white"
        // className={sticky?' ':""}
        className={`header  js-header ${
          sticky ? "header  js-header is-sticky bg-black" : ""
        } ${colorData.color ? "hdbkpt" : ""}`}
        data-x="header"
        data-x-toggle="is-menu-opened"
      >
        <div
          // data-anim="fade"
          className="header_container header_container-1500 mx-auto px-30 sm:px-20 cust_header"
        >
          <div className="row cust_header_nav">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link
                  to="/"
                  className="header-logo mr-50"
                  data-x="header-logo"
                  data-x-toggle="is-logo-dark"
                >
                  <img
                    style={{
                      height: "58px",
                      width: "auto", // Maintain aspect ratio
                      objectFit: "contain", // Ensures the image is scaled correctly within the container
                      display: "block", // Remove extra space below the image
                      maxWidth: "100%", // Ensure the image doesn’t overflow the container
                    }}
                    src={logo}
                    alt="logo icon"
                  />

                  {/* <img src="img/general/logo-dark-2.svg" alt="logo icon" /> */}
                  {/* <h2 style={{ fontSize: "20px" }}>
                  <span>GUYVIP</span> Concierge
                </h2> */}
                </Link>
                <div
                  className={
                    hmenu ? "header-menu is-menu-active" : "header-menu"
                  }
                  data-x="mobile-menu"
                  data-x-toggle="is-menu-active"
                >
                  <div className="mobile-overlay" />
                  <div className="header-menu__content">
                    <div className="mobile-bg js-mobile-bg" />
                    <div className="menu js-navList">
                      <ul className="menu__nav text-white fw-500 -is-active">
                        <li
                          className="menu-item-has-children"
                          onClick={() => setHmenu(false)}
                        >
                          <a data-barba="" href="#">
                            <span className="mr-10">Home</span>
                          </a>
                        </li>
                        <li
                          className="menu-item-has-children -has-mega-menu"
                          onClick={() => setHmenu(false)}
                        >
                          <a data-barba="" href="#">
                            <span className="mr-10">About</span>
                          </a>

                          {/* <ul className="subnav mega-mobile">
                          <li className="subnav__backBtn js-nav-list-back">
                            <a href="#">
                              <i className="icon icon-chevron-sm-down" />{" "}
                              Category
                            </a>
                          </li>
                          <li className="menu-item-has-children">
                            <a data-barba="" href="#">
                              <span className="mr-10">Hotel</span>
                              <i className="icon icon-chevron-sm-down" />
                            </a>
                            <ul className="subnav">
                              <li className="subnav__backBtn js-nav-list-back">
                                <a href="#">
                                  <i className="icon icon-chevron-sm-down" />{" "}
                                  Hotel
                                </a>
                              </li>
                              <li>
                                <a href="hotel-list-1.html">Hotel List v1</a>
                              </li>
                              <li>
                                <a href="hotel-list-2.html">Hotel List v2</a>
                              </li>
                              <li>
                                <a href="hotel-single-1.html">
                                  Hotel Single v1
                                </a>
                              </li>
                              <li>
                                <a href="hotel-single-2.html">
                                  Hotel Single v2
                                </a>
                              </li>
                              <li>
                                <a href="booking-pages.html">Booking Page</a>
                              </li>
                            </ul>
                          </li>
                          <li className="menu-item-has-children">
                            <a data-barba="" href="#">
                              <span className="mr-10">Tour</span>
                              <i className="icon icon-chevron-sm-down" />
                            </a>
                            <ul className="subnav">
                              <li className="subnav__backBtn js-nav-list-back">
                                <a href="#">
                                  <i className="icon icon-chevron-sm-down" />{" "}
                                  Tour
                                </a>
                              </li>
                              <li>
                                <a href="tour-list-1.html">Tour List v1</a>
                              </li>
                              <li>
                                <a href="tour-grid-1.html">Tour List v2</a>
                              </li>
                              <li>
                                <a href="tour-map.html">Tour Map</a>
                              </li>
                              <li>
                                <a href="tour-single.html">Tour Single</a>
                              </li>
                            </ul>
                          </li>
                          <li className="menu-item-has-children">
                            <a data-barba="" href="#">
                              <span className="mr-10">Activity</span>
                              <i className="icon icon-chevron-sm-down" />
                            </a>
                            <ul className="subnav">
                              <li className="subnav__backBtn js-nav-list-back">
                                <a href="#">
                                  <i className="icon icon-chevron-sm-down" />{" "}
                                  Activity
                                </a>
                              </li>
                              <li>
                                <a href="activity-list-1.html">
                                  Activity List v1
                                </a>
                              </li>
                              <li>
                                <a href="activity-grid-1.html">
                                  Activity List v2
                                </a>
                              </li>
                              <li>
                                <a href="activity-map.html">Activity Map</a>
                              </li>
                              <li>
                                <a href="activity-single.html">
                                  Activity Single
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="menu-item-has-children">
                            <a data-barba="" href="#">
                              <span className="mr-10">Rental</span>
                              <i className="icon icon-chevron-sm-down" />
                            </a>
                            <ul className="subnav">
                              <li className="subnav__backBtn js-nav-list-back">
                                <a href="#">
                                  <i className="icon icon-chevron-sm-down" />{" "}
                                  Rental
                                </a>
                              </li>
                              <li>
                                <a href="rental-list-1.html">Rental List v1</a>
                              </li>
                              <li>
                                <a href="rental-grid-1.html">Rental List v2</a>
                              </li>
                              <li>
                                <a href="rental-map.html">Rental Map</a>
                              </li>
                              <li>
                                <a href="rental-single.html">Rental Single</a>
                              </li>
                            </ul>
                          </li>
                          <li className="menu-item-has-children">
                            <a data-barba="" href="#">
                              <span className="mr-10">Car</span>
                              <i className="icon icon-chevron-sm-down" />
                            </a>
                            <ul className="subnav">
                              <li className="subnav__backBtn js-nav-list-back">
                                <a href="#">
                                  <i className="icon icon-chevron-sm-down" />{" "}
                                  Car
                                </a>
                              </li>
                              <li>
                                <a href="car-list-1.html">Car List v1</a>
                              </li>
                              <li>
                                <a href="car-grid-1.html">Car List v2</a>
                              </li>
                              <li>
                                <a href="car-map.html">Car Map</a>
                              </li>
                              <li>
                                <a href="car-single.html">Car Single</a>
                              </li>
                            </ul>
                          </li>
                          <li className="menu-item-has-children">
                            <a data-barba="" href="#">
                              <span className="mr-10">Cruise</span>
                              <i className="icon icon-chevron-sm-down" />
                            </a>
                            <ul className="subnav">
                              <li className="subnav__backBtn js-nav-list-back">
                                <a href="#">
                                  <i className="icon icon-chevron-sm-down" />{" "}
                                  Cruise
                                </a>
                              </li>
                              <li>
                                <a href="cruise-list-1.html">Cruise List v1</a>
                              </li>
                              <li>
                                <a href="cruise-grid-1.html">Cruise List v2</a>
                              </li>
                              <li>
                                <a href="cruise-map.html">Cruise Map</a>
                              </li>
                              <li>
                                <a href="cruise-single.html">Cruise Single</a>
                              </li>
                            </ul>
                          </li>
                          <li className="menu-item-has-children">
                            <a data-barba="" href="#">
                              <span className="mr-10">Flights</span>
                              <i className="icon icon-chevron-sm-down" />
                            </a>
                            <ul className="subnav">
                              <li className="subnav__backBtn js-nav-list-back">
                                <a href="#">
                                  <i className="icon icon-chevron-sm-down" />{" "}
                                  Flights
                                </a>
                              </li>
                              <li>
                                <a href="flights-list.html">Flights List v1</a>
                              </li>
                            </ul>
                          </li>
                        </ul> */}
                        </li>

                        {/* <li className="menu-item-has-children">
                          <a data-barba="" href="#">
                            <span className="mr-10">Blog</span>
                          </a>
                        </li> */}

                        <li onClick={scrollToBottom}>
                          <a>Contact</a>
                        </li>
                      </ul>
                    </div>
                    <div className="mobile-footer px-20 py-20 border-top-light js-mobile-footer"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex items-center">
                {/* <div className="mr-15 xxl:d-none">
                <button className="text-26 text-dark-1">
                  <div className="icon-search" />
                </button>
              </div> */}
                <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                  {/* <a
                  href="login.html"
                  className="button px-30 fw-400 text-14 -blue-1 bg-dark-1 h-50 text-white"
                >
                  Become An Expert
                </a> */}
                  <a
                    // href="/login"
                    className="button px-30 fw-400 text-14 border-white -blue-1 h-50 text-white ml-20"
                  >
                    {/* Sign In / Register */}
                    Join as a Professional
                  </a>
                </div>
                <div
                  className="d-none xl:d-flex x-gap-20 items-center pl-30"
                  data-x="header-mobile-icons"
                  data-x-toggle="text-dark-1"
                >
                  <div>
                    <a
                      href="login.html"
                      className="d-flex items-center icon-user text-inherit text-22"
                    />
                  </div>
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-x-click="html, header, header-logo, header-mobile-icons, mobile-menu"
                      onClick={handleClickBar}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
