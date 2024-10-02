import React, { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import Sidebar from '../component/common/Sidebar'
import Footer from '../component/common/Footer'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { addNewMatch, addNewPlayer, addNewTeam, addNewTeamLeauge, deletePlayer, deleteTeam, deleteTeamLeauge, fetchAllCountry, fetchAllMatch, fetchAllPlayer, fetchAllPlayerTag, fetchAllSession, fetchAllSports, fetchAllSportsWisePosition, fetchAllTeam, fetchAllTeamLeauge, fetchAllTimeZone, updatePlayer, updateTeam, updateTeamLeauge } from '../service/API'
import swal from 'sweetalert'
import Loader from '../component/common/Loader'
import Swal from 'sweetalert2'
import moment from 'moment'
import DateTimePicker from '../component/core/DateTimePicker'

const ManageMatch = () => {

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
                    League
                </div>
            ),
            selector: (row) => row.league,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Type
                </div>
            ),
            selector: (row) => {
                return row.sportID === "664f1a89607b2fbd0f4938c1" ? <>{row.matchType}<br />Overs:&nbsp;{row.inningsOvers}</> : <>{row.matchType}</>
            },
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Date
                </div>
            ),
            selector: (row) => {

                return moment(row.startDate).format("DD-MMM-YYYY hh:mm A")
            },
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },

        {
            name: (
                <div>
                    Adddress
                </div>
            ),
            selector: (row) => row.address,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Team One
                </div>
            ),
            // selector: (row) => row.team1,
            selector: (row) => {
                return <>
                    <div style={{
                        textAlign: "center"
                    }}>
                        <img style={{ width: "50%", padding: "10px 0" }} src={row.team1Logo} /><br />
                        {row.team1}
                    </div>
                </>
            },
            wrap: true,
            center: true,
            // width: "125px",
            // sortable: true
        },
        {
            name: (
                <div>
                    Team Two
                </div>
            ),
            // selector: (row) => row.team2,
            selector: (row) => {
                return <>
                    <div style={{
                        textAlign: "center"
                    }}>
                        <img style={{ width: "50%", padding: "10px 0" }} src={row.team2Logo} /><br />
                        {row.team2}</div>
                </>
            },
            wrap: true,
            center: true,
            // width: "125px",
            sortable: true
        },
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
        //             Action
        //         </div>
        //     ),
        //     selector: (row) => row.action,
        //     wrap: true,
        //     center: true,
        //     width: "125px",
        //     sortable: true
        // },

    ]
    const initialValues = {
        // sessionID: "",
        leaugeID: "",
        teamID_One: "",
        teamID_Two: "",
        address: "",
        startDate: "",
        timeZone: "",
        matchType: "",
        sportID: "",
        inningsOvers: ""
    }
    const [inputData, setInputData] = useState(initialValues);
    const [dataError, setDataError] = useState({});
    const [allData, setAllData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [editItemID, setEditItemID] = useState()

    const [allSports, setAllSports] = useState([])
    const [allTimeZone, setAllTimeZone] = useState([])
    const [allSessions, setAllSessions] = useState([])
    const [allLeagues, setAllLeagues] = useState([])
    const [allTeams, setAllTeams] = useState([])

    // const [selectedDate, setSelectedDate] = useState(moment());

    const handleDateChange = (date) => {

        const originalDate = moment(date)
        const formattedDate = originalDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');

        inputData.startDate = formattedDate
        //setSelectedDate(date);
        //console.log("DATE171",formattedDate);
    };

    const [loader, setLoader] = useState(false)
    let name, value

    useEffect(() => {
        fetchAllData()
        fetchAllSportsData()
        fetchAllTimeZones()
        fetchAllSessions()
        // fetchAllLeagues()
        // fetchAllTeams()
    }, [])

    const fetchAllSportsData = async () => {
        const response = await fetchAllSports()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrSports = response.data.data.sort().reverse();
            setAllSports(arrSports)
        }
    }

    const fetchAllTeamLeagueData = async (id) => {
        const response = await fetchAllTeamLeauge()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrLeagues = response.data.data
                .filter(item => item.sportID === id)
                .sort().reverse();
            setAllLeagues(arrLeagues)
        }
    }

    const getAllPlayingTeams = (league) => {

        const arrTeamViaLeague = allLeagues
            .filter(item => item._id === league)
        // .teamdta
        const team = arrTeamViaLeague[0]?.teamdta

        const arrTeam = team?.map(team => ({
            id: team?._id,
            teamName: team?.teamName
        }));
        setAllTeams(arrTeam)
        // console.log("JJD338", arrTeam, league);
    }


    const postData = (e) => {
        name = e.target.name;
        value = e.target.value;

        // if(name==="startDate"){
        //     const inputDateTime = moment(value)
        //     value = inputDateTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        // }

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
        if (inputData.sportID === "" || inputData.sportID === null || inputData.sportID === undefined) {
            error.sportID = "Please choose Sports";
        }
        if (inputData.matchType === "" || inputData.matchType === null || inputData.matchType === undefined) {
            error.matchType = "Please enter Match Type";
        }
        if (inputData.inningsOvers === "" || inputData.inningsOvers === null || inputData.inningsOvers === undefined) {
            error.matchType = "Please enter Match Innings Overs";
        }
        if (inputData.startDate === "" || inputData.startDate === null || inputData.startDate === undefined) {
            error.startDate = "Please choose Start Date & Time";
        }
        if (inputData.timeZone === "" || inputData.timeZone === null || inputData.timeZone === undefined) {
            error.timeZone = "Please choose Time Zone";
        }
        if (inputData.address === "" || inputData.address === null || inputData.address === undefined) {
            error.address = "Please enter address";
        }
        // if (inputData.sessionID === "" || inputData.sessionID === null || inputData.sessionID === undefined) {
        //     error.sessionID = "Please choose Session";
        // }
        if (inputData.leaugeID === "" || inputData.leaugeID === null || inputData.leaugeID === undefined) {
            error.leaugeID = "Please choose Leauge";
        }
        if (inputData.teamID_One === "" || inputData.teamID_One === null || inputData.teamID_One === undefined) {
            error.teamID_One = "Please choose First Team";
        }
        if (inputData.teamID_Two === "" || inputData.teamID_Two === null || inputData.teamID_Two === undefined) {
            error.teamID_Two = "Please choose Second Team";
        }
        return error;
    };

    const submitData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        if (Object.keys(ErrorList).length === 0) {
            console.log("L288", inputData)
            // return
            const response = await addNewMatch(inputData);
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
            const response = await updatePlayer(editItemID, inputData);

            setInputData(initialValues)
            fetchAllData()
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
        }
    }

    const onEdit = (item) => {
        // console.log("L219", moment(item?.startDate).format("DD-MM-YYYY"));
        item?.sportID && fetchAllTeamLeagueData(item?.sportID)
        item?.leaugeID && getAllPlayingTeams(item?.leaugeID)
        setInputData(
            {
                // sessionID: item?.sessionID,
                leaugeID: item?.leaugeID,
                teamID_One: item?.teamOneData?._id,
                teamID_Two: item?.teamOneData2?._id,
                address: item?.address,
                startDate: moment(item?.startDate).format("YYYY-MM-DD"),
                timeZone: item?.timeZone,
                matchType: item?.matchType,
                sportID: item?.sportID,
            }
        )

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
        const response = await fetchAllMatch()
        setLoader(false)
        if (response && Object.keys(response.data.data).length > 0) {

            // console.log("L254", response.data.data);
            let arr = response.data.data.sort().reverse().map((item, index) => {
                return {
                    sl: index + 1,
                    matchType: item?.matchType ? item?.matchType : "N/A",
                    startDate: item?.startDate ? item?.startDate : "N/A",
                    address: item?.address ? item?.address : "N/A",
                    team1: item?.teamOneData ? item?.teamOneData?.teamName : "N/A",
                    team2: item?.teamOneData2 ? item?.teamOneData2?.teamName : "N/A",

                    team1Logo: item?.teamOneData ? item?.teamOneData?.teamLogo : "N/A",
                    team2Logo: item?.teamOneData2 ? item?.teamOneData2?.teamLogo : "N/A",

                    session: item?.sessionID ? item?.sessionYear : "N/A",
                    league: item?.leaugeID ? item?.leaugeName : "N/A",
                    sportID: item?.sportID,
                    inningsOvers: item?.inningsOvers ? item?.inningsOvers : "N/A",
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
                            {/* <svg
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
                            </svg> */}
                        </div>
                    ),
                };
            });
            // console.log("L275", arr);
            setFilteredData(arr)
            setAllData(arr);
        }
    }

    const fetchAllTimeZones = async () => {
        const response = await fetchAllTimeZone()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrTimeZones = response.data.data;
            setAllTimeZone(arrTimeZones)
        }
    }

    const fetchAllSessions = async () => {
        const response = await fetchAllSession()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrSessions = response.data.data.sort().reverse();
            setAllSessions(arrSessions)
        }
    }

    const fetchAllLeagues = async () => {
        const response = await fetchAllTeamLeauge()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrLeagues = response.data.data.sort().reverse();
            setAllLeagues(arrLeagues)
        }
    }

    const fetchAllTeams = async () => {
        const response = await fetchAllTeam()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrTeams = response.data.data.sort().reverse();
            setAllTeams(arrTeams)
        }
    }









    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Match management</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li class="breadcrumb-item">Match</li>
                            <li class="breadcrumb-item active">Manage</li>
                        </ol>
                    </nav>
                </div>
                <section class="section">
                    <div class="row">
                        <div class="col-lg-4">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Match details</h5>


                                    <form method="post" class="row g-3">

                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="sportID"
                                                    aria-label="Floating label select example"
                                                    name="sportID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        e.target.value && fetchAllTeamLeagueData(e.target.value)
                                                    }}
                                                >
                                                    <option selected>Choose sports...</option>
                                                    {
                                                        allSports.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.sportID ? true : false}
                                                                    >{item.sportsName}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="sportID">Belongs to sports:</label>

                                            </div>
                                            <div class="validate text-danger text-sm">{dataError.sportID}</div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="leaugeID"
                                                    aria-label="Floating label select example"
                                                    name="leaugeID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        e.target.value && getAllPlayingTeams(e.target.value)
                                                    }}
                                                >
                                                    <option selected>Choose...</option>
                                                    {
                                                        allLeagues.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.leaugeID ? true : false}
                                                                    >{item.leaugeName}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="leaugeID">Leauge:</label>

                                            </div>
                                            <div class="validate text-danger">{dataError.leaugeID}</div>
                                        </div>

                                        <div class="col-md-8">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="matchType"
                                                    placeholder="Match Type"
                                                    name="matchType"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.matchType}
                                                />
                                                <label for="matchType">Match Type</label>
                                                <div class="validate text-danger">{dataError.matchType}</div>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="inningsOvers"
                                                    placeholder="Match Type"
                                                    name="inningsOvers"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.inningsOvers}
                                                />
                                                <label for="inningsOvers">Innings Overs</label>
                                                <div class="validate text-danger">{dataError.inningsOvers}</div>
                                            </div>
                                        </div>


                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                {/* <input
                                                    type="date"
                                                    class="form-control"
                                                    min={moment().format("YYYY-MM-DD")}
                                                    id="startDate"
                                                    placeholder="Start Date"
                                                    name="startDate"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.startDate}
                                                /> */}
                                                <DateTimePicker
                                                    // selectedDate={selectedDate}
                                                    // handleDateChange={handleDateChange}
                                                    // selectedDate={inputData.startDate}
                                                    handleDateChange={handleDateChange}

                                                />
                                                <label for="startDate">Start Date</label>

                                            </div>
                                            <div class="validate text-danger">{dataError.startDate}</div>
                                        </div>


                                        <div class="col-md-6">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="timeZone"
                                                    aria-label="Floating label select example"
                                                    name="timeZone"
                                                    onChange={(e) => postData(e)}
                                                >
                                                    <option selected>Choose timezone...</option>
                                                    {
                                                        allTimeZone.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.timeZone ? true : false}
                                                                    >{item.zoneName}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="timeZone">Belongs to TimeZone:</label>

                                            </div>
                                            <div class="validate text-danger">{dataError.timeZone}</div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="address"
                                                    placeholder="Address"
                                                    name="address"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.address}
                                                />
                                                <label for="address">Address</label>
                                                <div class="validate text-danger">{dataError.address}</div>
                                            </div>
                                        </div>

                                        {/* <div class="col-md-12">
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



                                        <div class="col-md-6">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="teamID_One"
                                                    aria-label="Floating label select example"
                                                    name="teamID_One"
                                                    onChange={(e) => postData(e)}
                                                >
                                                    <option selected>Choose...</option>
                                                    {
                                                        allTeams
                                                            .filter(item => item.id !== inputData.teamID_Two)
                                                            .map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={item.id} key={index}
                                                                            selected={item.id == inputData.teamID_One ? true : false}
                                                                        >{item.teamName}</option>
                                                                    </>
                                                                )
                                                            })
                                                    }
                                                </select>
                                                <label for="teamID_One">Team One:</label>

                                            </div>
                                            <div class="validate text-danger">{dataError.teamID_One}</div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="teamID_Two"
                                                    aria-label="Floating label select example"
                                                    name="teamID_Two"
                                                    onChange={(e) => postData(e)}
                                                >
                                                    <option selected>Choose...</option>
                                                    {
                                                        allTeams
                                                            .filter(item => item.id !== inputData.teamID_One)
                                                            .map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={item.id} key={index}
                                                                            selected={item.id == inputData.teamID_Two ? true : false}
                                                                        >{item.teamName}</option>
                                                                    </>
                                                                )
                                                            })
                                                    }
                                                </select>
                                                <label for="teamID_Two">Team Two:</label>

                                            </div>
                                            <div class="validate text-danger">{dataError.teamID_Two}</div>
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
                                                        // onClick={updateData}
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
                                    <h5 class="card-title">List of all Matches</h5>
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

export default ManageMatch
