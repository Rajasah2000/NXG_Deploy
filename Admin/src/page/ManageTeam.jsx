import React, { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import Sidebar from '../component/common/Sidebar'
import Footer from '../component/common/Footer'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import {
  addNewRoom,
  deleteTeam,
  fetchAllCountry,
  fetchAllRoom,
  fetchAllSession,
  fetchAllSports,
  fetchAllTeamLeauge,
  updateTeam,
  fetchAllTeam,updateTeamLeauge,
  uploadImageFile,
  updateRoom,
  deleteRoom,
} from '../service/API';
import swal from 'sweetalert'
import Loader from '../component/common/Loader'
import Swal from 'sweetalert2'
import FileUploadingLoader from '../component/common/FileUploadingLoader'
import SelectableInput from './SelectableInput'
import toast from 'react-hot-toast'

const ManageTeam = () => {

    const Initial = {
      hotelId: '',
      type: '',
      price: '',
      numberOfRooms: '',
      amenities: [],
    };

  const [RoomData, setRoomData] = useState(Initial);
    const [adults, setAdults] = useState(null);
    const [children, setChildren] = useState(null);
      const [hide, setHide] = useState(true);
      const [id, setId] = useState('');

   const columns = [
     {
       name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>SL</div>,
       selector: row => row.sl,
     },
    //  {
    //    name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>Hotel Name</div>,
    //    selector: row => row.Name,
    //  },
     {
       name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>Room Type</div>,
       selector: row => row.type,
     },
     {
       name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>Price</div>,
       selector: row => row.price,
     },
     {
       name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>Number of Room</div>,
       selector: row => row.nor,
     },
     {
       name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>Adults</div>,
       selector: row => row.adults,
     },
     {
       name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>Children</div>,
       selector: row => row.children,
     },

     {
       name: (
         <div
           style={{
             fontSize: '14px',
             color: '#495057',
             marginLeft: '15px',
             fontWeight: 'bolder',
           }}
         >
           Action
         </div>
       ),
       selector: row => row.action,
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
    }

     const handleChange = e => {
       setRoomData({
         ...RoomData,
         [e.target.name]: e.target.value,
       });
     };

     const AddRoom = async (e) => {
 
      e.preventDefault()
       if (
        //  RoomData?.hotelId &&
         RoomData?.type &&
         RoomData?.price &&
         RoomData?.numberOfRooms &&
         RoomData?.amenities &&
         adults &&
         children
       ) {
         RoomData.members = {
           adults: adults,
           children: children,
         };

         try {
           let res = await addNewRoom(RoomData);
          //  console.log('Response', res);
           if (res && res?.status) {
             toast.success('Room created successfully');
             setRoomData(Initial);
             setAdults('');
             setChildren('');
             fetchAllData();
           } else {
             toast.error(res?.message);
           }
         } catch (error) {
           console.error(error);
         }
       } else {
         toast.error('All fields are required');
       }
     };

     const UpdateRoom = async (e) => {
      e.preventDefault()
       if (
        //  RoomData?.hotelId &&
         RoomData?.type &&
         RoomData?.price &&
         RoomData?.numberOfRooms &&
         RoomData?.amenities &&
         adults &&
         children
       ) {
         RoomData.members = {
           adults: adults,
           children: children,
         };

         try {
           let res = await updateRoom(id, RoomData);
           console.log('Response', res);
           if (res && res?.status) {
             toast.success('Room updated successfully');
             setRoomData(Initial);
             setAdults('');
             setChildren('');
             setHide(true)
             fetchAllData();
           } else {
             toast.error(res?.message);
           }
         } catch (error) {
           console.error(error);
         }
       } else {
         toast.error('All fields are required');
       }
     };

     const onEdit = item => {
      //  console.log('kljkjkjj', item);
       window.scroll(0, 0);
       setAdults(item?.members?.adults);
       setChildren(item?.members?.children);
       setId(item?._id);
       setHide(false);
       setRoomData({
         ...RoomData,
         hotelId: item?.hotelId,
         type: item?.type,
         price: item?.price,
         numberOfRooms: item?.numberOfRooms,
         amenities: item?.amenities,
       });
     };

     const onDelete = id => {
       Swal.fire({
         title: 'Are you sure?',
         // text: "You won't  to delete this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!',
       }).then(result => {
         if (result.isConfirmed) {
           deleteRoom(id)
             .then(res => {
               if (res && res.status) {
                 toast.success('Deleted Successfully');
                 fetchAllData();
               } else {
                 toast.error('Failed to Delete the Item ');
               }
             })
             .catch(err => {
               console.log(err);
             });
         }
       });
     };


    const [inputData, setInputData] = useState(initialValues);
    const [dataError, setDataError] = useState({});
    const [allData, setAllData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [editItemID, setEditItemID] = useState()
    const [allSports, setAllSports] = useState([])
    const [allCountries, setAllCountries] = useState([])
    const [allLeagues, setAllLeagues] = useState([])
    const [allSessions, setAllSessions] = useState([])
    const [loader, setLoader] = useState(false)
    const [uploadLoader, setUploadLoader] = useState(false)
    let name, value

    useEffect(() => {
        fetchAllData()
        fetchAllCountries()
        fetchAllLeagues()
        fetchAllSessions()
        fetchAllSportsData()
    }, [])

    const fetchAllSportsData = async () => {
        const response = await fetchAllSports()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrSports = response.data.data.sort().reverse();
            setAllSports(arrSports)
        }
    }

    const fetchAllSessions = async () => {
        const response = await fetchAllSession()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrSessions = response.data.data.sort().reverse();
            setAllSessions(arrSessions)
        }
    }

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
    }
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
        if (inputData.teamName === "" || inputData.teamName === null || inputData.teamName === undefined) {
            error.teamName = "Please enter Team Name";
        }
        if (inputData.team_short_code === "" || inputData.team_short_code === null || inputData.team_short_code === undefined) {
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

            setInputData(initialValues)
            fetchAllData()
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
            setEditItemID("")
        }
    }


    const deleteData = async (id) => {
        const response = await deleteTeam(id)
        // console.log("L212", response)
        if (response.data.status) {
            swal("Good job!", response.data?.message, "success")
            setInputData(initialValues)
            fetchAllData()
        } else {
            swal("Error", response.data?.message, "error")
        }

    }


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

    const fetchAllData = async () => {
        setLoader(true)
        const response = await fetchAllRoom()
        console.log('jkujkjkljdsfdfdfdfdf', response?.data?.data);
        if (response?.status) {
            setLoader(false)
            // console.log("L223", response.data.data);
            let arr = response?.data?.data?.map((item, index) => {
              return {
                sl: index + 1,
                // Name: item?.hotelDetails?.name,
                type: item?.type,
                price: item?.price,
                nor: item?.numberOfRooms,
                adults: item?.members?.adults,
                children: item?.members.children,
                action: (
                  <div style={{ display: 'flex', flexDirection: 'coloum' }}>
                    <svg
                      onClick={() => onEdit(item)}
                      style={{
                        height: '20px',
                        width: '20px',
                        cursor: 'pointer',
                        marginRight: '20px',
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
                        color: 'red',
                        height: '20px',
                        cursor: 'pointer',
                        width: '20px',
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
            setFilteredData(arr)
            setAllData(arr);
        }
    }

    const fetchAllCountries = async () => {
        const response = await fetchAllCountry()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrCountries = response.data.data.sort().reverse();
            setAllCountries(arrCountries)
        }
    }

    const fetchAllLeagues = async () => {
        const response = await fetchAllTeamLeauge()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrLeauges = response.data.data.sort().reverse();
            setAllLeagues(arrLeauges)
        }
    }

    const uploadHandler = async (e) => {
        setUploadLoader(true);
        let data = new FormData();
        data.append("file", e.target.files[0]);



        let res = await uploadImageFile(data)
        console.log("uploadImageFile", res.data.data);
        // return
        if (res && res.data.status) {
            //   toast.success("Image uploaded successfully");
            setInputData({ ...inputData, teamLogo: res.data.data })
            setUploadLoader(false);
        } else {
            setInputData({ ...inputData, teamLogo: "" })
            setUploadLoader(false);
        }
    }

    return (
      <>
        <Header />
        <Sidebar />
        <main id="main" class="main">
          <div class="pagetitle">
            <h1>Profession management</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li class="breadcrumb-item">Profession</li>
                <li class="breadcrumb-item active">Manage</li>
              </ol>
            </nav>
          </div>
          <section class="section">
            <div class="row">
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Profession details</h5>

                    <div class="row g-3">
                      {uploadLoader && <FileUploadingLoader />}

                      {inputData.teamLogo && !uploadLoader && (
                        <>
                          <div class="col-md-12 text-center">
                            <img
                              style={{
                                // height: "10%",
                                maxWidth: '100%',
                                marginTop: '12px',
                                borderRadius: '9px',
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
                            placeholder="Room Type"
                            name="type"
                            value={RoomData.type}
                            onChange={e => {
                              handleChange(e);
                            }}
                          />
                          <label for="teamName">Room Type</label>
                          {/* <div class="validate text-danger">{dataError.teamName}</div> */}
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="form-floating">
                          <input
                            type="number"
                            class="form-control"
                            id="teamName"
                            placeholder="Price"
                            name="price"
                            value={RoomData.price}
                            onChange={e => {
                              handleChange(e);
                            }}
                          />
                          <label for="teamName">Price</label>
                          {/* <div class="validate text-danger">{dataError.teamName}</div> */}
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-floating">
                          <input
                            type="number"
                            class="form-control"
                            id="teamName"
                            placeholder="Number of Rooms"
                            name="numberOfRooms"
                            value={RoomData.numberOfRooms}
                            onChange={e => {
                              handleChange(e);
                            }}
                          />
                          <label for="teamName">Number of Rooms</label>
                          {/* <div class="validate text-danger">{dataError.teamName}</div> */}
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-floating">
                          <input
                            type="number"
                            class="form-control"
                            id="teamName"
                            placeholder="Adults"
                            name="adults"
                            value={adults}
                            onChange={val => {
                              setAdults(val?.target?.value);
                            }}
                          />
                          <label for="teamName">Adults</label>
                          {/* <div class="validate text-danger">{dataError.teamName}</div> */}
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-floating">
                          <input
                            type="number"
                            class="form-control"
                            id="teamName"
                            placeholder="Children"
                            name="Children"
                            value={children}
                            onChange={val => {
                              setChildren(val?.target?.value);
                            }}
                          />
                          <label for="teamName">Children</label>
                          {/* <div class="validate text-danger">{dataError.teamName}</div> */}
                        </div>
                      </div>

                      <div class="col-md-12">
                        <SelectableInput
                          title="Amenities "
                          subTitle="Enter one or more amenities"
                          value={RoomData?.amenities}
                          // value={serchTag}
                          // onChange={e => HandleChange(e)}
                          onChange={val => {
                            // val.preventDefault();
                            setRoomData({
                              ...RoomData,
                              amenities: val,
                            });
                          }}
                          // onChange={(val) => setSearchTag(val)}
                          className="form-group"
                          placeholder="Enter Amenitie(s) "
                        />
                        <span style={{ color: 'red' }}>Press enter after adding each Amenities.</span>
                      </div>

                      {/* <div class="col-md-4">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="team_short_code"
                                                    placeholder="Short Code"
                                                    name="team_short_code"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.team_short_code}
                                                />
                                                <label for="team_short_code">Short Code</label>
                                                <div class="validate text-danger">{dataError.team_short_code}</div>
                                            </div>
                                        </div> */}

                      <div class="text-center">
                        {!hide ? (
                          <>
                            <button
                              // type="submit"
                              class="btn btn-primary"
                              style={{
                                marginRight: '5px',
                              }}
                              onClick={UpdateRoom}
                            >
                              Update
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              // type="submit"
                              class="btn btn-primary"
                              style={{
                                marginRight: '5px',
                              }}
                              onClick={AddRoom}
                            >
                              Submit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-8">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">List of all Room</h5>
                    {loader ? <Loader /> : <DataTable columns={columns} data={filteredData} pagination />}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
}

export default ManageTeam
