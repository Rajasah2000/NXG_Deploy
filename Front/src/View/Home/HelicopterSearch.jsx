import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DateCalender from "../../Components/DataCalender";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import toast from "react-hot-toast";
import { FilterHelicopterData, UserBooking } from "../../Components/API";
import Swal from "sweetalert2";
const HelicopterSearch = () => {
  const [isshow, setIsshow] = useState(false);
  const [isCalen, showiscalen] = useState(false);
  const [isclass, setIsclass] = useState(false);
  // const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [travel, setTravel] = useState("");
  const [first_PostalCode, setfirst_PostalCode] = useState("");
  const [Depart, setDepart] = useState("");
  const [Return, setReturn] = useState("");
  const [Day, setDay] = useState("");
  const [Day1, setDay1] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // State to store address input

  const [modalStatus, setModalStatus] = useState(false);
  const [modalStatuss, setModalStatuss] = useState(false);
  const [modalStatus3, setModalStatus3] = useState(false);
  const [modalStatus4, setModalStatus4] = useState(false);
  const [modalStatus5, setModalStatus5] = useState(false);
  const [modalStatus6, setModalStatus6] = useState(false);
  const [modalStatus7, setModalStatus7] = useState(false);
  const [modalStatus8, setModalStatus8] = useState(false);
  const [modalStatus9, setModalStatus9] = useState(false);
  const [modalStatus10, setModalStatus10] = useState(false);
  const [modalStatus11, setModalStatus11] = useState(false);
  const [modalStatus12, setModalStatus12] = useState(false);
  const [modalStatus13, setModalStatus13] = useState(false);
  const [modalStatus14, setModalStatus14] = useState(false);

  const [event, setEvent] = useState("");
  const [selectedGuestOption, setSelectedGuestOption] = useState("");
  const [music, setMusic] = useState([]);
  const [language, setLanguage] = useState([]);
  const [venue, setVenue] = useState([]);
  const [dateoption, setDateOption] = useState("");
  const [approxDate, setApproxDate] = useState("");
  const [selectedDateOption, setSelectedDateOption] = useState(""); // For selected date option
  const [otherDate, setOtherDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // For storing selected DJ date
  const [approxTime, setApproxTime] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [service, setService] = useState("");

  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  // const [event, setEvent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Automatically close the modal after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(false);
        setModalStatus14(false);
        window.location.reload(true);
      }, 10000);

      // Cleanup the timer when the component is unmounted or isOpen changes
      return () => clearTimeout(timer);
    }
  }, [isOpen, setIsOpen]);

  const [formData, setFormData] = useState({
    phone: "",
  });

  // Handle phone number input change and validate max 10 digits
  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (input.length <= 10) {
      setPhoneNumber(input);
    }
  };

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle email validation and storage
  const handleContinueEmail = () => {
    if (emailRegex.test(email)) {
      console.log("Email is valid:", email);
      setModalStatus13(true);
      setModalStatus12(false);
      // Here you can store the email or send it to an API
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  // Handle form submission and store data
  const handleContinuePhone = () => {
    if (phoneNumber.length === 10) {
      setFormData({ phone: phoneNumber });
      console.log("Form data stored:", formData);
      setModalStatus14(true);
      setModalStatus13(false);
      // You can send formData to an API or perform further actions
    } else {
      toast.error("Phone number must be exactly 10 digits");
    }
  };

  // Function to handle the button click event
  const handleContinueaddress = () => {
    if (address.trim() === "") {
      toast.error("Please enter your address and postcode.");
    } else {
      // alert(`Address: ${address}`);
      setModalStatus10(false);
      setModalStatus11(true);

      // Add logic to proceed to the next step
    }
  };
  const handReturnClick = () => {
    setIsshow(!isshow);
  };

  const handleDateSelection = (e) => {
    setSelectedDate(e.target.value); // Storing the selected date
  };
  const handleApproxTimeSelection = (option) => {
    setApproxTime(option); // Storing the approximate time option
  };

  // For "Other" input field

  const [selectedVenueOptions, setSelectedVenueOptions] = useState([]); // For selected venue options
  const [otherVenue, setOtherVenue] = useState(""); // For custom "Other" option

  console.log("fjdhhjshfjds", selectedDateOption);

  // Handler for changing venue options
  const handleVenueOptionChange = (option) => {
    if (selectedVenueOptions.includes(option)) {
      setSelectedVenueOptions((prev) =>
        prev.filter((venue) => venue !== option)
      );
    } else {
      setSelectedVenueOptions([option]); // Allow only one selection for radio button-like behavior
    }
  };

  const [selectedMusicOptions, setSelectedMusicOptions] = useState([]);
  const [otherMusic, setOtherMusic] = useState("");

  const handleMusicOptionChange = (option) => {
    if (
      option === "Other" ||
      option === "I would like to discuss with the pro"
    ) {
      setSelectedMusicOptions([option]);
    } else {
      setOtherMusic(""); // Clear input field if switching away from "Other"
      setSelectedMusicOptions([option]); // Clear previous selection and set the current option
    }
  };

  // Handle name validation and storage
  const handleContinueName = async () => {
    if (fullName.trim().length > 0) {
      // console.log("Full name is valid:", fullName);

      let data = {
        eventname: event,
        guest: selectedGuestOption,
        music: music,
        language: language,
        venue: venue,
        selectedoptiondate: selectedDateOption,
        selecteddate: otherDate,
        date: selectedDate,
        needdate: approxTime,
        name: fullName,
        address: address,
        email: email,
        phonenumber: phoneNumber,
        service: service,
      };

      let res = await UserBooking(data);
      if (res && res?.data?.status) {
        console.log("kfhjdhjfdfdsfdsf", res);

        setIsOpen(true);
      } else {
        toast.error(res?.data?.msg);
      }

      console.log("WholeData", data);

      // Here you can store the name or send it to an API
    } else {
      toast.error("Please enter your full name");
    }
  };

  const [selectedEventOption, setSelectedEventOption] = useState("");
  const [otherEvent, setOtherEvent] = useState("");

  const handleEventOptionChange = (option) => {
    setSelectedEventOption(option);
    if (option !== "Other") {
      setOtherEvent(""); // Clear "Other" input if a regular option is selected
    }
  };

  // const [modalStatus, setModalStatus] = useState(true);

  // State for selected guest option

  // Handle radio button change for guest options
  const handleGuestOptionChange = (option) => {
    setSelectedGuestOption(option);
  };

  // Handle "Continue" button click
  const handleContinue = () => {
    if (selectedGuestOption) {
      console.log(`You selected: ${selectedGuestOption}`);
      // Proceed with further actions like saving the selection, closing modal, etc.
      // setModalStatus(false);
      setModalStatus3(true);
      setModalStatuss(false);
      // setModalStatus(false);
    } else {
      toast.error("Please select an option.");
    }
  };

  const handleContinueDate = () => {
    if (selectedDateOption === "") {
      return toast.error("Please select any one option");
    }

    if (selectedDateOption === "Yes") {
      setModalStatus7(false);
      setModalStatus8(true); // Show the date selection modal
    } else if (selectedDateOption === "No") {
      setModalStatus7(false);
      setModalStatus9(true); // Show the approximate time modal
    } else if (selectedDateOption === "Other" && otherDate.trim() === "") {
      toast?.error("Please specify the date or time.");
    } else if (selectedDateOption === "Other") {
      // alert(`Specified date or time: ${otherDate}`);
      setModalStatus7(false);
      setModalStatus10(true);
    }
  };

  const [selectedServiceOption, setSelectedServiceOption] = useState("");
  const [otherService, setOtherService] = useState("");

  const handleServiceOptionChange = (option) => {
    setSelectedServiceOption(option);
    if (option !== "Other" && option !== "DJ using their own equipment") {
      setOtherService(""); // Clear "Other" input if a standard option is selected
    }
  };

  const handleContinues = () => {
    if (selectedGuestOption) {
      // alert(`You selected: ${selectedGuestOption}`);
      // Proceed with further actions like saving the selection, closing modal, etc.
      // setModalStatus(false);
      setModalStatuss(true);
      setModalStatus(false);
    } else {
      // alert("Please select an option.");
    }
  };

  // Handle "Back" button click
  const handleBack = () => {
    // alert("Going back to the previous step.");
    // Perform the back navigation or close the modal, as needed
    setModalStatuss(false);
    setModalStatus(true);
  };
  const [selectedOption, setSelectedOption] = useState(""); // Store the selected radio button
  const [otherInput, setOtherInput] = useState(""); // Store the input value for "Other"

  // if (!modalStatus) return null;

  const handleRadioChange = (option) => {
    setSelectedOption(option);
    if (option !== "Other") {
      setOtherInput(""); // Clear the "Other" input when another option is selected
    }
  };

  const handleOtherInputChange = (e) => {
    setOtherInput(e.target.value);
  };

  const handleDateOptionChange = (event) => {
    setSelectedDate(event);
  };

  // console.log("Selected Event:", finalEvent);

  const HandleSearch = async (e) => {
    e.preventDefault();
    setModalStatus(true);

    // if (address && address1 && travel && Depart && Return) {
    //   let data1 = {
    //     flyingFrom: address,
    //     flyingTo: address1,
    //     passanger: Number(travel),
    //     Departs: Depart,
    //     Returns: Return,
    //   };
    //   let data = {
    //     flyingFrom: address,
    //     flyingTo: address1,
    //     passanger: Number(travel),
    //   };

    //   let res = await FilterHelicopterData(data);
    //   if (res && res?.data) {
    //     // let Data = data1.newData = res?.data
    //     Object.assign(data1, { newData: res?.data });
    //     console.log("jkjfsduruewuruiuridwdeeer", data1);
    //     navigate("/flight-list", { state: data1 });
    //   } else {
    //     toast?.error("No data available");
    //   }
    // } else {
    //   toast.error("All fields are required");
    // }
  };

  const handClick = () => {
    showiscalen(!isCalen);
  };

  const handClassClick = () => {
    setIsclass(!isclass);
  };

  const handleChangeAddress = (e) => {
    console.log("dfdd", e);
    setAddress(e);
    // setIsMapOpen(!isMapOpen);
  };

  const handleChangeAddress1 = (e) => {
    console.log("dfdd", e);
    setAddress1(e);
    // setIsMapOpen(!isMapOpen);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      const reszipcode = results[0]?.address_components?.filter((ele) =>
        ele.types.some((type) => type === "postal_code")
      );
      // setProjectData({ ...projectData, postalCode: reszipcode[0].long_name });
      // setAddress({ ...address, zipcode: reszipcode[0]?.long_name });
      if (reszipcode[0]?.long_name) {
        setfirst_PostalCode(reszipcode[0]?.long_name ?? 0);
      }
      //  else {
      //   toast.error('Enter specific location');
      // }
      getLatLng(results[0])
        .then((latLng) => {
          //  console.log('Success', latLng);
          //  setLongitude(latLng?.lng);
          //  setaLatitude(latLng?.lat);
          //  setUserLatLng(latLng);
          //  setMarkerlatLng(latLng);
          //  setUserLocation(true);
          setAddress(address);
          //  setfirst_destination(address);
        })
        .catch((error) => console.error("Error", error));
    });
  };

  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState([]);
  const [otherLanguage, setOtherLanguage] = useState("");

  const handleLanguageOptionChange = (option) => {
    if (option === "Other") {
      // Clear any previously selected options and show the input field
      setSelectedLanguageOptions(["Other"]); // Ensure "Other" is the only selected option
    } else {
      // Uncheck "Other" if selected and update other selected options
      setSelectedLanguageOptions((prevOptions) => {
        if (prevOptions.includes(option)) {
          // If the option is already selected, remove it
          return prevOptions.filter((lang) => lang !== option);
        } else {
          // Otherwise, remove "Other" and add the selected option
          return prevOptions.filter((lang) => lang !== "Other").concat(option);
        }
      });
    }
  };

  const handleSelect1 = (address) => {
    geocodeByAddress(address).then((results) => {
      const reszipcode = results[0]?.address_components?.filter((ele) =>
        ele.types.some((type) => type === "postal_code")
      );
      // setProjectData({ ...projectData, postalCode: reszipcode[0].long_name });
      // setAddress({ ...address, zipcode: reszipcode[0]?.long_name });
      if (reszipcode[0]?.long_name) {
        setfirst_PostalCode(reszipcode[0]?.long_name ?? 0);
      }
      //  else {
      //   toast.error('Enter specific location');
      // }
      getLatLng(results[0])
        .then((latLng) => {
          //  console.log('Success', latLng);
          //  setLongitude(latLng?.lng);
          //  setaLatitude(latLng?.lat);
          //  setUserLatLng(latLng);
          //  setMarkerlatLng(latLng);
          //  setUserLocation(true);
          setAddress1(address);
          //  setfirst_destination(address);
        })
        .catch((error) => console.error("Error", error));
    });
  };
  return (
    <section
      className="masthead -type-10 animated"
      style={{
        padding: "0px 0px",
        positon: "relative",
        paddingBottom: "30px",
        backgroundColor: "transparent",
        marginTop: "-75px",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-auto m-auto">
            <div className="masthead__content">
              <div data-anim-child="slide-up delay-3" className="is-in-view">
                <div className="mainSearch -col-4 -w-1070 bg-white shadow-1 rounded-4 pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 mt-15">
                  <div className="button-grid items-center">
                    <div className="searchMenu-loc px-24 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
                      <div data-x-dd-click="searchMenu-loc">
                        <h4 className="text-15 fw-500 ls-2 lh-16">
                          What service are you looking for?
                        </h4>
                        <div className="text-15 text-light-1 ls-2 lh-16">
                          {/* <div> */}

                          <select
                            id="exampleDropdown"
                            // value={selectedOption}
                            // onChange={handleChange}
                            style={{ marginLeft: "10px", padding: "5px" }}
                          >
                            <option value="">Select...</option>
                            <option value="Weddings DJ">Weddings DJ</option>
                            <option value="Corporate events DJ">
                              Corporate events DJ
                            </option>
                            <option value="option3">Birthday parties DJ</option>
                            <option value="Festivals">Festivals DJ</option>
                            <option value="Club or bar gigs">
                              Club or bar gigs DJ
                            </option>
                            <option value="Private events DJ">
                              Private events DJ
                            </option>
                          </select>
                          {/* </div> */}
                        </div>
                      </div>
                      <div
                        className="searchMenu-loc__field shadow-2 js-popup-window"
                        data-x-dd="searchMenu-loc"
                        data-x-dd-toggle="-is-active"
                      >
                        <div className="bg-white px-30 py-30 sm:px-0 sm:py-15 rounded-4">
                          <div className="y-gap-5 js-results">
                            <div>
                              <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                                <div className="d-flex">
                                  <div className="icon-location-2 text-light-1 text-20 pt-4" />
                                  <div className="ml-10">
                                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                                      London
                                    </div>
                                    <div className="text-14 lh-12 text-light-1 mt-5">
                                      Greater London, United Kingdom
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                            <div>
                              <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                                <div className="d-flex">
                                  <div className="icon-location-2 text-light-1 text-20 pt-4" />
                                  <div className="ml-10">
                                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                                      New York
                                    </div>
                                    <div className="text-14 lh-12 text-light-1 mt-5">
                                      New York State, United States
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                            <div>
                              <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                                <div className="d-flex">
                                  <div className="icon-location-2 text-light-1 text-20 pt-4" />
                                  <div className="ml-10">
                                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                                      Paris
                                    </div>
                                    <div className="text-14 lh-12 text-light-1 mt-5">
                                      France
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                            <div>
                              <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                                <div className="d-flex">
                                  <div className="icon-location-2 text-light-1 text-20 pt-4" />
                                  <div className="ml-10">
                                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                                      Madrid
                                    </div>
                                    <div className="text-14 lh-12 text-light-1 mt-5">
                                      Spain
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                            <div>
                              <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                                <div className="d-flex">
                                  <div className="icon-location-2 text-light-1 text-20 pt-4" />
                                  <div className="ml-10">
                                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                                      Santorini
                                    </div>
                                    <div className="text-14 lh-12 text-light-1 mt-5">
                                      Greece
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="searchMenu-date px-24 lg:py-20 lg:px-0"
                      // onClick={handClick}
                    >
                      <div>
                        <h4 className="text-15 fw-500 ls-2 lh-16">Date</h4>
                        <div className="capitalize text-15 text-light-1 ls-2 lh-16">
                          <input
                            type="date"
                            value={Return}
                            onChange={(e) => setReturn(e?.target.value)}
                          />
                          {/* <span className="js-first-date">{Day}</span>-
                            <span className="js-last-date">{Return}</span> */}
                        </div>
                      </div>

                      {isCalen && <DateCalender />}
                    </div>
                    <div className="searchMenu-guests px-24 lg:py-20 lg:px-0">
                      <div data-x-dd-click="searchMenu-guests">
                        <h4 className="text-15 fw-500 ls-2 lh-16">
                          <i class="bi bi-geo-alt-fill"></i>Pin Code
                        </h4>
                        <div className="text-15 text-light-1 ls-2 lh-16">
                          {/* <span className="js-count-adult">2</span> adults -<span className="js-count-child">1</span>{' '}
                            childeren -<span className="js-count-room">1</span> room */}
                          <input
                            placeholder="Enter pin code"
                            className="js-count-room"
                            type="number"
                            value={travel}
                            onChange={(e) => setTravel(e.target.value)}
                          />
                        </div>
                      </div>
                      <div
                        className="searchMenu-guests__field shadow-2"
                        data-x-dd="searchMenu-guests"
                        data-x-dd-toggle="-is-active"
                      >
                        <div className="bg-white px-30 py-30 rounded-4">
                          <div className="row y-gap-10 justify-between items-center">
                            <div className="col-auto">
                              <div className="text-15 fw-500">Adults</div>
                            </div>
                            <div className="col-auto">
                              <div
                                className="d-flex items-center js-counter"
                                data-value-change=".js-count-adult"
                              >
                                <button className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down">
                                  <i className="icon-minus text-12" />
                                </button>
                                <div className="flex-center size-20 ml-15 mr-15">
                                  <div className="text-15 js-count">2</div>
                                </div>
                                <button className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up">
                                  <i className="icon-plus text-12" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="border-top-light mt-24 mb-24" />
                          <div className="row y-gap-10 justify-between items-center">
                            <div className="col-auto">
                              <div className="text-15 lh-12 fw-500">
                                Children
                              </div>
                              <div className="text-14 lh-12 text-light-1 mt-5">
                                Ages 0 - 17
                              </div>
                            </div>
                            <div className="col-auto">
                              <div
                                className="d-flex items-center js-counter"
                                data-value-change=".js-count-child"
                              >
                                <button className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down">
                                  <i className="icon-minus text-12" />
                                </button>
                                <div className="flex-center size-20 ml-15 mr-15">
                                  <div className="text-15 js-count">1</div>
                                </div>
                                <button className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up">
                                  <i className="icon-plus text-12" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="border-top-light mt-24 mb-24" />
                          <div className="row y-gap-10 justify-between items-center">
                            <div className="col-auto">
                              <div className="text-15 fw-500">Rooms</div>
                            </div>
                            <div className="col-auto">
                              <div
                                className="d-flex items-center js-counter"
                                data-value-change=".js-count-room"
                              >
                                <button className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down">
                                  <i className="icon-minus text-12" />
                                </button>
                                <div className="flex-center size-20 ml-15 mr-15">
                                  <div className="text-15 js-count">1</div>
                                </div>
                                <button className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up">
                                  <i className="icon-plus text-12" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="button-item">
                      <Link>
                        <button
                          onClick={HandleSearch}
                          className="mainSearch__submit button -blue-1 py-15 px-35 h-60 col-12 rounded-4 bg-dark-1 text-white"
                        >
                          <i className="icon-search text-20 mr-10" />
                          Search
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div
                className="masthead__image is-in-view"
            >
                <div className="row y-gap-30">
                    <div className="col-auto">
                        <img src={banner1} alt="image" className="rounded-16" />
                    </div>
                    <div className="col-auto">
                        <img src={banner2} alt="image" className="rounded-16" />
                    </div>
                </div>
            </div> */}
      </div>
      {modalStatuss && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%", // Ensure the modal doesn't overflow the screen height
              overflowY: "auto", // Enable scrolling within the modal content
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="Event"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "15.3846%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
                  Approximately how many guests is this for?
                </h3>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "Fewer than 10 guests",
                    "10 - 19 guests",
                    "20 - 49 guests",
                    "50 - 99 guests",
                    "100 - 199 guests",
                    "200 - 299 guests",
                    "300 - 399 guests",
                    "400 or more guests",
                  ].map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      <input
                        name={option.toLowerCase().replace(/\s+/g, "-")}
                        type="radio"
                        className="tw-form-radio"
                        value={option}
                        checked={selectedGuestOption === option}
                        onChange={() => handleGuestOptionChange(option)}
                        style={{
                          marginRight: "10px",
                          appearance: "none",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          border: `2px solid ${
                            selectedGuestOption === option ? "#007bff" : "#ccc"
                          }`,
                          backgroundColor:
                            selectedGuestOption === option
                              ? "#007bff"
                              : "transparent",
                          outline: "none",
                          cursor: "pointer",
                          verticalAlign: "middle",
                        }}
                      />
                      <span style={{ marginLeft: "10px" }}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleBack()}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleContinue()}
                >
                  Continue
                </button>
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatuss(false);
                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}
      {modalStatus && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%", // Ensure the modal doesn't overflow the screen height
              overflowY: "auto", // Enable scrolling within the modal content
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="Event"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "7.6923%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
                  What type of event do you need a DJ for?
                </h3>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "Birthday Party - Adult",
                    "Birthday Party - Child",
                    "Cultural festivals",
                    "Office party",
                    "School/college event",
                    "Wedding",
                    "Other",
                  ].map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      {selectedEventOption === "Other" && option === "Other" ? (
                        // If "Other" is selected, show input field
                        <input
                          type="text"
                          value={otherEvent}
                          onChange={(e) => setOtherEvent(e.target.value)}
                          placeholder="Please specify"
                          style={{
                            marginTop: "10px",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <>
                          <input
                            name={option.toLowerCase().replace(/\s+/g, "-")}
                            type="radio"
                            value={option}
                            checked={selectedEventOption === option}
                            onChange={() => handleEventOptionChange(option)}
                            style={{
                              marginRight: "10px",
                              appearance: "none",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              border: `2px solid ${
                                selectedEventOption === option
                                  ? "#007bff"
                                  : "#ccc"
                              }`,
                              backgroundColor:
                                selectedEventOption === option
                                  ? "#007bff"
                                  : "transparent",
                              outline: "none",
                              cursor: "pointer",
                              verticalAlign: "middle",
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>{option}</span>
                        </>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // Store the selected option or "Other" input value
                    const finalEvent =
                      selectedEventOption === "Other"
                        ? otherEvent
                        : selectedEventOption;

                    finalEvent === ""
                      ? toast?.error("Please select any one option")
                      : setModalStatus(false);
                    setModalStatuss(true);
                    setEvent(finalEvent);
                    // console.log("Selected Event:", finalEvent);
                    // Continue logic
                  }}
                >
                  Continue
                </button>
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setModalStatus(false);
                  window.location.reload(true);
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}

      {modalStatus3 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%", // Ensure the modal doesn't overflow the screen height
              overflowY: "auto", // Enable scrolling within the modal content
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="DJ Service"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "23.0769%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
                  Which types of DJ service would you consider?
                </h3>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "Walk in DJ using my/venue's equipment",
                    "DJ using their own equipment",
                    "Karaoke",
                    "Other",
                  ].map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      {selectedServiceOption === "Other" &&
                      option === "Other" ? (
                        // If "Other" is selected, show input field
                        <input
                          type="text"
                          value={otherService}
                          onChange={(e) => setOtherService(e.target.value)}
                          placeholder="Please specify"
                          style={{
                            padding: "10px",
                            width: "100%",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : selectedServiceOption ===
                          "DJ using their own equipment" &&
                        option === "DJ using their own equipment" ? (
                        // If "DJ using their own equipment" is selected, show input field for equipment
                        <input
                          type="text"
                          value={otherService}
                          onChange={(e) => setOtherService(e.target.value)}
                          placeholder="Specify equipment"
                          style={{
                            padding: "10px",
                            width: "100%",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <>
                          <input
                            name={option.toLowerCase().replace(/\s+/g, "-")}
                            type="radio"
                            value={option}
                            checked={selectedServiceOption === option}
                            onChange={() => handleServiceOptionChange(option)}
                            style={{
                              marginRight: "10px",
                              appearance: "none",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              border: `2px solid ${
                                selectedServiceOption === option
                                  ? "#007bff"
                                  : "#ccc"
                              }`,
                              backgroundColor:
                                selectedServiceOption === option
                                  ? "#007bff"
                                  : "transparent",
                              outline: "none",
                              cursor: "pointer",
                              verticalAlign: "middle",
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>{option}</span>
                        </>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus3(false);
                    setModalStatuss(true);
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // Store the selected option or "Other" input value
                    const finalService =
                      selectedServiceOption === "Other" ||
                      selectedServiceOption === "DJ using their own equipment"
                        ? otherService
                        : selectedServiceOption;

                    if (finalService === "") {
                      toast?.error("Please select any one option");
                      return;
                    } else {
                      setModalStatus3(false);
                      setModalStatus4(true);
                      setService(finalService);
                    }
                  }}
                >
                  Continue
                </button>
              </div>

              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus3(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}
      {modalStatus4 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="Music Types"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "30.7692%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
                  Which type(s) of music would you consider?
                </h3>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "Film music",
                    "Folk music",
                    "House",
                    "Indian pop music",
                    "Rock",
                    "Top 40",
                    "Trance music",
                    "Western Pop",
                    // "I would like to discuss with the pro",
                    "Other",
                  ].map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      {selectedMusicOptions.includes("Other") &&
                      option === "Other" ? (
                        <input
                          type="text"
                          value={otherMusic}
                          onChange={(e) => setOtherMusic(e.target.value)}
                          placeholder="Please specify"
                          style={{
                            padding: "10px",
                            width: "100%",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <>
                          <input
                            type="radio"
                            value={option}
                            checked={selectedMusicOptions.includes(option)}
                            onChange={() => handleMusicOptionChange(option)}
                            style={{
                              marginRight: "10px",
                              appearance: "none",
                              width: "20px",
                              height: "20px",
                              borderRadius: "4px",
                              border: `2px solid ${
                                selectedMusicOptions.includes(option)
                                  ? "#007bff"
                                  : "#ccc"
                              }`,
                              backgroundColor: selectedMusicOptions.includes(
                                option
                              )
                                ? "#007bff"
                                : "transparent",
                              outline: "none",
                              cursor: "pointer",
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>{option}</span>
                        </>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus4(false);
                    setModalStatus3(true);
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const finalMusicTypes =
                      selectedMusicOptions.includes("Other") ||
                      selectedMusicOptions.includes(
                        "I would like to discuss with the pro"
                      )
                        ? otherMusic
                        : selectedMusicOptions;

                    if (finalMusicTypes.length === 0) {
                      toast.error("Please select any one option");
                    } else {
                      setModalStatus4(false);
                      setModalStatus5(true);
                      setMusic(finalMusicTypes);
                      console.log("Selected Music Types:", finalMusicTypes);
                    }
                  }}
                >
                  Continue
                </button>
              </div>

              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus4(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}

      {modalStatus5 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="Language Preferences"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "38.4615%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
                  In which language(s) would you prefer the music?
                </h3>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "Bengali",
                    "English",
                    "Hindi",
                    "Kannada",
                    "Malayalam",
                    "Marathi",
                    "Punjabi",
                    "Tamil",
                    "Telugu",
                    "Other",
                  ].map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      {selectedLanguageOptions.includes("Other") &&
                      option === "Other" ? (
                        // Show input field when "Other" is selected
                        <input
                          type="text"
                          value={otherLanguage}
                          onChange={(e) => setOtherLanguage(e.target.value)}
                          placeholder="Please specify"
                          style={{
                            padding: "10px",
                            width: "100%",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <>
                          <input
                            type="radio"
                            value={option}
                            checked={selectedLanguageOptions.includes(option)}
                            onChange={() => handleLanguageOptionChange(option)}
                            style={{
                              marginRight: "10px",
                              appearance: "none",
                              width: "20px",
                              height: "20px",
                              borderRadius: "4px",
                              border: `2px solid ${
                                selectedLanguageOptions.includes(option)
                                  ? "#007bff"
                                  : "#ccc"
                              }`,
                              backgroundColor: selectedLanguageOptions.includes(
                                option
                              )
                                ? "#007bff"
                                : "transparent",
                              outline: "none",
                              cursor: "pointer",
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>{option}</span>
                        </>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus5(false);
                    setModalStatus4(true);
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const finalLanguages = selectedLanguageOptions.includes(
                      "Other"
                    )
                      ? [otherLanguage]
                      : selectedLanguageOptions;

                    console.log("jkdjkskdsdsdsdsdsd", finalLanguages);

                    if (
                      finalLanguages[0] === "" ||
                      finalLanguages.length === 0
                    ) {
                      toast.error("Please select any one option");
                    } else {
                      setModalStatus5(false);
                      setModalStatus6(true);
                      setLanguage(finalLanguages);
                    }
                  }}
                >
                  Continue
                </button>
              </div>

              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus5(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}
      {modalStatus6 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg" // You can replace this with an appropriate venue-related image
              alt="Venue Type"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "46.1538%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
                  What type of venue is this for?
                </h3>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "Hotel/Conference venue",
                    "Local Hall/Community Centre",
                    "Nightclub",
                    "Private Residence",
                    "Pub/Bar",
                    "Restaurant",
                    "Shopping center/malls",
                    "Social Club",
                    "Other",
                  ].map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      {selectedVenueOptions.includes("Other") &&
                      option === "Other" ? (
                        <input
                          type="text"
                          value={otherVenue}
                          onChange={(e) => setOtherVenue(e.target.value)}
                          placeholder="Please specify"
                          style={{
                            padding: "10px",
                            width: "100%",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <>
                          <input
                            type="radio"
                            value={option}
                            checked={selectedVenueOptions.includes(option)}
                            onChange={() => handleVenueOptionChange(option)}
                            style={{
                              marginRight: "10px",
                              appearance: "none",
                              width: "20px",
                              height: "20px",
                              borderRadius: "4px",
                              border: `2px solid ${
                                selectedVenueOptions.includes(option)
                                  ? "#007bff"
                                  : "#ccc"
                              }`,
                              backgroundColor: selectedVenueOptions.includes(
                                option
                              )
                                ? "#007bff"
                                : "transparent",
                              outline: "none",
                              cursor: "pointer",
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>{option}</span>
                        </>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus6(false);
                    setModalStatus5(true);
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const finalVenues = selectedVenueOptions.includes("Other")
                      ? [otherVenue]
                      : selectedVenueOptions;

                    if (finalVenues[0] === "" || finalVenues?.length === 0) {
                      toast.error("Please select any one option");
                      return;
                    } else {
                      setModalStatus6(false);
                      setModalStatus7(true);
                      setVenue(finalVenues);
                    }
                  }}
                >
                  Continue
                </button>
              </div>

              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus6(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}
      {modalStatus7 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="DJ Date"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "53.8461%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>
                Have you set a date when you need the DJ?
              </h3>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {["Yes", "No", "Other"].map((option) => (
                  <label
                    key={option}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f9f9f9",
                      padding: "10px",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <input
                      type="radio"
                      value={option}
                      checked={selectedDateOption === option}
                      onChange={() => setSelectedDateOption(option)}
                      style={{
                        marginRight: "10px",
                        appearance: "none",
                        width: "20px",
                        height: "20px",
                        borderRadius: "4px",
                        border: `2px solid ${
                          selectedDateOption === option ? "#007bff" : "#ccc"
                        }`,
                        backgroundColor:
                          selectedDateOption === option
                            ? "#007bff"
                            : "transparent",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ marginLeft: "10px" }}>{option}</span>
                  </label>
                ))}
              </div>

              {selectedDateOption === "Other" && (
                <div style={{ marginTop: "20px" }}>
                  <input
                    type="text"
                    value={otherDate}
                    onChange={(e) => setOtherDate(e.target.value)}
                    placeholder="Please specify"
                    style={{
                      padding: "10px",
                      width: "100%",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus7(false);
                    setModalStatus6(true);
                  }} // Close modal
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleContinueDate}
                >
                  Continue
                </button>
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus7(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}
      {modalStatus8 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="DJ Date"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "61.5384%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>
                What is the date when the DJ is needed?
              </h3>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateSelection}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus8(false);
                    setModalStatus7(true);
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (!selectedDate) {
                      toast.error("Please select a date");
                    } else {
                      setModalStatus8(false);
                      setModalStatus10(true);
                      setApproxTime("");
                      console.log("DJ Date Selected:", selectedDate);
                      // Continue logic here
                    }
                  }}
                >
                  Continue
                </button>
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus8(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}
      {modalStatus9 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="DJ Approx Time"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "69.2307%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>
                Approximately when will you need the DJ?
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  "Within a week",
                  "Within 2 weeks",
                  "Within a month",
                  "Within 3 months",
                  "Within 6 months",
                  // "Other",
                ].map((option) => (
                  <label
                    key={option}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f9f9f9",
                      padding: "10px",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <input
                      type="radio"
                      value={option}
                      checked={approxTime === option}
                      onChange={() => handleApproxTimeSelection(option)}
                      style={{
                        marginRight: "10px",
                        appearance: "none",
                        width: "20px",
                        height: "20px",
                        borderRadius: "4px",
                        border: `2px solid ${
                          approxTime === option ? "#007bff" : "#ccc"
                        }`,
                        backgroundColor:
                          approxTime === option ? "#007bff" : "transparent",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ marginLeft: "10px" }}>{option}</span>
                  </label>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus9(false);
                    setModalStatus7(true);
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (!approxTime) {
                      toast.error("Please select an option");
                    } else {
                      setModalStatus9(false);
                      setModalStatus10(true);
                      setSelectedDate("");
                      console.log("DJ Approximate Time Selected:", approxTime);
                      // Continue logic here
                    }
                  }}
                >
                  Continue
                </button>
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus9(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}
      {modalStatus10 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="DJ Approx Time"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "76.923%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>
                Where do you need the DJ?
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  margin: "3px 0 20px 0",
                }}
              >
                The address and postcode for where you want the DJ.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <img
                  src="	https://cdn.pixabay.com/photo/2021/07/25/08/07/address-6491205_1280.png"
                  alt="Map Icon"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address and postcode"
                  style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (selectedDateOption === "Other") {
                      setModalStatus10(false);
                      setModalStatus7(true);
                      return;
                    }

                    if (selectedDate === "" && selectedDateOption === "No") {
                      setModalStatus10(false);
                      setModalStatus9(true);
                    } else {
                      setModalStatus10(false);
                      setModalStatus8(true);
                    }
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleContinueaddress}
                >
                  Continue
                </button>
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus10(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}

      {modalStatus11 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "center", // Center-align text
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Close Icon */}
            <span
              style={{
                position: "absolute",
                top: "20px",
                right: "10px",
                fontSize: "20px",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "#fff",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => setModalStatus(false)}
            >
              ×
            </span>

            {/* Icon Image at Top Center */}
            <div
              style={{
                position: "relative",
                // top: "-30px", // Adjust icon position slightly
                // marginBottom: "10px", // Adjust bottom margin for spacing
                margin: "15px",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/4436/4436481.png" // Replace with your image URL
                alt="Icon"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: "3px solid #007bff",
                }}
              />
            </div>

            <div style={{ padding: "20px", marginTop: "-10px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>
                Great! We've found you the perfect matches.
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  margin: "3px 0 20px 0",
                }}
              >
                Lastly, we need your details to attach to your request.
              </p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus11(false);
                    setModalStatus10(true);
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus11(false);
                    setModalStatus12(true);
                  }}
                >
                  Continue
                </button>
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus11(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}

      {modalStatus12 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="DJ Approx Time"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "84.6153%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>
                What email address would you like quotes sent to?
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus12(false);
                    setModalStatus10(true);

                    // Add your back button logic here
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleContinueEmail}
                >
                  Continue
                </button>
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus12(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}

      {modalStatus13 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "center", // Center-align text
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="DJ Approx Time"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "92.3076%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              {/* Big Heading */}
              <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>
                Your number is safe with us.
              </h3>

              {/* Centered Text */}
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  marginBottom: "20px",
                }}
              >
                Some matches prefer to provide quotes over the phone to get more
                details.
              </p>

              {/* Phone Number Input */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", // Centering input
                  marginBottom: "20px",
                }}
              >
                <input
                  type="number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter phone number"
                  style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // Add your back button logic here
                    setModalStatus13(false);
                    setModalStatus12(true);
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleContinuePhone}
                >
                  Continue
                </button>
              </div>

              {/* Close Icon */}
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus13(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}

      {modalStatus14 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://eu-bark-media.s3.eu-west-1.amazonaws.com/category_header_photos/1018-1533487304042.jpg"
              alt="DJ Approx Time"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  backgroundColor: "rgb(0, 123, 255)",
                  margin: "10px 0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              ></div>
              <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>
                What is your name?
              </h3>
              {/* <p style={{ marginBottom: "20px", fontSize: "16px" }}>
                Please tell us your name:
              </p> */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalStatus14(false);
                    setModalStatus13(true);
                    // Add your back button logic here
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: "7px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleContinueName}
                >
                  Continue
                </button>
              </div>
              <p style={{ fontSize: "12px", marginTop: "20px", color: "#666" }}>
                By continuing, you confirm your agreement to our{" "}
                <a
                  href="#"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  Terms & Conditions
                </a>
              </p>
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure that you want to leave?",
                    // text: "You won't  to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Quit",
                    cancelButtonText: "Continue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setModalStatus14(false);

                      window.location.reload(true);
                    }
                  });
                }}
              >
                ×
              </span>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Image at the top */}
            <img
              src="https://cdn-icons-png.flaticon.com/128/4436/4436481.png"
              alt="Thank you"
              style={{
                width: "100px", // Adjust the width as per your need
                height: "100px", // Same as width for a perfect circle
                objectFit: "cover",
                borderRadius: "50%", // To make the image circular
                margin: "20px auto 10px auto", // Center the image
                display: "block", // Ensures the image is centered
              }}
            />

            {/* Message content */}
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>
                Booking Confirmed!
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  marginBottom: "20px",
                }}
              >
                Your booking has been successfully completed. Thank you for
                choosing our service!
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#888",
                  marginBottom: "20px",
                }}
              >
                A DJ owner will contact you within the next few days to confirm
                the details of your booking.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HelicopterSearch;
