import React, { useContext, useEffect, useState } from 'react'
import MultiRangeSlider from "multi-range-slider-react";
import Jsaccordian from '../../Components/Jsaccordian';
import { Colorcontext } from "../../Components/Context/ColorContext"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';
import { FilterHelicopterData } from '../../Components/API';
const Index = () => {

  const location = useLocation();
     const [firstValue, setFirstValue] = useState(1);
    const [secondValue, setSecondValue] = useState(11);
    const [FilterData , setFilterData] = useState([]);

    const { flyingFrom, flyingTo, passanger, Departs , Returns , newData  } = location.state || {};
    console.log("yuyuyghuyyu", FilterData);
    useEffect(() => {
      if(location?.state){
        
        setAddress(flyingFrom)
        setAddress1(flyingTo)
        setTravel(passanger)
        setDepart(Departs)
        setReturn(Returns);
        setFilterData(newData.data)
        // FilterDataSearch(newData?.data);
      }
    },[location?.state ])
    
    const colordata = useContext(Colorcontext);

    const loop = [1, 2, 3, 4, 5, 6];

 
    function handleRanges(value) {
        console.log("range");
        setFirstValue(value[0]);
        setSecondValue(value[1]);
        // console.log(value);
    }

    const FilterDataSearch = (data) => {
      setFilterData(data)
    }


console.log("hjkhjkhjkhjkhjh", FilterData);

    const [firstValue5, setFirstValue5] = useState(0);
    const [secondValue5, setSecondValue5] = useState(500);
        const [isshow, setIsshow] = useState(false);
        const [isCalen, showiscalen] = useState(false);
        const [isclass, setIsclass] = useState(false);
          const [address, setAddress] = useState('');
          const [address1, setAddress1] = useState('');
          const [travel, setTravel] = useState('');
          const [first_PostalCode, setfirst_PostalCode] = useState('');
          const [Depart, setDepart] = useState('');
          const [Return, setReturn] = useState('');
          const [Day, setDay] = useState('');
          const [Day1, setDay1] = useState('');

          const navigate = useNavigate();

          const handReturnClick = () => {
            setIsshow(!isshow);
          };

             const HandleSearch = async(e) => {
              e.preventDefault()
     
      if(address && address1 && travel && Depart && Return){
        let data1 = { flyingFrom: address, flyingTo: address1, passanger: Number(travel), Departs:Depart,Returns:Return };
        let data = {
          flyingFrom: address,
          flyingTo:address1,
          passanger:Number(travel)
        };

        let res = await FilterHelicopterData(data);
        if(res && res?.data){
          console.log("jkjfsduruewuruiuri", res);
          setFilterData(res?.data?.data)
          //  navigate('/flight-list', { state: (data1.newData = res?.data) });
        }else{ 
          toast.error("No data available")
          setFilterData([])}
        
       
      }else{
        toast.error("All fields are required")
      }
    }

          const handClick = () => {
            showiscalen(!isCalen);
          };

          const handClassClick = () => {
            setIsclass(!isclass);
          };

          const handleChangeAddress = e => {
            console.log('dfdd', e);
            setAddress(e);
            // setIsMapOpen(!isMapOpen);
          };

          const handleChangeAddress1 = e => {
            console.log('dfdd', e);
            setAddress1(e);
            // setIsMapOpen(!isMapOpen);
          };

          const handleSelect = address => {
            geocodeByAddress(address).then(results => {
              const reszipcode = results[0]?.address_components?.filter(ele =>
                ele.types.some(type => type === 'postal_code')
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
                .then(latLng => {
                  //  console.log('Success', latLng);
                  //  setLongitude(latLng?.lng);
                  //  setaLatitude(latLng?.lat);
                  //  setUserLatLng(latLng);
                  //  setMarkerlatLng(latLng);
                  //  setUserLocation(true);
                  setAddress(address);
                  //  setfirst_destination(address);
                })
                .catch(error => console.error('Error', error));
            });
          };

          const handleSelect1 = address => {
            geocodeByAddress(address).then(results => {
              const reszipcode = results[0]?.address_components?.filter(ele =>
                ele.types.some(type => type === 'postal_code')
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
                .then(latLng => {
                  //  console.log('Success', latLng);
                  //  setLongitude(latLng?.lng);
                  //  setaLatitude(latLng?.lat);
                  //  setUserLatLng(latLng);
                  //  setMarkerlatLng(latLng);
                  //  setUserLocation(true);
                  setAddress1(address);
                  //  setfirst_destination(address);
                })
                .catch(error => console.error('Error', error));
            });
          };
    function handleRangesprice(value) {
        console.log("range");
        setFirstValue5(value[0]);
        setSecondValue5(value[1]);
        // console.log(value);
    }
    useEffect(() => {
        colordata.setcolor(true);
        return () => {
            colordata.setcolor(false);
        };
    }, []);
    return (
      <>
        <div className="header-margin" />

        <section className="pt-40 pb-40">
          <div className="container">
            <div className="row y-gap-20 items-center">
              <div className="col-auto">
                <div className="dropdown js-dropdown js-return-active">
                  <div
                    className="dropdown__button d-flex items-center  text-15"
                    data-el-toggle=".js-return-toggle"
                    data-el-toggle-active=".js-return-active"
                  >
                    <span className="js-dropdown-title">Return</span>
                    <i className="icon icon-chevron-sm-down text-7 ml-10" />
                  </div>
                  <div className="toggle-element -dropdown  js-click-dropdown js-return-toggle">
                    <div className="text-14 y-gap-15 js-dropdown-list">
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          Animation
                        </a>
                      </div>
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          Design
                        </a>
                      </div>
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          Illustration
                        </a>
                      </div>
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          Lifestyle
                        </a>
                      </div>
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          Business
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <div className="dropdown js-dropdown js-economy-active">
                  <div
                    className="dropdown__button d-flex items-center  text-15"
                    data-el-toggle=".js-economy-toggle"
                    data-el-toggle-active=".js-economy-active"
                  >
                    <span className="js-dropdown-title">Economy</span>
                    <i className="icon icon-chevron-sm-down text-7 ml-10" />
                  </div>
                  <div className="toggle-element -dropdown  js-click-dropdown js-economy-toggle">
                    <div className="text-14 y-gap-15 js-dropdown-list">
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          Economy
                        </a>
                      </div>
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          Business
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <div className="dropdown js-dropdown js-bags-active">
                  <div
                    className="dropdown__button d-flex items-center  text-15"
                    data-el-toggle=".js-bags-toggle"
                    data-el-toggle-active=".js-bags-active"
                  >
                    <span className="js-dropdown-title">0 Bags</span>
                    <i className="icon icon-chevron-sm-down text-7 ml-10" />
                  </div>
                  <div className="toggle-element -dropdown  js-click-dropdown js-bags-toggle">
                    <div className="text-14 y-gap-15 js-dropdown-list">
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          0 Bags
                        </a>
                      </div>
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          1 Bag
                        </a>
                      </div>
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          2 Bags
                        </a>
                      </div>
                      <div>
                        <a href="#" className="d-block js-dropdown-link">
                          3 Bags
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mainSearch -col-5 border-light rounded-4 pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 mt-15">
              <div className="button-grid items-center">
                <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
                  <div data-x-dd-click="searchMenu-loc">
                    <h4 className="text-15 fw-500 ls-2 lh-16">Flying From</h4>
                    <div className="text-15 text-light-1 ls-2 lh-16">
                      {/* <input
                                            autoComplete="off"
                                            type="search"
                                            placeholder="City or Airport"
                                            className="js-search js-dd-focus"
                                        /> */}

                      <div style={{ color: 'grey' }}>
                        <PlacesAutocomplete
                          value={address}
                          onChange={e => handleChangeAddress(e)}
                          onSelect={handleSelect}
                        >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  border: '1px solid black',
                                  borderRadius: '5px',
                                  width: '120%',
                                }}
                              >
                                <input
                                  className="js-search js-dd-focus"
                                  style={{
                                    // pointerEvents: defaultAddressFlag ? '' : 'none',
                                    opacity: 0.7,
                                    textDecoration: 'none',
                                    border: 0,
                                    outline: 'none',
                                  }}
                                  // onChange={(e) => {
                                  //   alert("e");
                                  //   console.log("e.target.value", e.target.value);
                                  // }}
                                  {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'form-control address_input',
                                  })}
                                />
                                {/* {defaultAddressFlag ? <i class="fa fa-search"></i> : null} */}
                              </div>
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  // setfirst_destination(suggestion.description);
                                  console.log('sugesion', suggestion);
                                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                        {/* <button
                              style={{ position: 'relative', bottom: '32px', float: 'right', marginRight: '10px' }}
                              className="map-icon"
                              // onClick={toggleMap}
                            >
                              <i className="fas fa-map-marker-alt"></i>
                            </button> */}
                      </div>
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
                                <div className="text-15 lh-12 fw-500 js-search-option-target">London</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">Greater London, United Kingdom</div>
                              </div>
                            </div>
                          </button>
                        </div>
                        <div>
                          <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                            <div className="d-flex">
                              <div className="icon-location-2 text-light-1 text-20 pt-4" />
                              <div className="ml-10">
                                <div className="text-15 lh-12 fw-500 js-search-option-target">Guyana</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">Guyana State, United States</div>
                              </div>
                            </div>
                          </button>
                        </div>
                        <div>
                          <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                            <div className="d-flex">
                              <div className="icon-location-2 text-light-1 text-20 pt-4" />
                              <div className="ml-10">
                                <div className="text-15 lh-12 fw-500 js-search-option-target">Paris</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">France</div>
                              </div>
                            </div>
                          </button>
                        </div>
                        <div>
                          <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                            <div className="d-flex">
                              <div className="icon-location-2 text-light-1 text-20 pt-4" />
                              <div className="ml-10">
                                <div className="text-15 lh-12 fw-500 js-search-option-target">Madrid</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">Spain</div>
                              </div>
                            </div>
                          </button>
                        </div>
                        <div>
                          <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                            <div className="d-flex">
                              <div className="icon-location-2 text-light-1 text-20 pt-4" />
                              <div className="ml-10">
                                <div className="text-15 lh-12 fw-500 js-search-option-target">Santorini</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">Greece</div>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
                  <div data-x-dd-click="searchMenu-loc">
                    <h4 className="text-15 fw-500 ls-2 lh-16">Flying To</h4>
                    <div className="text-15 text-light-1 ls-2 lh-16">
                      {/* <input
                        autoComplete="off"
                        type="search"
                        placeholder="City or Airport"
                        className="js-search js-dd-focus"
                      /> */}
                      <div style={{ color: 'grey' }}>
                        <PlacesAutocomplete
                          value={address1}
                          onChange={e => handleChangeAddress1(e)}
                          onSelect={handleSelect1}
                        >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  border: '1px solid black',
                                  borderRadius: '5px',
                                  width: '115%',
                                }}
                              >
                                <input
                                  className="js-search js-dd-focus"
                                  autoCapitalize="off"
                                  style={{
                                    // pointerEvents: defaultAddressFlag ? '' : 'none',
                                    opacity: 0.7,
                                    textDecoration: 'none',
                                    border: 0,

                                    outline: 'none',
                                  }}
                                  // onChange={(e) => {
                                  //   alert("e");
                                  //   console.log("e.target.value", e.target.value);
                                  // }}
                                  {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'form-control address_input',
                                  })}
                                />
                                {/* {defaultAddressFlag ? <i class="fa fa-search"></i> : null} */}
                              </div>
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  // setfirst_destination(suggestion.description);
                                  console.log('sugesion', suggestion);
                                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                        {/* <button
                              style={{ position: 'relative', bottom: '32px', float: 'right', marginRight: '10px' }}
                              className="map-icon"
                              // onClick={toggleMap}
                            >
                              <i className="fas fa-map-marker-alt"></i>
                            </button> */}
                      </div>
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
                                <div className="text-15 lh-12 fw-500 js-search-option-target">London</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">Greater London, United Kingdom</div>
                              </div>
                            </div>
                          </button>
                        </div>
                        <div>
                          <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                            <div className="d-flex">
                              <div className="icon-location-2 text-light-1 text-20 pt-4" />
                              <div className="ml-10">
                                <div className="text-15 lh-12 fw-500 js-search-option-target">Guyana</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">Guyana State, United States</div>
                              </div>
                            </div>
                          </button>
                        </div>
                        <div>
                          <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                            <div className="d-flex">
                              <div className="icon-location-2 text-light-1 text-20 pt-4" />
                              <div className="ml-10">
                                <div className="text-15 lh-12 fw-500 js-search-option-target">Paris</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">France</div>
                              </div>
                            </div>
                          </button>
                        </div>
                        <div>
                          <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                            <div className="d-flex">
                              <div className="icon-location-2 text-light-1 text-20 pt-4" />
                              <div className="ml-10">
                                <div className="text-15 lh-12 fw-500 js-search-option-target">Madrid</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">Spain</div>
                              </div>
                            </div>
                          </button>
                        </div>
                        <div>
                          <button className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
                            <div className="d-flex">
                              <div className="icon-location-2 text-light-1 text-20 pt-4" />
                              <div className="ml-10">
                                <div className="text-15 lh-12 fw-500 js-search-option-target">Santorini</div>
                                <div className="text-14 lh-12 text-light-1 mt-5">Greece</div>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar js-calendar-el">
                  <div data-x-dd-click="searchMenu-date">
                    <h4 className="text-15 fw-500 ls-2 lh-16">Depart</h4>
                    <div className="capitalize text-15 text-light-1 ls-2 lh-16">
                      {/* <span className="js-first-date">Wed 2 Mar</span>-<span className="js-last-date">Fri 11 Apr</span> */}
                      <input type="date" value={Depart} onChange={e => setDepart(e.target.value)} />
                    </div>
                  </div>
                  <div
                    className="searchMenu-date__field shadow-2"
                    data-x-dd="searchMenu-date"
                    data-x-dd-toggle="-is-active"
                  >
                    <div className="bg-white px-30 py-30 rounded-4">
                      <div className="elCalendar js-calendar-el-calendar" />
                    </div>
                  </div>
                </div>
                <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar js-calendar-el">
                  <div data-x-dd-click="searchMenu-date">
                    <h4 className="text-15 fw-500 ls-2 lh-16">Return</h4>
                    <div className="capitalize text-15 text-light-1 ls-2 lh-16">
                      {/* <span className="js-first-date">Wed 2 Mar</span>-<span className="js-last-date">Fri 11 Apr</span> */}
                      <input type="date" value={Return} onChange={e => setReturn(e.target.value)} />
                    </div>
                  </div>
                  <div
                    className="searchMenu-date__field shadow-2"
                    data-x-dd="searchMenu-date"
                    data-x-dd-toggle="-is-active"
                  >
                    <div className="bg-white px-30 py-30 rounded-4">
                      <div className="elCalendar js-calendar-el-calendar" />
                    </div>
                  </div>
                </div>
                <div className="searchMenu-guests px-30 lg:py-20 lg:px-0 js-form-dd js-form-counters">
                  <div data-x-dd-click="searchMenu-guests">
                    <h4 className="text-15 fw-500 ls-2 lh-16">Travellers</h4>
                    <div className="text-15 text-light-1 ls-2 lh-16">
                      {/* <span className="js-count-adult">2</span> adults -<span className="js-count-child">1</span>{' '}
                      childeren -<span className="js-count-room">1</span> room */}
                      <input
                        type="text"
                        placeholder="Enter no of travellers"
                        value={travel}
                        onChange={e => setTravel(e.target.value)}
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
                          <div className="d-flex items-center js-counter" data-value-change=".js-count-adult">
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
                          <div className="text-15 lh-12 fw-500">Children</div>
                          <div className="text-14 lh-12 text-light-1 mt-5">Ages 0 - 17</div>
                        </div>
                        <div className="col-auto">
                          <div className="d-flex items-center js-counter" data-value-change=".js-count-child">
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
                          <div className="d-flex items-center js-counter" data-value-change=".js-count-room">
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
                  <button
                    onClick={HandleSearch}
                    className="mainSearch__submit button -blue-1 py-15 px-35 h-60 col-12 rounded-4 bg-dark-3 text-white"
                  >
                    <i className="icon-search text-20 mr-10" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="layout-pt-md layout-pb-md bg-light-2">
          <div className="container">
            <div className="row y-gap-30">
              <div className="col-xl-3 col-lg-4">
                <aside className="sidebar py-20 px-20 rounded-4 bg-white">
                  <div className="row y-gap-40">
                    <div className="sidebar__item -no-border">
                      <h5 className="text-18 fw-500 mb-10">Stops</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Nonstop</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">1 Stop</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">2+ Stops</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Cabin</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Basic Economy</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Economy</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Mixed</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item pb-30">
                      <h5 className="text-18 fw-500 mb-20">Flight Timings</h5>
                      <div className="row x-gap-10 y-gap-30">
                        <div className="col-12">
                          <div className="js-time-rangeSlider">
                            <div className="text-14 fw-500">Take-off Boston (BOS)</div>
                            <div className="d-flex justify-between mb-15">
                              <div className="text-14 text-light-1">
                                Tue <span> {firstValue}AM</span>
                              </div>

                              <span className="text-14 text-light-1"> {secondValue}PM</span>
                            </div>
                            <div>
                              <MultiRangeSlider min={0} max={100} step={1} onChange={handleRanges} />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="js-time-rangeSlider">
                            <div className="text-14 fw-500">Landing London (LON)</div>
                            <div className="d-flex justify-between mb-15">
                              <div className="text-14 text-light-1">
                                Tue <span> {firstValue}AM</span>
                              </div>
                              <span className="text-14 text-light-1"> {secondValue}PM</span>
                            </div>
                            <MultiRangeSlider min={0} max={100} step={1} onChange={handleRanges} />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="js-time-rangeSlider">
                            <div className="text-14 fw-500">Take-off London (LON)</div>
                            <div className="d-flex justify-between mb-15">
                              <div className="text-14 text-light-1">
                                Tue <span> {firstValue}AM</span>
                              </div>
                              <span className="text-14 text-light-1"> {secondValue}PM</span>
                            </div>
                            <MultiRangeSlider min={0} max={100} step={1} onChange={handleRanges} />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="js-time-rangeSlider">
                            <div className="text-14 fw-500">Landing Boston (BOS)</div>
                            <div className="d-flex justify-between mb-15">
                              <div className="text-14 text-light-1">
                                Tue <span> {firstValue}AM</span>
                              </div>
                              <span className="text-14 text-light-1"> {secondValue}PM</span>
                            </div>
                            <MultiRangeSlider min={0} max={100} step={1} onChange={handleRanges} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Airlines</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Air France</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Aer Lingus</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$45</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Air Canada</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$21</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Air Europa</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$79</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Turkish Airlines</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$900</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Alliance</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">oneworld</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">SkyTeam</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$45</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Star Alliance</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$21</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Departing from</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">BOS Boston</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">PVD Providence</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$45</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Arriving at</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">LCY London</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">LGW London</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$45</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item pb-30">
                      <h5 className="text-18 fw-500 mb-10">Price</h5>
                      <div className="row x-gap-10 y-gap-30">
                        <div>
                          <div className="display">
                            <span> ${firstValue5}</span>-<span> ${secondValue5}</span>
                          </div>
                          <MultiRangeSlider min={0} max={2000} step={1} onChange={handleRangesprice} />
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="row y-gap-10 justify-between items-center">
                  <div className="col-auto">
                    <div className="text-18">
                      <span className="fw-500">{FilterData.length > 0 ? FilterData?.length : 0} flights</span> in Guyana
                    </div>
                  </div>
                  <div className="col-auto">
                    <button className="button -blue-1 h-40 px-30 rounded-100 bg-blue-1-05 text-15 text-blue-1">
                      <i className="icon-up-down text-14 mr-10" />
                      Sort
                    </button>
                  </div>
                </div>
                {/* {loop.map((item, index) => {
                  return (
                    <div className="js-accordion" key={index}>
                        <div
                            className="accordion__item py-30 px-30 bg-white rounded-4 base-tr mt-30"
                            data-x="flight-item-1"
                            data-x-toggle="shadow-2"
                        >
                            <div className="row y-gap-30 justify-between">
                                <div className="col">
                                    <div className="row y-gap-10 items-center">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src={a}
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row y-gap-10 items-center pt-30">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src={b}
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-auto">
                                    <div className="d-flex items-center h-full">
                                        <div className="pl-30 border-left-light h-full md:d-none" />
                                        <div>
                                            <div className="text-right md:text-left mb-10">
                                                <div className="text-18 lh-16 fw-500">US$934</div>
                                                <div className="text-15 lh-16 text-light-1">
                                                    16 deals
                                                </div>
                                            </div>
                                            <div className="accordion__button">
                                                <button
                                                    className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                                                    data-x-click="flight-item-1"
                                                    onClick={()=>{setAccor(!accor)}}
                                                >
                                                    View Deal{" "}
                                                    <div className="icon-arrow-top-right ml-15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion__content" style={accor?{maxHeight:'100%'}:{}}>
                                <div className="border-light rounded-4 mt-30">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src={vv1} alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src={vv2} alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-light rounded-4 mt-20">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src={vv1} alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src={vv2} alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Jsaccordian FilterData={newData?.data}/>
                  );
                })} */}

                {/* <Jsaccordian filterData={newData?.data} /> */}
                {FilterData?.length > 0 ? <Jsaccordian filterData={FilterData} /> : <h3>No data available</h3>}
                {/* <div className="js-accordion">
                        <div
                            className="accordion__item py-30 px-30 bg-white rounded-4 base-tr mt-30"
                            data-x="flight-item-2"
                            data-x-toggle="shadow-2"
                        >
                            <div className="row y-gap-30 justify-between">
                                <div className="col">
                                    <div className="row y-gap-10 items-center">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/1.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row y-gap-10 items-center pt-30">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/2.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-auto">
                                    <div className="d-flex items-center h-full">
                                        <div className="pl-30 border-left-light h-full md:d-none" />
                                        <div>
                                            <div className="text-right md:text-left mb-10">
                                                <div className="text-18 lh-16 fw-500">US$934</div>
                                                <div className="text-15 lh-16 text-light-1">
                                                    16 deals
                                                </div>
                                            </div>
                                            <div className="accordion__button">
                                                <button
                                                    className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                                                    data-x-click="flight-item-2"
                                                >
                                                    View Deal{" "}
                                                    <div className="icon-arrow-top-right ml-15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion__content">
                                <div className="border-light rounded-4 mt-30">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-light rounded-4 mt-20">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="js-accordion">
                        <div
                            className="accordion__item py-30 px-30 bg-white rounded-4 base-tr mt-30"
                            data-x="flight-item-3"
                            data-x-toggle="shadow-2"
                        >
                            <div className="row y-gap-30 justify-between">
                                <div className="col">
                                    <div className="row y-gap-10 items-center">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/1.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row y-gap-10 items-center pt-30">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/2.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-auto">
                                    <div className="d-flex items-center h-full">
                                        <div className="pl-30 border-left-light h-full md:d-none" />
                                        <div>
                                            <div className="text-right md:text-left mb-10">
                                                <div className="text-18 lh-16 fw-500">US$934</div>
                                                <div className="text-15 lh-16 text-light-1">
                                                    16 deals
                                                </div>
                                            </div>
                                            <div className="accordion__button">
                                                <button
                                                    className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                                                    data-x-click="flight-item-3"
                                                >
                                                    View Deal{" "}
                                                    <div className="icon-arrow-top-right ml-15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion__content">
                                <div className="border-light rounded-4 mt-30">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-light rounded-4 mt-20">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="js-accordion">
                        <div
                            className="accordion__item py-30 px-30 bg-white rounded-4 base-tr mt-30"
                            data-x="flight-item-4"
                            data-x-toggle="shadow-2"
                        >
                            <div className="row y-gap-30 justify-between">
                                <div className="col">
                                    <div className="row y-gap-10 items-center">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/1.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row y-gap-10 items-center pt-30">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/2.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-auto">
                                    <div className="d-flex items-center h-full">
                                        <div className="pl-30 border-left-light h-full md:d-none" />
                                        <div>
                                            <div className="text-right md:text-left mb-10">
                                                <div className="text-18 lh-16 fw-500">US$934</div>
                                                <div className="text-15 lh-16 text-light-1">
                                                    16 deals
                                                </div>
                                            </div>
                                            <div className="accordion__button">
                                                <button
                                                    className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                                                    data-x-click="flight-item-4"
                                                >
                                                    View Deal{" "}
                                                    <div className="icon-arrow-top-right ml-15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion__content">
                                <div className="border-light rounded-4 mt-30">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-light rounded-4 mt-20">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="js-accordion">
                        <div
                            className="accordion__item py-30 px-30 bg-white rounded-4 base-tr mt-30"
                            data-x="flight-item-5"
                            data-x-toggle="shadow-2"
                        >
                            <div className="row y-gap-30 justify-between">
                                <div className="col">
                                    <div className="row y-gap-10 items-center">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/1.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row y-gap-10 items-center pt-30">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/2.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-auto">
                                    <div className="d-flex items-center h-full">
                                        <div className="pl-30 border-left-light h-full md:d-none" />
                                        <div>
                                            <div className="text-right md:text-left mb-10">
                                                <div className="text-18 lh-16 fw-500">US$934</div>
                                                <div className="text-15 lh-16 text-light-1">
                                                    16 deals
                                                </div>
                                            </div>
                                            <div className="accordion__button">
                                                <button
                                                    className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                                                    data-x-click="flight-item-5"
                                                >
                                                    View Deal{" "}
                                                    <div className="icon-arrow-top-right ml-15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion__content">
                                <div className="border-light rounded-4 mt-30">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-light rounded-4 mt-20">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="js-accordion">
                        <div
                            className="accordion__item py-30 px-30 bg-white rounded-4 base-tr mt-30"
                            data-x="flight-item-6"
                            data-x-toggle="shadow-2"
                        >
                            <div className="row y-gap-30 justify-between">
                                <div className="col">
                                    <div className="row y-gap-10 items-center">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/1.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row y-gap-10 items-center pt-30">
                                        <div className="col-sm-auto">
                                            <img
                                                className="size-40"
                                                src="img/flightIcons/2.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="row x-gap-20 items-end">
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">14:00</div>
                                                    <div className="text-15 lh-15 text-light-1">SAW</div>
                                                </div>
                                                <div className="col text-center">
                                                    <div className="flightLine">
                                                        <div />
                                                        <div />
                                                    </div>
                                                    <div className="text-15 lh-15 text-light-1 mt-10">
                                                        Nonstop
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="lh-15 fw-500">22:00</div>
                                                    <div className="text-15 lh-15 text-light-1">STN</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="text-15 text-light-1 px-20 md:px-0">
                                                4h 05m
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-auto">
                                    <div className="d-flex items-center h-full">
                                        <div className="pl-30 border-left-light h-full md:d-none" />
                                        <div>
                                            <div className="text-right md:text-left mb-10">
                                                <div className="text-18 lh-16 fw-500">US$934</div>
                                                <div className="text-15 lh-16 text-light-1">
                                                    16 deals
                                                </div>
                                            </div>
                                            <div className="accordion__button">
                                                <button
                                                    className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                                                    data-x-click="flight-item-6"
                                                >
                                                    View Deal{" "}
                                                    <div className="icon-arrow-top-right ml-15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion__content">
                                <div className="border-light rounded-4 mt-30">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-light rounded-4 mt-20">
                                    <div className="py-20 px-30">
                                        <div className="row justify-between items-center">
                                            <div className="col-auto">
                                                <div className="fw-500 text-dark-1">
                                                    Depart • Sat, Mar 26
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-14 text-light-1">4h 05m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-30 px-30 border-top-light">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <div className="d-flex items-center mb-15">
                                                    <div className="w-28 d-flex justify-center mr-15">
                                                        <img src="img/flights/1.png" alt="image" />
                                                    </div>
                                                    <div className="text-14 text-light-1">
                                                        Pegasus Airlines 1169
                                                    </div>
                                                </div>
                                                <div className="relative z-0">
                                                    <div className="border-line-2" />
                                                    <div className="d-flex items-center">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-white" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">8:25 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    Istanbul Sabiha Gokcen (SAW)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <img src="img/flights/plane.svg" alt="image" />
                                                        </div>
                                                        <div className="text-14 text-light-1">4h 05m</div>
                                                    </div>
                                                    <div className="d-flex items-center mt-15">
                                                        <div className="w-28 d-flex justify-center mr-15">
                                                            <div className="size-10 border-light rounded-full bg-border" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">9:30 am</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="lh-14 fw-500">
                                                                    London Stansted (STN)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-right md:text-left">
                                                <div className="text-14 text-light-1">Economy</div>
                                                <div className="text-14 mt-15 md:mt-5">
                                                    Airbus A320neo (Narrow-body jet)
                                                    <br />
                                                    Wi-Fi available
                                                    <br />
                                                    USB outlet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                {/* <div className="border-top-light mt-30 pt-30">
                  <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
                    <div className="col-auto md:order-1">
                      <button className="button -blue-1 size-40 rounded-full border-light">
                        <i className="icon-chevron-left text-12" />
                      </button>
                    </div>
                    <div className="col-md-auto md:order-3">
                      <div className="row x-gap-20 y-gap-20 items-center md:d-none">
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full">1</div>
                        </div>
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full bg-dark-1 text-white">2</div>
                        </div>
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full">3</div>
                        </div>
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full bg-light-2">4</div>
                        </div>
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full">5</div>
                        </div>
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full">...</div>
                        </div>
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full">20</div>
                        </div>
                      </div>
                      <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full">1</div>
                        </div>
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full bg-dark-1 text-white">2</div>
                        </div>
                        <div className="col-auto">
                          <div className="size-40 flex-center rounded-full">3</div>
                        </div>
                      </div>
                      <div className="text-center mt-30 md:mt-10">
                        <div className="text-14 text-light-1">1 – 20 of 300+ flights found</div>
                      </div>
                    </div>
                    <div className="col-auto md:order-2">
                      <button className="button -blue-1 size-40 rounded-full border-light">
                        <i className="icon-chevron-right text-12" />
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        <section className="layout-pt-md layout-pb-md bg-dark-2">
          <div className="container">
            <div className="row y-gap-30 justify-between items-center">
              <div className="col-auto">
                <div className="row y-gap-20  flex-wrap items-center">
                  <div className="col-auto">
                    <div className="icon-newsletter text-60 sm:text-40 text-white" />
                  </div>
                  <div className="col-auto">
                    <h4 className="text-26 text-white fw-600">Your Travel Journey Starts Here</h4>
                    <div className="text-white">Sign up and we'll send the best deals to you</div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <div className="single-field -w-410 d-flex x-gap-10 y-gap-20">
                  <div>
                    <input className="bg-white h-60" type="text" placeholder="Your Email" />
                  </div>
                  <div>
                    <button className="button -md h-60 bg-blue-1 text-white">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default Index

