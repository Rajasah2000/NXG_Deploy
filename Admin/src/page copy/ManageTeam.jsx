import React, { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import Sidebar from '../component/common/Sidebar'
import Footer from '../component/common/Footer'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { addNewTeam, addNewTeamLeauge, deleteTeam, deleteTeamLeauge, fetchAllCountry, fetchAllSession, fetchAllSports, fetchAllTeam, fetchAllTeamLeauge, updateTeam, updateTeamLeauge, uploadImageFile } from '../service/API'
import swal from 'sweetalert'
import Loader from '../component/common/Loader'
import Swal from 'sweetalert2'
import FileUploadingLoader from '../component/common/FileUploadingLoader'

const ManageTeam = () => {

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
        // {
        //     name: (
        //         <div>
        //             Country
        //         </div>
        //     ),
        //     selector: (row) => row.country,
        //     wrap: true,
        //     // center: true,
        //     // width: "125px",
        //     sortable: true
        // },
        // {
        //     name: (
        //         <div>
        //             Session
        //         </div>
        //     ),
        //     selector: (row) => row.session,
        //     wrap: true,
        //     // center: true,
        //     // width: "125px",
        //     sortable: true
        // },
        // {
        //     name: (
        //         <div>
        //             League
        //         </div>
        //     ),
        //     selector: (row) => row.league,
        //     wrap: true,
        //     // center: true,
        //     // width: "125px",
        //     sortable: true
        // },
        {
            name: (
                <div>
                    Sports Icon
                </div>
            ),
            selector: (row) => <img style={{ width: "100%", padding: "10px 0" }} src={row.sportsIcon} />,
            wrap: true,
            center: true,
            width: "125px"
        },

        {
            name: (
                <div>
                    Sports Name
                </div>
            ),
            selector: (row) => row.sports,
            wrap: true,
            center: true,
            // width: "125px",
            sortable: true
        },

        {
            name: (
                <div>
                    Short Code
                </div>
            ),
            selector: (row) => row.shortcode,
            wrap: true,
            center: true,
            width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Team Logo
                </div>
            ),
            selector: (row) => <img style={{ width: "100%", padding: "10px 0" }} src={row.logo} />,
            wrap: true,
            center: true,
            width: "125px"
        },
        {
            name: (
                <div>
                    Team name
                </div>
            ),
            selector: (row) => row.name,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        // {
        //     name: (
        //         <div>
        //             Team logo
        //         </div>
        //     ),
        //     selector: (row) => {
        //         return (
        //             <>
        //                 <div class="logo d-flex align-items-center">
        //                     <img src={row.logo} alt=""
        //                         style={{
        //                             maxHeight: "72px",
        //                             padding: "5px 0"
        //                         }} />
        //                 </div>
        //             </>
        //         )
        //     },
        //     wrap: true,
        //     // center: true,
        //     // width: "125px",
        //     sortable: true
        // },
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
        teamName: "",
        team_short_code: "",
        teamLogo: "",
        // teamLeagueID: "",
        // countryID: "",
        // sessionID:"",
        sportsID: "",
    }
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

    const submitData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        // console.log("L195", response);
        if (Object.keys(ErrorList).length === 0) {
            const response = await addNewTeam(inputData);
            console.log("L195", response);
            setInputData(initialValues)
            fetchAllData()
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
        }
    }

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

    const onEdit = (item) => {
        // console.log("L197",item);
        setInputData(
            {
                teamName: item?.teamName,
                team_short_code: item?.team_short_code,
                // teamLogo: "https://blr1.vultrobjects.com/crickpro/static/434731/team/XLuQgCDjCyLDbJ7E1VytfHq69TAXOH8iZDZShrdF.jpg",
                teamLogo: item?.teamLogo,
                // teamLeagueID: item?.taamLeaugeData._id,
                // countryID: item?.countryData._id,
                // sessionID: item?.sessionID,
                sportsID: item?.sportsID,
            }
        )
        setEditItemID(item._id)
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
        const response = await fetchAllTeam()
        if (response && Object.keys(response.data.data).length > 0) {
            setLoader(false)
            console.log("L223", response.data.data);
            let arr = response.data.data.sort().reverse().map((item, index) => {
                return {
                    sl: index + 1,
                    // country: item?.countryData?.name ? item?.countryData?.name : item?.countryData?.countryName,
                    // league: item?.taamLeaugeData?.leaugeName,
                    shortcode: item?.team_short_code,
                    name: item?.teamName,
                    logo: item?.teamLogo,
                    // session: item?.sessionName,
                    sports: item?.sportsName,
                    sportsIcon: item?.sportsIcon,
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
                    <h1>Team management</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li class="breadcrumb-item">Team</li>
                            <li class="breadcrumb-item active">Manage</li>
                        </ol>
                    </nav>
                </div>
                <section class="section">
                    <div class="row">
                        <div class="col-lg-4">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Team details</h5>


                                    <form method="post" class="row g-3">

                                        {
                                            uploadLoader && <FileUploadingLoader />
                                        }

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
                                        <div class="col-md-12">

                                            <div class="form-floating">
                                                <input
                                                    id="teamLogo"
                                                    name="teamLogo"
                                                    onChange={(e) => uploadHandler(e)}
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
                                                <select class="form-select"
                                                    id="sportsID"
                                                    aria-label="Floating label select example"
                                                    name="sportsID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        // e.target.value && fetchAllPlayerTags(e.target.value)
                                                        // e.target.value && fetchAllSportsWisePositions(e.target.value)
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
                                                <label for="teamLeagueID">Playing for Sports:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.sportsID}</div>
                                        </div>

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

                                        <div class="col-md-8">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="teamName"
                                                    placeholder="Team Name"
                                                    name="teamName"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.teamName}
                                                />
                                                <label for="teamName">Team Name</label>
                                                <div class="validate text-danger">{dataError.teamName}</div>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
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



                                            <button type="reset" class="btn btn-secondary">Reset</button>
                                        </div>
                                    </form>

                                </div>
                            </div>



                        </div>

                        <div class="col-lg-8">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">List of all Teams</h5>
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

export default ManageTeam
