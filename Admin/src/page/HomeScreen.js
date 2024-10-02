import React, { useEffect, useState } from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import Footer from "../component/common/Footer";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  addNewRoom,
  deleteTeam,
  fetchAllCountry,
  fetchAllRoom,
  fetchAllSession,
  fetchAllSports,
  fetchAllTeamLeauge,
  updateTeam,
  fetchAllTeam,
  updateTeamLeauge,
  uploadImageFile,
  updateRoom,
  deleteRoom,
  fetchAllFacility,
  FetchHotel,
  updateHotel,
  updateHotelData,
  fetchAllProperties,
  fetchAllProfession,
  deleteProfession,
  updateProfession,
  addNewProfession,
  fetchAllScreen,
  addNewScreen,
  updateScreen,
  deletSecren,
} from "../service/API";
import swal from "sweetalert";

import Loader from "../component/common/Loader";
import Swal from "sweetalert2";
import FileUploadingLoader from "../component/common/FileUploadingLoader";
import SelectableInput from "./SelectableInput";
import toast from "react-hot-toast";
import GogleMapNew from "./GogleMapNew";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { RotatingSquare } from "react-loader-spinner";

const HomeScreen = () => {
  const Initial = {
    hotelId: "",
    type: "",
    price: "",
    numberOfRooms: "",
    amenities: [],
  };

  const [markerlatlng, setMarkerlatLng] = useState({
    lat: 10,
    lng: 15,
  });

  const [image, setImage] = useState("");
  // const [Profileimage , setProfileImage] = useState("")
  const [userLocation, setUserLocation] = useState(false);
  const [first_destination, setfirst_destination] = useState("");
  const [timeAndDistanceObj, settimeAndDistanceObj] = useState({});
  const [isimgupload, setisimgupload] = useState(false);
  const [userLatLng, setUserLatLng] = useState({});
  const [address, setAddress] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [isupdate, setisupdate] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [cityName, setCityName] = useState("");
  const [description, setDescription] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setaLatitude] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");

  const [startPoint, setStartPoint] = useState({});
  const [first_PostalCode, setfirst_PostalCode] = useState("");
  const [endPoint, setendPoint] = useState({});

  const [RoomData, setRoomData] = useState(Initial);
  const [facilityData, setFacilityData] = useState([]);
  const [facalityValue, setFacilityValue] = useState([]);
  const [facility, setFacility] = useState([]);

  const [PropertiesData, setPropertiesData] = useState([]);
  const [PropertiesValue, setPropertiesValue] = useState([]);
  const [Properties, setProperties] = useState([]);

  // console.log('hjhhjkhjkh', facility);
  const [adults, setAdults] = useState(null);
  const [children, setChildren] = useState(null);

  const columns = [
    {
      name: (
        <div
          style={{
            fontSize: "14px",
            width: "25px",
            color: "#495057",
            fontWeight: "bolder",
          }}
        >
          SL
        </div>
      ),
      selector: (row) => row.sl,
      // sortable: true,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Home Screen Name
        </div>
      ),
      selector: (row) => row.Name,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Image
        </div>
      ),
      selector: (row) => row.Image,
    },

    {
      name: (
        <div
          style={{
            fontSize: "14px",
            color: "#495057",
            marginLeft: "15px",
            fontWeight: "bolder",
          }}
        >
          Action
        </div>
      ),
      selector: (row) => row.action,
    },
  ];
  const initialValues = {
    teamName: "",
    team_short_code: "",
    teamLogo: "",
    // teamLeagueID: "",
    // countryID: "",
    // sessionID:"",
    sportsID: "",
  };

  const HandlePrimaryVarient = (e) => {
    // console.log("PrimaryEvent", e);
    setFacilityValue(e);
    let arr = [];
    e?.map((item) => {
      return arr.push(item?.value);
    });
    setFacility(arr);

    //  setFacilityValue(arr);
  };

  const HandlePrimaryVarients = (e) => {
    // console.log("PrimaryEvent", e);
    setPropertiesValue(e);
    let arr = [];
    e?.map((item) => {
      return arr.push(item?.value);
    });
    setProperties(arr);

    //  setFacilityValue(arr);
  };

  const handleChange = (e) => {
    setRoomData({
      ...RoomData,
      [e.target.name]: e.target.value,
    });
  };

  const FetchAllFacility = async () => {
    let arr = [];
    let res = await fetchAllFacility();
    if (res && res?.status) {
      res?.data?.data?.map((ele) => {
        arr.push({ label: ele?.name, value: ele?._id });
      });

      setFacilityData(arr);
    }
  };

  const FetchAllProperties = async () => {
    let arr = [];
    let res = await fetchAllProperties();
    if (res && res?.status) {
      res?.data?.data?.map((ele) => {
        arr.push({ label: ele?.name, value: ele?._id });
      });

      setPropertiesData(arr);
    }
  };

  const AddProfession = async () => {
    if (hotelName) {
      // setisupdate(true);
      let data = {
        homescreen_name: hotelName,
        homescreen_pic: image,
      };
      //  console.log("fsjfusdfjsdjfkjsd" , data);
      //  return
      // console.log("Darter", data);
      let res = await addNewScreen(data);
      if (res && res?.status) {
        toast.success("Added Successfully");
        let file = document.querySelector("#imageId");
        file.value = "";
        setImage("");
        setHotelName("");
        fetchHotel();
        setHide(true);
      } else {
        setisupdate(false);
        toast.error("Failed to add ");
      }
    } else {
      setisupdate(false);
      toast.error("All fields are required");
    }
  };

  const UpdateHotel = async () => {
    if (hotelName) {
      setisupdate(true);
      let data = {
        homescreen_name: hotelName,
        homescreen_pic: image,
      };
      //  console.log("fsjfusdfjsdjfkjsd" , data);
      //  return
      // console.log("Darter", data);
      let res = await updateScreen(id, data);
      if (res && res?.status) {
        toast.success("Updated Successfully");
        let file = document.querySelector("#imageId");
        file.value = "";
        setImage("");
        setHotelName("");
        fetchHotel();
        setHide(true);
      } else {
        setisupdate(false);
        toast.error("Failed to update ");
      }
    } else {
      setisupdate(false);
      toast.error("All fields are required");
    }
  };

  const onEdit = (item) => {
    console.log("itemhghghghgh", item);
    setHide(false);
    setId(item?._id);
    setHotelName(item?.homescreen_name);
    setImage(item?.homescreen_pic);
    window.scroll(0, 0);

    //  navigate('/edit-blog', { state: item });
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't  to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletSecren(id)
          .then((res) => {
            console.log("kogfdgifdgiifugufdg", res);

            if (res && res.status) {
              toast.success("Deleted Successfully");
              fetchHotel();
            } else {
              toast.error("Failed to Delete the Item ");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const [inputData, setInputData] = useState(initialValues);
  const [dataError, setDataError] = useState({});
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editItemID, setEditItemID] = useState();
  const [allSports, setAllSports] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allLeagues, setAllLeagues] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  let name, value;

  useEffect(() => {
    fetchHotel();
    fetchAllCountries();
    fetchAllLeagues();
    fetchAllSessions();
    fetchAllSportsData();
    FetchAllFacility();
    FetchAllProperties();
  }, []);

  const fetchAllSportsData = async () => {
    const response = await fetchAllSports();
    if (response && Object.keys(response.data.data).length > 0) {
      let arrSports = response.data.data.sort().reverse();
      setAllSports(arrSports);
    }
  };

  const fetchAllSessions = async () => {
    const response = await fetchAllSession();
    if (response && Object.keys(response.data.data).length > 0) {
      let arrSessions = response.data.data.sort().reverse();
      setAllSessions(arrSessions);
    }
  };

  const postData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setInputData({ ...inputData, [name]: value });

    let errorMsg = "";
    switch (name) {
      case "leaugeName":
        errorMsg = "Leauge name should not be empty";
        break;
      default:
        errorMsg = "";
    }

    if (value === null || value === "" || value === undefined) {
      setDataError({ ...dataError, [name]: errorMsg });
    } else {
      setDataError({ ...dataError, [name]: "" });
    }
  };
  const validateData = () => {
    let error = {};
    // if (inputData.countryID === "" || inputData.countryID === null || inputData.countryID === undefined) {
    //     error.countryID = "Choose Country Name";
    // }
    // if (inputData.sessionID === "" || inputData.sessionID === null || inputData.sessionID === undefined) {
    //     error.sessionID = "Choose Session Name";
    // }
    // if (inputData.teamLeagueID === "" || inputData.teamLeagueID === null || inputData.teamLeagueID === undefined) {
    //     error.teamLeagueID = "Choose League Name";
    // }
    if (
      inputData.teamName === "" ||
      inputData.teamName === null ||
      inputData.teamName === undefined
    ) {
      error.teamName = "Please enter Team Name";
    }
    if (
      inputData.team_short_code === "" ||
      inputData.team_short_code === null ||
      inputData.team_short_code === undefined
    ) {
      error.team_short_code = "Enter Short Code";
    }
    return error;
  };

  const updateData = async (e) => {
    e.preventDefault();
    let ErrorList = validateData();
    setDataError(validateData());
    if (Object.keys(ErrorList).length === 0) {
      const response = await updateTeam(editItemID, inputData);

      setInputData(initialValues);
      fetchHotel();
      response.data.status
        ? swal("Good job!", response.data?.message, "success")
        : swal("Error", response.message, "error");
      setEditItemID("");
    }
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
          console.log("Success", latLng);
          setLongitude(latLng?.lng);
          setaLatitude(latLng?.lat);
          setUserLatLng(latLng);
          setMarkerlatLng(latLng);
          setUserLocation(true);
          setAddress(address);
          setfirst_destination(address);
        })
        .catch((error) => console.error("Error", error));
    });
  };

  const toggleMap = () => {
    if (address) {
      setIsMapOpen(!isMapOpen);
    }
  };

  const handleChangeAddress = (e) => {
    console.log("dfdd", e);
    setAddress(e);
    // setIsMapOpen(!isMapOpen);
  };

  const deleteData = async (id) => {
    const response = await deleteTeam(id);
    // console.log("L212", response)
    if (response.data.status) {
      swal("Good job!", response.data?.message, "success");
      setInputData(initialValues);
      fetchHotel();
    } else {
      swal("Error", response.data?.message, "error");
    }
  };

  // const onDelete = (id) => {
  //     Swal.fire({
  //         title: "Are you sure?",
  //         // text: "You won't  to delete this!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //         if (result.isConfirmed) {
  //             deleteData(id)
  //         }
  //     });
  // };

  const fetchHotel = async () => {
    setLoader(true);
    const response = await fetchAllScreen();
    console.log("jkujkjkljdsfdfdfdfdf", [response?.data?.data]);
    if (response?.status) {
      setLoader(false);
      // console.log("L223", response.data.data);
      let arr = response?.data?.data?.map((item, index) => {
        return {
          sl: index + 1,
          Name: item?.homescreen_name,
          Image: (
            <>
              {item?.homescreen_pic ? (
                <>
                  <img
                    style={{
                      height: "55%",
                      width: "55%",
                      borderRadius: "14px",
                      margin: "5px",
                    }}
                    src={item?.homescreen_pic}
                  />
                </>
              ) : (
                <img
                  style={{
                    height: "35%",
                    width: "35%",
                    borderRadius: "14px",
                    margin: "5px",
                  }}
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                  }
                />
              )}
            </>
          ),
          // location: item?.city,
          // desc: item?.description,
          // address: item?.address,
          // latitude: item?.location?.coordinates[0],
          // longitude: item?.location?.coordinates[1],
          action: (
            <div style={{ display: "flex", flexDirection: "coloum" }}>
              <svg
                onClick={() => onEdit(item)}
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
              <svg
                onClick={() => onDelete(item?._id)}
                style={{
                  color: "red",
                  height: "20px",
                  cursor: "pointer",
                  width: "20px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </div>
          ),
        };
      });
      console.log("L275", arr);
      setFilteredData(arr);
      setAllData(arr);
    }
  };

  const fetchAllCountries = async () => {
    const response = await fetchAllCountry();
    if (response && Object.keys(response.data.data).length > 0) {
      let arrCountries = response.data.data.sort().reverse();
      setAllCountries(arrCountries);
    }
  };

  const fetchAllLeagues = async () => {
    const response = await fetchAllTeamLeauge();
    if (response && Object.keys(response.data.data).length > 0) {
      let arrLeauges = response.data.data.sort().reverse();
      setAllLeagues(arrLeauges);
    }
  };

  //image upload
  // const ImageUpload = async e => {
  //   let imgArr = [];
  //   console.log('hfdsjf', e);
  //   setisimgupload(true);

  //   let file = e.target.files;
  //   for (let item of file) {
  //     const data = new FormData();
  //     data.append('image', item);

  //     try {
  //       let res = await uploadImageFile(data);
  //       if (res && res?.status) {
  //         setisimgupload(false);
  //         imgArr.push(res?.url);
  //         //  setinputData({ ...inputDatas, profileImage: res?.url });
  //       } else {
  //         setisimgupload(false);
  //         toast.error('Failed to add image');
  //       }
  //     } catch (error) {
  //       setisimgupload(false);
  //       console.log(error);
  //     }
  //   }
  //   setImage([...image, imgArr].flat());
  // };

  const ImageUpload = async (e) => {
    // let imgArr = [];
    // console.log('hfdsjf', e);
    setisimgupload(true);

    // let file = e.target.files;
    // for (let item of file) {
    let file = e.target.files[0];
    let data = new FormData();
    data.append("image", file);

    try {
      let res = await uploadImageFile(data);
      if (res && res?.status) {
        setisimgupload(false);
        setImage(res?.data?.image?.url);
        // imgArr.push(res?.url);
        //  setinputData({ ...inputDatas, profileImage: res?.url });
      } else {
        setisimgupload(false);
        toast.error("Failed to add image");
      }
    } catch (error) {
      setisimgupload(false);
      console.log(error);
    }
    // }
    // setImage([...image, imgArr].flat());
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Home screen management</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item">Home Screen</li>
              <li class="breadcrumb-item active">Manage</li>
            </ol>
          </nav>
        </div>
        <section class="section">
          <div class="row">
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Home Screen details</h5>

                  <div class="row g-3">
                    {uploadLoader && <FileUploadingLoader />}

                    {inputData.teamLogo && !uploadLoader && (
                      <>
                        <div class="col-md-12 text-center">
                          <img
                            style={{
                              // height: "10%",
                              maxWidth: "100%",
                              marginTop: "12px",
                              borderRadius: "9px",
                            }}
                            src={inputData.teamLogo}
                          />
                        </div>
                      </>
                    )}
                    {/* <div class="col-md-12">
                        <div class="form-floating">
                          <input
                            id="teamLogo"
                            name="teamLogo"
                            onChange={e => uploadHandler(e)}
                            class="form-control"
                            type="file"
                            accept="image/*"
                          />
                          <label for="sportsName">Team Logo</label>
                          <div class="validate text-danger">{dataError.teamLogo}</div>
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="form-floating -mb-3">
                          <select
                            class="form-select"
                            id="sportsID"
                            aria-label="Floating label select example"
                            name="sportsID"
                            onChange={e => {
                              postData(e);
                              // e.target.value && fetchAllPlayerTags(e.target.value)
                              // e.target.value && fetchAllSportsWisePositions(e.target.value)
                            }}
                          >
                            <option selected>Choose sports...</option>
                            {allSports.map((item, index) => {
                              return (
                                <>
                                  <option
                                    value={item._id}
                                    key={index}
                                    selected={item._id == inputData.sportsID ? true : false}
                                  >
                                    {item.sportsName}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                          <label for="teamLeagueID">Playing for Sports:</label>
                        </div>
                        <div class="validate text-danger">{dataError.sportsID}</div>
                      </div> */}

                    {/* <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="countryID"
                                                    aria-label="Floating label select example"
                                                    name="countryID"
                                                    onChange={(e) => postData(e)}
                                                >
                                                    <option selected>Choose country...</option>
                                                    {
                                                        allCountries.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.countryID ? true : false}
                                                                    >{item.countryName ? item.countryName : item.name}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="countryID">Belongs to country:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.countryID}</div>
                                        </div> */}

                    {/* <div class="col-md-4">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="sessionID"
                                                    aria-label="Floating label select example"
                                                    name="sessionID"
                                                    onChange={(e) => postData(e)}
                                                >
                                                    <option selected>Choose...</option>
                                                    {
                                                        allSessions.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.sessionID ? true : false}
                                                                    >{item.sessionYear}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="sessionID">Session:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.sessionID}</div>
                                        </div> */}

                    {/* <div class="col-md-8">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="teamLeagueID"
                                                    aria-label="Floating label select example"
                                                    name="teamLeagueID"
                                                    onChange={(e) => postData(e)}
                                                >
                                                    <option selected>Choose league...</option>
                                                    {
                                                        allLeagues.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.teamLeagueID ? true : false}
                                                                    >{item.leaugeName}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="teamLeagueID">Playing for League:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.teamLeagueID}</div>
                                        </div> */}

                    <div class="col-md-12">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control"
                          id="teamName"
                          placeholder="Home Screen Name"
                          name="type"
                          value={hotelName}
                          onChange={(e) => setHotelName(e.target.value)}
                        />
                        <label for="teamName">Home screen name</label>
                        {/* <div class="validate text-danger">{dataError.teamName}</div> */}
                      </div>
                    </div>

                    {/* {inputData.image && !uploadLoader && (
                      <>
                        <div class="col-md-12 text-center">
                          <img
                            style={{
                              // height: "10%",
                              maxWidth: '100%',
                              marginTop: '12px',
                              borderRadius: '9px',
                            }}
                            src={inputData.image}
                          />
                        </div>
                      </>
                    )} */}

                    <div class="col-md-12">
                      <div class="form-floating">
                        <input
                          id="imageId"
                          name="image"
                          onChange={(e) => ImageUpload(e)}
                          class="form-control"
                          type="file"
                          accept="image/*"
                        />
                        <label for="sportsName">Home screen image</label>
                      </div>
                      {isimgupload ? (
                        <RotatingSquare
                          visible={true}
                          height="100"
                          width="100"
                          color="#4fa94d"
                          ariaLabel="rotating-square-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        <div style={{ display: "flex" }}>
                          {image && (
                            <span>
                              <img
                                src={image}
                                className="img-fluid m-1"
                                alt="Responsive image"
                                style={{
                                  margin: "12px",
                                  borderRadius: "5px",
                                  height: "100px",
                                  width: "100px",
                                }}
                              />
                              {/* <span
                                  style={{ fontSize: '25px', cursor: 'pointer' }}
                                  onClick={() => {
                                    let imgArr = image?.filter((item, ind) => ind !== i);
                                    setImage(imgArr);
                                    // setFormData(prev => ({ ...prev, productImg: imgArr }));
                                  }}
                                >
                                  x
                                </span> */}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* <div class="col-md-12">
                      <div class="form-floating -mb-3">
                        <option value="">Choose facility...</option>
                        <Select
                          className="select"
                          options={facilityData}
                          value={facalityValue}
                          name="size"
                          isMulti
                          onChange={HandlePrimaryVarient}
                          style={{
                            height: '55px',
                          }}
                        />
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-floating -mb-3">
                        <option value="">Choose properties...</option>
                        <Select
                          className="select"
                          options={PropertiesData}
                          value={PropertiesValue}
                          name="size"
                          isMulti
                          onChange={HandlePrimaryVarients}
                          style={{
                            height: '55px',
                          }}
                        />
                      </div>
                    </div> */}

                    {/* {isMapOpen && (
                      <GogleMapNew
                        startPoint={startPoint}
                        setStartPoint={setStartPoint}
                        endPoint={endPoint}
                        settimeAndDistanceObj={settimeAndDistanceObj}
                        setendPoint={setendPoint}
                        iamFrom={'StartPoint'}
                        markerlatlng={markerlatlng}
                        setMarkerlatLng={setMarkerlatLng}
                        setAddress={setAddress}
                        setaLatitude={setaLatitude}
                        setLongitude={setLongitude}
                      />
                    )} */}

                    <div class="text-center">
                      {hide ? (
                        <button
                          // type="submit"
                          class="btn btn-primary"
                          style={{
                            marginRight: "5px",
                          }}
                          onClick={AddProfession}
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          // type="submit"
                          class="btn btn-primary"
                          style={{
                            marginRight: "5px",
                          }}
                          onClick={UpdateHotel}
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">HomeScreen Details</h5>
                  {loader ? (
                    <Loader />
                  ) : (
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      pagination
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomeScreen;
