import React, { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import Sidebar from '../component/common/Sidebar'
import Footer from '../component/common/Footer'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { addNewPlayer, addNewTeam, addNewTeamLeauge, deletePlayer, deleteTeam, deleteTeamLeauge, fetchAllCountry, fetchAllPlayer, fetchAllPlayerTag, fetchAllSession, fetchAllSports, fetchAllSportsWisePosition, fetchAllTeam, fetchAllTeamLeauge, updatePlayer, updateTeam, updateTeamLeauge, uploadImageFile } from '../service/API'
import swal from 'sweetalert'
import Loader from '../component/common/Loader'
import Swal from 'sweetalert2'
import moment from 'moment'
import FileUploadingLoader from '../component/common/FileUploadingLoader'

const ManagePlayer = () => {

    const columns = [
        {
            name: (
                <div>
                    Sl.
                </div>
            ),
            selector: (row) => row.sl,
            wrap: true,
            // center: true,
            width: "75px",
            sortable: true
        },
        {
            name: (
                <div>
                    Credit
                </div>
            ),
            selector: (row) => row.playerCredit,
            wrap: true,
            center: true,
            sortable: true
            // width: "125px"
        },
        {
            name: (
                <div>
                    Photo
                </div>
            ),
            selector: (row) => <img style={{ width: "100%", padding: "10px 0" }} src={row.photo} />,
            wrap: true,
            center: true,
            width: "125px"
        },
        {
            name: (
                <div>
                    Name
                </div>
            ),
            selector: (row) => row.name,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Date Of Birth
                </div>
            ),
            selector: (row) => row.dob,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },

        {
            name: (
                <div>
                    Nationality
                </div>
            ),
            selector: (row) => row.nationality,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        // {
        //     name: (
        //         <div>
        //             Session
        //         </div>
        //     ),
        //     selector: (row) => row.sessionName,
        //     wrap: true,
        //     // center: true,
        //     // width: "125px",
        //     sortable: true
        // },
        {
            name: (
                <div>
                    Sports
                </div>
            ),
            selector: (row) => row.sportsName,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Position
                </div>
            ),
            selector: (row) => row.playerPosition,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Player Skill
                </div>
            ),
            selector: (row) => row.playerTag,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Action
                </div>
            ),
            selector: (row) => row.action,
            wrap: true,
            // center: true,
            width: "125px",
            sortable: true
        },

    ]
    const initialValues = {
        playerName: "",
        sportsID: "",
        playerTagID: "",
        nationality: "",
        // countryID: "",
        dateoFbirth: "",
        sportsWisePositionID: "",
        // sessionID: "",
        image: "",
        playerCredit:0,
    }
    const [inputData, setInputData] = useState(initialValues);
    const [dataError, setDataError] = useState({});
    const [allData, setAllData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [editItemID, setEditItemID] = useState()
    const [allCountries, setAllCountries] = useState([])
    const [allSports, setAllSports] = useState([])
    const [allPlayerTag, setAllPlayerTag] = useState([])
    const [allSportsWisePositions, setAllSportsWisePositions] = useState([])
    const [allSessions, setAllSessions] = useState([])
    const [loader, setLoader] = useState(false)
    const [uploadLoader, setUploadLoader] = useState(false)
    let name, value

    useEffect(() => {
        fetchAllData()
        fetchAllCountries()
        fetchAllSportsData()
        fetchAllSessions()
    }, [])


    const getPlayersBySports=(sport)=>{
        let searchData = allData;
        // console.log("allData",allData);
        if (true) {
            // alert(value)
            searchData = searchData?.filter((item) => {
                if (item?.sportsID === sport) {
                    return item;
                }
            });
        }
        setFilteredData(searchData);
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
        if (inputData.playerName === "" || inputData.playerName === null || inputData.playerName === undefined) {
            error.playerName = "Please enter Player Name";
        }
        if (inputData.dateoFbirth === "" || inputData.dateoFbirth === null || inputData.dateoFbirth === undefined) {
            error.dateoFbirth = "Please enter Date of Birth";
        }
        // if (inputData.countryID === "" || inputData.countryID === null ||inputData.countryID === undefined) {
        //     error.countryID = "Please choose Country Name";
        // }
        if (inputData.nationality === "" || inputData.nationality === null || inputData.nationality === undefined) {
            error.nationality = "Please enter Nationality";
        }
        // if (inputData.sessionID === "" || inputData.sessionID === null || inputData.sessionID === undefined) {
        //     error.sessionID = "Please choose Session";
        // }
        if (inputData.sportsID === "" || inputData.sportsID === null || inputData.sportsID === undefined) {
            error.sportsID = "Please choose Sports Name";
        }
        if (inputData.playerTagID === "" || inputData.playerTagID === null || inputData.playerTagID === undefined) {
            error.playerTagID = "Please choose Player Skill";
        }
        if (inputData.sportsWisePositionID === "" || inputData.sportsWisePositionID === null || inputData.sportsWisePositionID === undefined) {
            error.sportsWisePositionID = "Please choose Playing Position";
        }
        if (inputData.playerCredit === "" || inputData.playerCredit === null || inputData.playerCredit === undefined) {
            error.playerCredit = "Please provide Credit value";
        }

        // console.log("ER213", inputData);
        return error;
    };

    const submitData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        if (Object.keys(ErrorList).length === 0) {
            const response = await addNewPlayer(inputData);
            // console.log("L92", response);
            setInputData(initialValues)
            fetchAllData()
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
            let file = document.querySelector("#image");
            file.value = "";
        }
    }

    const updateData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        console.log("inputData237", inputData)
        // return
        if (Object.keys(ErrorList).length === 0) {
            const response = await updatePlayer(editItemID, inputData);

            setInputData(initialValues)
            fetchAllData()
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
            let file = document.querySelector("#image");
            file.value = "";
            setEditItemID("")
        }
    }

    const onEdit = (item) => {
        // console.log("L199", item);
        setInputData(
            {
                playerName: item?.playerName,
                sportsID: item?.sportsID,
                playerTagID: item?.playerTagID,
                nationality: item?.nationality,
                countryID: item?.countryID,
                dateoFbirth: moment(item?.dateoFbirth).format("YYYY-MM-DD"),
                sportsWisePositionID: item?.sportsWisePositionID,
                sessionID: item?.sessionID,
                image: item?.image,
                playerCredit: item?.playerCredit ? item?.playerCredit:0,
            }
        )
        fetchAllPlayerTags(item?.sportsID)
        fetchAllSportsWisePositions(item?.sportsID)
        let playerDOB = item?.dateoFbirth
        setEditItemID(item._id)
    }

    const deleteData = async (id) => {
        const response = await deletePlayer(id)
        // console.log("L212", response)
        if (response.data.status) {
            swal("Good job!", response.data?.message, "success")
            setInputData(initialValues)
            fetchAllData()
        } else {
            swal("Error", response.data?.message, "error")
        }

    }

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
                deleteData(id)
            }
        });
    };

    const fetchAllData = async () => {
        setLoader(true)
        const response = await fetchAllPlayer()
        if (response && Object.keys(response.data.data).length > 0) {
            setLoader(false)
            console.log("L248", response.data.data);
            let arr = response.data.data.sort().reverse().map((item, index) => {
                return {
                    sl: index + 1,
                    name: item?.playerName ? item?.playerName : "N/A",
                    dob: item?.dateoFbirth ? moment(item?.dateoFbirth).format("MMM, DD YYYY") : "N/A",
                    nationality: item?.nationality ? item?.nationality : "N/A",
                    sportsName: item?.sportsName ? item?.sportsName : "N/A",
                    sportsID: item?.sportsID ? item?.sportsID : "",
                    // sessionName: item?.sessionName ? item?.sessionName : "N/A",
                    playerPosition: item?.playerPosition ? item?.playerPosition : "N/A",
                    playerTag: item?.playerTagName ? item?.playerTagName : "N/A",
                    photo: item?.image,
                    playerCredit: item?.playerCredit ? item?.playerCredit:0,
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
            setFilteredData(arr)
            setAllData(arr);
        }
    }

    const fetchAllCountries = async () => {
        const response = await fetchAllCountry()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrCountries = response.data.data.sort().reverse();
            console.log("COU362", arrCountries);
            setAllCountries(arrCountries)
        }
    }

    const fetchAllSportsData = async () => {
        const response = await fetchAllSports()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrSports = response.data.data.sort().reverse();
            setAllSports(arrSports)
        }
    }

    const fetchAllPlayerTags = async (sports) => {
        const response = await fetchAllPlayerTag()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrPlayerTags = response.data.data
                .filter(item => item.sportsID === sports)
                .sort().reverse();
            setAllPlayerTag(arrPlayerTags)
        }
    }

    const fetchAllSportsWisePositions = async (sports) => {
        const data = {
            sportsID: sports
        }
        const response = await fetchAllSportsWisePosition(data)
        if (response && Object.keys(response.data.data).length > 0) {
            let arrSportsWisePositions = response.data.data.sort().reverse();
            setAllSportsWisePositions(arrSportsWisePositions)
        } else {
            setAllSportsWisePositions([])
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
            setInputData({ ...inputData, image: res.data.data })
            setUploadLoader(false);
        } else {
            setInputData({ ...inputData, image: "" })
            setUploadLoader(false);
        }
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Player management</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li class="breadcrumb-item">Player</li>
                            <li class="breadcrumb-item active">Manage</li>
                        </ol>
                    </nav>
                </div>
                <section class="section">
                    <div class="row">
                        <div class="col-lg-4">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Player details</h5>


                                    <form method="post" class="row g-3">

                                        {
                                            uploadLoader && <FileUploadingLoader />
                                        }

                                        {inputData.image && !uploadLoader && (
                                            <>
                                                <div class="col-md-12 text-center">
                                                    <img
                                                        style={{
                                                            // height: "10%",
                                                            maxWidth: "100%",
                                                            marginTop: "12px",
                                                            borderRadius: "9px",
                                                        }}
                                                        src={inputData.image}
                                                    />
                                                </div>
                                            </>
                                        )}
                                        <div class="col-md-12">

                                            <div class="form-floating">
                                                <input
                                                    id="image"
                                                    name="image"
                                                    onChange={(e) => uploadHandler(e)}
                                                    class="form-control"
                                                    type="file"
                                                    accept="image/*"
                                                />
                                                <label for="sportsName">Player Photo</label>
                                                <div class="validate text-danger">{dataError.image}</div>
                                            </div>
                                        </div>

                                        <div class="col-md-7">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="playerName"
                                                    placeholder="Player Name"
                                                    name="playerName"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.playerName}
                                                />
                                                <label for="playerName">Player Name</label>
                                                <div class="validate text-danger">{dataError.playerName}</div>
                                            </div>
                                        </div>


                                        <div class="col-md-5">
                                            <div class="form-floating">
                                                <input
                                                    type="date"
                                                    class="form-control"
                                                    id="dateoFbirth"
                                                    placeholder="Date of birth"
                                                    name="dateoFbirth"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.dateoFbirth}
                                                />
                                                <label for="dateoFbirth">Date of birth</label>
                                                <div class="validate text-danger">{dataError.dateoFbirth}</div>
                                            </div>
                                        </div>


                                        {/* <div class="col-md-7">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="countryID"
                                                    aria-label="Floating label select example"
                                                    name="countryID"
                                                // onChange={(e) => postData(e)}
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
                                        <div class="col-md-7">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="sportsID"
                                                    aria-label="Floating label select example"
                                                    name="sportsID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        e.target.value && getPlayersBySports(e.target.value)
                                                        e.target.value && fetchAllPlayerTags(e.target.value)
                                                        e.target.value && fetchAllSportsWisePositions(e.target.value)
                                                    }}
                                                >
                                                    <option selected>Choose sports...</option>
                                                    {
                                                        allSports.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.sportsID ? true : false}
                                                                    >{item.sportsName}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="sportsID">Playing for Sports:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.sportsID}</div>
                                        </div>

                                        <div class="col-md-5">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="nationality"
                                                    placeholder="Nationality"
                                                    name="nationality"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.nationality}
                                                />
                                                <label for="nationality">Nationality</label>
                                                <div class="validate text-danger">{dataError.nationality}</div>
                                            </div>
                                        </div>

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





                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="sportsWisePositionID"
                                                    aria-label="Floating label select example"
                                                    name="sportsWisePositionID"
                                                    onChange={(e) => postData(e)}
                                                >
                                                    <option selected>Choose position...</option>
                                                    {
                                                        allSportsWisePositions.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.sportsWisePositionID ? true : false}
                                                                    >{item.position}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="sportsWisePositionID">Playing position:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.sportsWisePositionID}</div>
                                        </div>

                                        <div class="col-md-7">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="playerTagID"
                                                    aria-label="Floating label select example"
                                                    name="playerTagID"
                                                    onChange={(e) => postData(e)}
                                                >
                                                    <option selected>Choose skill...</option>
                                                    {
                                                        allPlayerTag.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.playerTagID ? true : false}
                                                                    >{item.playerTag}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="playerTagID">Player Skill:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.playerTagID}</div>
                                        </div>

                                        <div class="col-md-5">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="playerCredit"
                                                    placeholder="Nationality"
                                                    name="playerCredit"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.playerCredit}
                                                />
                                                <label for="playerCredit">Credit</label>
                                                <div class="validate text-danger">{dataError.playerCredit}</div>
                                            </div>
                                        </div>





                                        <div class="text-center">
                                            {
                                                editItemID ? (
                                                    <>
                                                        <button
                                                            type="submit"
                                                            class="btn btn-primary"
                                                            style={{
                                                                marginRight: "5px"
                                                            }}
                                                            onClick={updateData}
                                                        >Update</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            type="submit"
                                                            class="btn btn-primary"
                                                            style={{
                                                                marginRight: "5px"
                                                            }}
                                                            onClick={submitData}
                                                        >Submit</button>
                                                    </>
                                                )
                                            }



                                        </div>
                                    </form>

                                </div>
                            </div>



                        </div>

                        <div class="col-lg-8">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">List of all Player(s)</h5>
                                    {
                                        loader ? (<Loader />) : (<DataTable columns={columns} data={filteredData} pagination />)
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}

export default ManagePlayer
