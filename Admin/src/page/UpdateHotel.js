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
import { DeleteUserBooking, getAllBooking } from "../service/HomeServeice";
import { ModalComponent } from "./ModalComponent";

const UpdateHotel = () => {
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

  const [Wholedata, setWholeDdata] = useState([]);

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
          Name
        </div>
      ),
      selector: (row) => row.Name,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Email
        </div>
      ),
      selector: (row) => row.email,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Phone_Number
        </div>
      ),
      selector: (row) => row.phonenumber,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Booking_Date
        </div>
      ),
      selector: (row) => row.selecteddate,
    },
    // {
    //   name: (
    //     <div
    //       style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
    //     >
    //       Address
    //     </div>
    //   ),
    //   selector: (row) => row.address,
    // },
    // {
    //   name: (
    //     <div
    //       style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
    //     >
    //       Event_Name
    //     </div>
    //   ),
    //   selector: (row) => row.eventname,
    // },
    // {
    //   name: (
    //     <div
    //       style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
    //     >
    //       Guest
    //     </div>
    //   ),
    //   selector: (row) => row.guest,
    // },
    // {
    //   name: (
    //     <div
    //       style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
    //     >
    //       Language
    //     </div>
    //   ),
    //   selector: (row) => row.language,
    // },
    // {
    //   name: (
    //     <div
    //       style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
    //     >
    //       Music
    //     </div>
    //   ),
    //   selector: (row) => row.music,
    // },
    // {
    //   name: (
    //     <div
    //       style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
    //     >
    //       Service
    //     </div>
    //   ),
    //   selector: (row) => row.service,
    // },

    // {
    //   name: (
    //     <div
    //       style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
    //     >
    //       Venue
    //     </div>
    //   ),
    //   selector: (row) => row.venue,
    // },
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
        prof_name: hotelName,
        prof_pic: image,
      };
      //  console.log("fsjfusdfjsdjfkjsd" , data);
      //  return
      // console.log("Darter", data);
      let res = await addNewProfession(data);
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
        prof_name: hotelName,
        prof_pic: image,
      };
      //  console.log("fsjfusdfjsdjfkjsd" , data);
      //  return
      // console.log("Darter", data);
      let res = await updateProfession(id, data);
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  //  const handleOpenModal = () => {
  //    setIsModalOpen(true);
  //  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onEdit = (item) => {
    setWholeDdata(item);
    setIsModalOpen(true);

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
        DeleteUserBooking(id)
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
    const response = await getAllBooking();
    console.log("jkujkjkljdsfdfdfdfdf", response?.data);
    if (response?.status) {
      setLoader(false);
      // console.log("L223", response.data.data);
      let arr = response?.data?.data?.map((item, index) => {
        return {
          sl: index + 1,
          Name: item?.name,
          // address: item?.address,
          selecteddate: item?.date ? item?.date : item?.needdate,
          email: item?.email,
          phonenumber: item?.phonenumber,
          // eventname: item?.eventname,
          // guest: item?.guest,
          // language: item?.language + ",",
          // music: item?.music + ",",
          // service: item?.service,
          // venue: item?.venue + ",",
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
                  height: "24px",
                  width: "24px",
                  cursor: "pointer",
                  color: "green",
                  marginLeft: "5px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>

              <svg
                onClick={() => onDelete(item?._id)}
                style={{
                  color: "red",
                  height: "20px",
                  cursor: "pointer",
                  width: "20px",
                  marginLeft: "18px",
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
        // console.log("jjkjkuiu", res, res?.image?.url);

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
          <h1>Booking management</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item">Booking</li>
              <li class="breadcrumb-item active">Manage</li>
            </ol>
          </nav>
        </div>
        <section class="section">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Booking Details</h5>
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
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userData={Wholedata}
      />
    </>
  );
};

export default UpdateHotel;
