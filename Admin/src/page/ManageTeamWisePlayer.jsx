import React, { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import Sidebar from '../component/common/Sidebar'
import Footer from '../component/common/Footer'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { addNewMatch, addNewPlayer, addNewTeam, addNewTeamLeauge, addNewTeamWisePlayer, deletePlayer, deleteTeam, deleteTeamLeauge, fetchAllCountry, fetchAllMatch, fetchAllNonPLayingPLayers, fetchAllPlayer, fetchAllPlayerTag, fetchAllSession, fetchAllSports, fetchAllSportsWisePosition, fetchAllTeam, fetchAllTeamLeauge, fetchAllTeamWisePlayer, fetchAllTimeZone, fetchAllUnselectedPLayers, updateNewTeamWisePlayer, updatePlayer, updateTeam, updateTeamLeauge } from '../service/API'
import swal from 'sweetalert'
import Loader from '../component/common/Loader'
import Swal from 'sweetalert2'
import moment from 'moment'
import Dropdown from '../component/core/Dropdown'

const ManageTeamWisePlayer = () => {

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
                    Player Name
                </div>
            ),
            selector: (row) => row.playerName,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Player Nationality
                </div>
            ),
            selector: (row) => row.playerNationality,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Player Date Of Birth
                </div>
            ),
            selector: (row) => row.playerDOB,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },

        // {
        //     name: (
        //         <div>
        //             Action
        //         </div>
        //     ),
        //     selector: (row) => row.action,
        //     wrap: true,
        //     width: "125px",
        //     sortable: true
        // },

    ]
    const initialValues = {
        teamID: "",
        playerID: [],
        // creditPoint: 1,
        sportsID: "",
        teamLeagueID: "",
    }
    const [inputData, setInputData] = useState(initialValues);
    const [dataError, setDataError] = useState({});
    const [allData, setAllData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [editItemID, setEditItemID] = useState()

    const [allSports, setAllSports] = useState([])
    const [allTeams, setAllTeams] = useState([])
    const [allTeamLeagues, setAllTeamLeagues] = useState([])
    const [selectedPlayers, setSelectedPlayers] = useState([])

    const [loader, setLoader] = useState(false)
    let name, value

    useEffect(() => {
        // fetchAllData()
        // fetchAllTeams()
        fetchAllSportsData()
        // fetchAllLeagueData()
        // fetchAllPlayersData()
    }, [])

    useEffect(() => {
        const selectedPlayer = selectedPlayers.map(item => item._id || item.id)
        setInputData({ ...inputData, playerID: selectedPlayer })
    }, [selectedPlayers])

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
            setAllTeamLeagues(arrLeagues)
        }
    }


    const handleSelectOption = (option) => {
        setSelectedPlayers([...selectedPlayers, option])

        let index = allPlayers.findIndex(item => item.id === option.id);
        const newItems = [...allPlayers]
        newItems.splice(index, 1)
        setAllPlayers(newItems)

    }



    const postData = (e) => {
        name = e.target.name;
        value = e.target.value;

        // if (name === "creditPoint") {
        //     value = value ? parseInt(value) : 0
        // }

        setInputData({ ...inputData, [name]: value });

        let errorMsg = "";
        switch (name) {
            case "sportsID":
                errorMsg = "Choose a Sports";
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
        if (inputData.sportsID === "" || inputData.sportsID === null || inputData.sportsID === undefined) {
            error.sportsID = "Please choose Spotrs Name";
        }
        if (inputData.teamLeagueID === "" || inputData.teamLeagueID === null || inputData.teamLeagueID === undefined) {
            error.sportsID = "Please choose League Name";
        }

        if (inputData.teamID === "" || inputData.teamID === null || inputData.teamID === undefined) {
            error.teamID = "Please choose Team Name";
        }
        // if (inputData.playerID === "" || inputData.playerID === null || inputData.playerID === undefined) {
        //     error.playerID = "Please choose Player Name";
        // }
        return error;
    };

    const submitData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        if (Object.keys(ErrorList).length === 0) {
            console.log("L199", inputData)
            // return
            const response = await addNewTeamWisePlayer(inputData);
            setInputData({ ...inputData, playerID: "" })
            fetchAllData(inputData.teamID)
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
        }
    }

    const updateData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        if (Object.keys(ErrorList).length === 0) {
            console.log("L219", inputData, selectedPlayers)



            // return
            const response = await updateNewTeamWisePlayer(inputData);
            setInputData({ ...inputData, playerID: "" })
            fetchAllData(inputData.teamID)
            setEditItemID("")
            setSelectedPlayers([])
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
        }
    }

    const onEdit = (item) => {
        // console.log("L219", moment(item?.startDate).format("DD-MM-YYYY"));
        setInputData(
            {
                sessionID: item?.sessionID,
                leaugeID: item?.leaugeID,
                teamID_One: item?.teamOneData?._id,
                teamID_Two: item?.teamOneData2?._id,
                address: item?.address,
                startDate: moment(item?.startDate).format("YYYY-MM-DD"),
                timeZone: item?.timeZone,
                matchType: item?.matchType,

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

    // console.log("L281",inputData);

    const fetchAllData = async (team) => {
        setLoader(true)
        const data = {
            "teamID": team,
            "teamLeagueID": inputData.teamLeagueID,
            "sportsID": inputData.sportsID
        }
        const response = await fetchAllTeamWisePlayer(data)

        // const response = await fetchAllTeamWisePlayer(team)
        setLoader(false)
        // if (response && Object.keys(response.data.data).length > 0) {
        if (response && response.data.data.length > 0) {
            
            const playerListIndex=response.data.data.length-1

            if (response.data.data[playerListIndex].playerdata) {
                const arrPlayers = response.data.data[playerListIndex].playerdata.map(player => ({
                    _id: player._id,
                    name: player.playerName
                }))
                setSelectedPlayers(arrPlayers)
                
                // const players = response.data.data[0].playerdata.map(item => item._id)
                // console.log("L303",players);
                // setInputData({ ...inputData, teamID:response.data.data[0].teamdata._id, playerID: players })
                
            }
            // let arr = response.data.data.sort().reverse().map((item, index) => {
            let arr = response?.data?.data[playerListIndex]?.playerdata
                .map((item, index) => {
                    return {
                        sl: index + 1,
                        playerName: item?.playerName ? item?.playerName : "N/A",
                        playerNationality: item?.nationality ? item?.nationality : "N/A",
                        playerDOB: item?.dateoFbirth ? item?.dateoFbirth : "N/A",
                        photo: item?.image,
                        // creditPoint: item?.creditPoint ? item?.creditPoint : 0,

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
            // console.log("L275", arr);
            setFilteredData(arr)
            setAllData(arr);
        } else {
            setFilteredData([])
            setAllData([])
            setSelectedPlayers([])
        }
    }

    const getAllPlayingTeams = (league) => {

        const arrTeamViaLeague = allTeamLeagues
            .filter(item => item._id === league)
        // .teamdta
        const team = arrTeamViaLeague[0].teamdta

        const arrTeam = team.map(team => ({
            id: team._id,
            teamName: team.teamName
        }));
        setAllTeams(arrTeam)
        // console.log("JJD338", arrTeam, league);
    }

    const fetchAllTeams = async () => {
        const response = await fetchAllTeam()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrTeams = response.data.data.sort().reverse();
            setAllTeams(arrTeams)
        }
    }

    const [allPlayers, setAllPlayers] = useState([])

    const fetchAllPlayersData = async (sports) => {
        const response = await fetchAllPlayer()
        if (response && Object.keys(response.data.data).length > 0) {
            console.log("L533", response.data.data, sports);
            let arrPlayers = response.data.data
                .filter(item => item.sportsID === sports)
                .map((item, index) => {
                    return {
                        id: item?._id,
                        name: item?.playerName,
                    };
                })
            // console.log("L464", arrPlayers);
            setAllPlayers(arrPlayers)
        }
    }

    const fetchAllUnselectedPlayersData = async (sports, league) => {
        const data = {
            "teamLeagueID": league,
            "sportsID": sports
        }
        const response = await fetchAllUnselectedPLayers(data)
        // console.log("Data390", response.data.data, sports);
        if (response && Object.keys(response.data.data).length > 0) {

            let arrPlayers = response.data.data
                //.filter(item => item.sportsID === sports)
                .map((item, index) => {
                    return {
                        id: item?._id,
                        name: item?.playerName,
                    };
                })
            // console.log("L464", arrPlayers);
            setAllPlayers(arrPlayers)
            setEditItemID(1)
        }
    }

    const handleRemoveFromDropdown = (e, index, id, name) => {
        e.preventDefault()
        const newItems = [...selectedPlayers]
        // console.log("dd646",index);
        newItems.splice(index, 1)
        setSelectedPlayers(newItems)

        const option = {
            id: id,
            name: name
        }
        console.log("option612", option);
        setAllPlayers([...allPlayers, option])
    }








    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Team wise Player</h1>
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
                                    <h5 class="card-title">Player details</h5>


                                    <form method="post" class="row g-3">

                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="sportsID"
                                                    aria-label="Floating label select example"
                                                    name="sportsID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        e.target.value && fetchAllTeamLeagueData(e.target.value)
                                                        // e.target.value && getAllPlayingTeams("")
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
                                                <label for="sportsID">Belongs to sports:</label>

                                            </div>
                                            <div class="validate text-danger text-sm">{dataError.sportsID}</div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="teamLeagueID"
                                                    aria-label="Floating label select example"
                                                    name="teamLeagueID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        // e.target.value && fetchAllData(e.target.value)
                                                        e.target.value && getAllPlayingTeams(e.target.value)
                                                        e.target.value && setSelectedPlayers([])
                                                    }}
                                                >
                                                    <option selected>Choose...</option>
                                                    {
                                                        allTeamLeagues
                                                            .map((item, index) => {
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
                                                <label class="text-sm" for="teamLeagueID">Playing for the Team League:</label>

                                            </div>
                                            <div class="validate text-danger ">{dataError.teamLeagueID}</div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="teamID"
                                                    aria-label="Floating label select example"
                                                    name="teamID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        e.target.value && fetchAllData(e.target.value)
                                                        //e.target.value && fetchAllPlayersData(inputData.sportsID)
                                                        e.target.value && fetchAllUnselectedPlayersData(inputData.sportsID, inputData.teamLeagueID)
                                                    }}
                                                >
                                                    <option selected>Choose...</option>
                                                    {
                                                        allTeams
                                                            .map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={item.id} key={index}
                                                                            selected={item.id == inputData.teamID ? true : false}
                                                                        >{item.teamName}</option>
                                                                    </>
                                                                )
                                                            })
                                                    }
                                                </select>
                                                <label class="text-sm" for="teamID">Playing for the Team:</label>

                                            </div>
                                            <div class="validate text-danger ">{dataError.teamID}</div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating mb-3">
                                                {
                                                    selectedPlayers?.length > 0 && (
                                                        <>
                                                            <ul class="list-group">
                                                                {
                                                                    selectedPlayers.map((item, index) => {
                                                                        return (
                                                                            <>
                                                                                <li key={index} class="list-group-item d-flex justify-content-between align-items-center" draggable>
                                                                                    <div>
                                                                                        <span class="badge bg-primary rounded-pill"
                                                                                            style={{
                                                                                                marginRight: "5px"
                                                                                            }}
                                                                                        >{index + 1}</span>{item.name}
                                                                                    </div>

                                                                                    {/* <span class="badge bg-primary rounded-pill">{index + 1}</span> */}
                                                                                    <button class="btn btn-outline-danger btn-sm"
                                                                                        name={index}
                                                                                        onClick={(e) => handleRemoveFromDropdown(e, index, item.id, item.name)}
                                                                                    ><i class="bi bi-file-excel"></i></button>
                                                                                </li>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </>
                                                    )
                                                }
                                                {
                                                    selectedPlayers?.length < 15 && (
                                                        <>
                                                            <Dropdown label="Type and choose player..." options={allPlayers} onSelect={handleSelectOption} />
                                                        </>
                                                    )
                                                }




                                                {/* <label for="play_by">Decision:</label> */}
                                            </div>
                                        </div>

                                        {/* <div class="col-md-12">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="creditPoint"
                                                    placeholder="Credit Point"
                                                    name="creditPoint"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.creditPoint}
                                                />
                                                <label for="position">Credit Point</label>
                                                <div class="validate text-danger">{dataError.creditPoint}</div>
                                            </div>
                                        </div> */}







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
                                    <h5 class="card-title">List of all Team Players</h5>
                                    {
                                        inputData.teamID ? (
                                            <>
                                                {
                                                    loader ? (<Loader />) : (<DataTable paginationPerPage="10" paginationRowsPerPageOptions={[10, 20, 50]} columns={columns} data={filteredData} pagination />)
                                                }
                                            </>
                                        ) : (
                                            <>
                                                {/* <div class="row g-3">
                                                    <div class="col-md-4">
                                                        <div class="form-floating -mb-3">
                                                            <select class="form-select"
                                                                id="sportsID"
                                                                aria-label="Floating label select example"
                                                                name="sportsID"
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
                                                                                    selected={item._id == inputData.sportsID ? true : false}
                                                                                >{item.sportsName}</option>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            <label for="sportsID">Belongs to sports:</label>

                                                        </div>
                                                        <div class="validate text-danger text-sm">{dataError.sportsID}</div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-floating -mb-3">
                                                            <select class="form-select"
                                                                id="teamLeagueID"
                                                                aria-label="Floating label select example"
                                                                name="teamLeagueID"
                                                                onChange={(e) => {
                                                                    postData(e)
                                                                    // e.target.value && fetchAllData(e.target.value)
                                                                    e.target.value && getAllPlayingTeams(e.target.value)
                                                                }}
                                                            >
                                                                <option selected>Choose...</option>
                                                                {
                                                                    allTeamLeagues
                                                                        .map((item, index) => {
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
                                                            <label class="text-sm" for="teamLeagueID">Playing for the Team League:</label>

                                                        </div>
                                                        <div class="validate text-danger ">{dataError.teamLeagueID}</div>
                                                    </div>



                                                    <div class="col-md-4">
                                                        <div class="form-floating mb-3">
                                                            <select class="form-select"
                                                                id="teamID"
                                                                aria-label="Floating label select example"
                                                                name="teamID"
                                                                onChange={(e) => {
                                                                    postData(e)
                                                                    e.target.value && fetchAllData(e.target.value)
                                                                    e.target.value && fetchAllPlayersData(inputData.sportsID)
                                                                }}
                                                            >
                                                                <option selected>Choose...</option>
                                                                {
                                                                    allTeams
                                                                        .map((item, index) => {
                                                                            return (
                                                                                <>
                                                                                    <option value={item._id} key={index}
                                                                                        selected={item._id == inputData.teamID ? true : false}
                                                                                    >{item.teamName}</option>
                                                                                </>
                                                                            )
                                                                        })
                                                                }
                                                            </select>
                                                            <label class="text-sm" for="teamID">Playing for the Team:</label>

                                                        </div>
                                                    </div>
                                                </div> */}
                                                <p>Choose Sports, League and Team</p>

                                            </>
                                        )
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

export default ManageTeamWisePlayer
