import React, { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import Sidebar from '../component/common/Sidebar'
import Footer from '../component/common/Footer'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { addNewMatch, addNewPlayer, addNewPlayingEleven, addNewTeam, addNewTeamLeauge, addNewToss, deletePlayer, deleteTeam, deleteTeamLeauge, endMatchPlay, fetchAllCountry, fetchAllMatch, fetchAllPlayer, fetchAllPlayerTag, fetchAllPlayersBySessionAndTeam, fetchAllPlayersForPlaying11, fetchAllPlayingEleven, fetchAllSession, fetchAllSports, fetchAllSportsWisePosition, fetchAllTeam, fetchAllTeamLeauge, fetchAllTimeZone, updateMatchPlay, updatePlayer, updateTeam, updateTeamLeauge } from '../service/API'
import swal from 'sweetalert'
import Loader from '../component/common/Loader'
import Swal from 'sweetalert2'
import moment from 'moment'
import Dropdown from '../component/core/Dropdown'

const MatchList = () => {

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
            width: "50px",
            sortable: true
        },
        {
            name: (
                <div>
                    Date
                </div>
            ),
            selector: (row) => {

                return moment(row.startDate).format("DD-MMM-YYYY")
            },
            wrap: true,
            // center: true,
            width: "125px",
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
            width: "125px",
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
            width: "100px",
            sortable: true
        },


        // {
        //     name: (
        //         <div>
        //             Adddress
        //         </div>
        //     ),
        //     selector: (row) => row.address,
        //     wrap: true,
        //     // center: true,
        //     // width: "125px",
        //     sortable: true
        // },
        {
            name: (
                <div>
                    Team One
                </div>
            ),
            selector: (row) => {
                return (
                    <>
                        <img style={{ width: "100%", padding: "20px" }} src={row.team1Logo} /><br />
                        <button
                            // className="btn btn-sm btn-outline-info"
                            className={row.playing11[0]?.teamID === row.team1Id || row.playing11[1]?.teamID === row.team1Id ? "btn btn-sm btn-outline-success" : "btn btn-sm btn-outline-danger"}
                            name={row.team1}
                            id={row.team1Id}
                            style={{
                                margin: "5px 0",
                                width: "140px"
                            }}
                            onClick={e => handleTeamPlayers(e, row?.sportID, row?.leaugeID, row?.matchID)}
                        >{row?.team1}
                            {
                                row.playing11[0]?.teamID === row.team1Id || row.playing11[1]?.teamID === row.team1Id ? <></> : <><span
                                    style={{ display: "block", fontSize: "75%", color: "#333" }}
                                >Add Players</span></>
                            }

                        </button>
                    </>
                )
            },
            wrap: true,
            center: true,
            width: "175px",
            // sortable: true
        },
        {
            name: (
                <div>
                    Team Two
                </div>
            ),
            selector: (row) => {
                return (
                    <>
                        <img style={{ width: "100%", padding: "20px" }} src={row.team2Logo} /><br />
                        <button
                            // className="btn btn-sm btn-outline-info"
                            className={row.playing11[0]?.teamID === row.team2Id || row.playing11[1]?.teamID === row.team2Id ? "btn btn-sm btn-outline-info" : "btn btn-sm btn-outline-danger"}
                            name={row.team2}
                            id={row.team2Id}
                            style={{
                                margin: "5px 0",
                                width: "140px"
                            }}
                            onClick={e => handleTeamPlayers(e, row?.sportID, row?.leaugeID, row?.matchID)}
                        >{row.team2}
                            {
                                row.playing11[0]?.teamID === row.team2Id || row.playing11[1]?.teamID === row.team2Id ? <></> : <><span
                                    style={{ display: "block", fontSize: "75%", color: "#333" }}
                                >Add Players</span></>
                            }
                        </button>
                    </>
                )
            },
            wrap: true,
            center: true,
            width: "175px",
            sortable: true
        },

        {
            name: (
                <div>
                    TOSS
                </div>
            ),
            selector: (row) => row.toss,
            wrap: true,
            center: true,
            // width: "225px",
            // sortable: true
        },
        {
            name: (
                <div>
                    Play
                </div>
            ),
            selector: (row) => row.play,
            wrap: true,
            center: true,
            // width: "80px",
            // sortable: true
        },
        {
            name: (
                <div>
                    Action
                </div>
            ),
            selector: (row) => row.matchUpdate,
            wrap: true,
            center: true,
            width: "120px",
            sortable: true
        },

    ]
    const initialValues = {
        sessionID: "",
        leaugeID: "",
        teamID_One: "",
        teamID_Two: "",
        address: "",
        startDate: "",
        timeZone: "",
        // matchType: "",
        sportID: "",
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

    const initialTossData = {
        matchID: "",
        tossWinnerTeamID: "",
        play_by: "",
        // tossLooserTeamID: "",
    }

    const [tossData, setTossData] = useState(initialTossData)
    const [tossingTeams, setTossingTeams] = useState([])
    const [tossSports, setTossSports] = useState("")

    const [showSearch, setShowSearch] = useState(true)
    const [showToss, setShowToss] = useState(false)
    const [showTeamPlayers, setShowTeamPlayers] = useState(false)

    const [loader, setLoader] = useState(false)
    let name, value

    useEffect(() => {
        fetchAllData()
        fetchAllSportsData()
        fetchAllTimeZones()
        fetchAllSessions()
        // fetchAllLeagues()
        fetchAllTeams()
        // fetchAllPlayersData()
    }, [])

    const [playersSportsID, setPlayersSportsID] = useState("")
    const [playersTeamID, setPlayersTeamID] = useState("")
    const [playersTeamName, setPlayersTeamName] = useState("")
    const [playersMatchID, setPlayersMatchID] = useState("")

    const handleTeamPlayers = (e, sport, league, match) => {
        e.preventDefault()
        setSelectedPlayers([])
        setAllPlayers([])
        // console.log("hh248",sport);
        // fetchPlayersForPlaying11(match, session, e.target.id)
        fetchPlayersForPlaying11(sport, league, e.target.id)
        setPlayersSportsID(sport)
        setPlayersTeamID(e.target.id)
        setPlayersTeamName(e.target.name)
        setPlayersMatchID(match)
        setShowTeamPlayers(true)
        setShowToss(false)
        setShowSearch(false)
        // getAllPlayingEleven()
    }

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

    const getAllPlayingEleven = async () => {
        const response = await fetchAllPlayingEleven()
        console.log("arrPlayingEleven226", response);
        if (response && Object.keys(response.data.data).length > 0) {
            let arrPlayingEleven = response.data.data
                .filter(item => item.teamID === playersTeamID)
                .sort().reverse();

            // setAllSports(arrSports)
            setSelectedPlayers(arrPlayingEleven !== undefined ? arrPlayingEleven[0]?.playerID : [])
        }
    }

    const postData = (e) => {
        name = e.target.name;
        value = e.target.value;

        let searchData = allData;
        // console.log("searchData292",searchData);

        setInputData({ ...inputData, [name]: value });

        // if (name === "matchType") {
        //     searchData = searchData?.filter((item) => {
        //         if (item?.matchType?.toLowerCase().includes(value)) {
        //             return item;
        //         }
        //     });
        // }
        if (name === "sportID") {
            // alert(value)
            searchData = searchData?.filter((item) => {
                if (item?.sportID === value) {
                    return item;
                }
            });
        }
        if (name === "leaugeID") {
            searchData = searchData?.filter((item) => {
                if (item?.leaugeID === value) {
                    return item;
                }
            });
        }

        if (name === "startDate") {
            searchData = searchData.filter((item) => {
                let itemDate = new Date(item?.startDate)
                let srchDt = new Date(value)
                if (
                    moment(itemDate).format("YYYY-MM-DD") === moment(srchDt).format("YYYY-MM-DD")
                ) {
                    return item;
                }
            });
        }
        // if (name === "sessionID") {
        //     searchData = searchData?.filter((item) => {
        //         if (item?.sessionID?.toLowerCase().includes(value)) {
        //             return item;
        //         }
        //     });
        // }




        setFilteredData(searchData);



    }
    const validateData = () => {
        let error = {};
        if (inputData.leaugeName === "") {
            error.leaugeName = "Please enter leauge name";
        }
        return error;
    };

    const postTossData = (e) => {
        name = e.target.name;
        value = e.target.value;
        let tossWinner = tossingTeams[e.target.id]?.teamId
        let tossLooser = tossingTeams[0]?.teamId
        if (e.target.id == 0) {
            tossLooser = tossingTeams[1]?.teamId
        }



        if (name === "tossWinnerTeamID") {
            setTossData({ ...tossData, tossWinnerTeamID: tossWinner })
            // setTossData({ ...tossData, tossWinnerTeamID: tossWinner, tossLooserTeamID: tossLooser })
        } else {
            setTossData({ ...tossData, [name]: value });
        }

    }

    const submitData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        if (Object.keys(ErrorList).length === 0) {
            console.log("L197", inputData)
            const response = await addNewMatch(inputData);
            setInputData(initialValues)
            fetchAllData()
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
        }
    }

    const handleTossData = async (e) => {
        e.preventDefault()
        console.log("tossData", tossData)
        // return
        const response = await addNewToss(tossData);
        setInputData(initialValues)
        setTossData(initialTossData)
        setShowToss(false)
        setShowSearch(true)
        setShowTeamPlayers(false)
        fetchAllData()
        response.data.status ? swal("Good job!", response.data?.message, "success") : (swal("Error", response.message, "error"))
    }

    const handlePlay = async (e) => {
        e.preventDefault();
        const data = {
            matchid: e.target.id,
            isMatch_started: e.target.value,
        }
        console.log("play394", data);
        // return
        const response = await updateMatchPlay(data);
        // console.log("L337",response);
        // setInputData(initialValues)
        // setTossData(initialTossData)
        // setShowToss(false)
        // setShowSearch(true)
        // setShowTeamPlayers(false)
        fetchAllData()
        response?.data?.status ? swal("Good job!", response?.data?.message, "success") : (swal("Error", "Match Stopped", "error"))
    }

    const handleEndPlay = async (e) => {
        e.preventDefault();
        // const data = {
        //     matchid: e.target.id,
        //     isMatch_started: e.target.value,
        // }
        // console.log("play394", data);
        // return
        const response = await endMatchPlay(e.target.id);
        // console.log("L337",response);
        // setInputData(initialValues)
        // setTossData(initialTossData)
        // setShowToss(false)
        // setShowSearch(true)
        // setShowTeamPlayers(false)
        fetchAllData()
        response?.data?.status ? swal("Good job!", response?.data?.message, "success") : (swal("Error!", "Unable to end the match", "error"))
    }




    const onEdit = (item) => {
        console.log("L450", item?.sportID);
        setShowToss(true)
        setShowSearch(false)
        setShowTeamPlayers(false)
        setTossSports(item?.sportID)
        setTossData({ ...tossData, matchID: item?._id });
        let arrObj = [
            {
                teamId: item?.teamOneData?._id,
                teamName: item?.teamOneData?.teamName,
            },
            {
                teamId: item?.teamOneData2?._id,
                teamName: item?.teamOneData2?.teamName,
            },
        ]
        setTossingTeams(arrObj)

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
            console.log("L254", response.data.data);
            let arr = response.data.data.sort().reverse().map((item, index) => {
                console.log("playingelevendta", item?.sportID);
                return {
                    sl: index + 1,
                    matchType: item?.matchType ? item?.matchType : "N/A",
                    startDate: item?.startDate ? item?.startDate : "N/A",
                    address: item?.address ? item?.address : "N/A",
                    team1: item?.teamOneData ? item?.teamOneData?.teamName : "N/A",
                    team1Logo: item?.teamOneData ? item?.teamOneData?.teamLogo : "N/A",
                    team2: item?.teamOneData2 ? item?.teamOneData2?.teamName : "N/A",
                    team2Logo: item?.teamOneData2 ? item?.teamOneData2?.teamLogo : "N/A",
                    team1Id: item?.teamOneData?._id,
                    team2Id: item?.teamOneData2?._id,
                    session: item?.sessionID ? item?.sessionYear : "N/A",
                    league: item?.leaugeID ? item?.leaugeName : "N/A",
                    sessionID: item?.sessionID,
                    leaugeID: item?.leaugeID,
                    matchID: item?._id,
                    tossPlayBy: item?.toss_winner_playBy,
                    tossWinningTeamName: item?.winnerTeamNme,
                    tossWinningTeamID: item?.winnerTeamID,
                    tossLoosingTeamID: item?.teamOneData._id === item?.winnerTeamID ? item?.teamOneData2._id : item?.teamOneData._id,
                    battingTeamID: item?.toss_winner_playBy === "BAT" ? item?.winnerTeamID : item?.teamOneData._id === item?.winnerTeamID ? item?.teamOneData2._id : item?.teamOneData._id,
                    ballingTeamID: item?.toss_winner_playBy === "BAT" ? item?.teamOneData._id === item?.winnerTeamID ? item?.teamOneData2._id : item?.teamOneData._id : item?.winnerTeamID,
                    playing11: item?.playingelevendta,
                    sportID: item?.sportID,
                    inningsOvers: item?.inningsOvers ? item?.inningsOvers : "N/A",
                    toss: (
                        <div style={{ display: "flex", flexDirection: "coloum" }}>
                            {
                                !item?.isToss_completed ? (
                                    <>
                                        <button
                                            className="btn btn-success rounded-pill"
                                            onClick={() => onEdit(item)}
                                        >
                                            Toss
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div>Won by <strong>{item?.winnerTeamNme}</strong> {item?.toss_winner_playBy && <> and decided to <strong>{item?.toss_winner_playBy}</strong> first</>}</div>
                                    </>
                                )
                            }


                        </div>
                    ),
                    play: (
                        <div style={{ display: "flex", flexDirection: "coloum" }}>
                            {
                                !item?.isMatch_started && item?.isToss_completed && item?.playingelevendta.length === 2 ? (
                                    <>
                                        <button
                                            id={item._id}
                                            value={true}
                                            className="btn btn-success rounded-pill"
                                            onClick={(e) => handlePlay(e)}
                                        >
                                            Start
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {
                                            item?.isToss_completed && item?.playingelevendta.length === 2 && !item?.isMatch_ended ? (
                                                <>
                                                    <button
                                                        className="btn btn-danger rounded-pill"
                                                        id={item._id}
                                                        value={false}
                                                        onClick={(e) => handleEndPlay(e)}
                                                    >
                                                        End
                                                    </button>
                                                </>
                                            ) : (

                                                <>
                                                    {
                                                        item?.isMatch_ended ? "Match Ended" : "TOSS yet not done / Players not selected"
                                                    }

                                                </>
                                            )
                                        }

                                    </>
                                )
                            }


                        </div>
                    ),
                    matchUpdate: (
                        <div style={{ display: "flex", flexDirection: "coloum" }}>
                            {
                                item?.isMatch_started && item?.isToss_completed && !item?.isMatch_ended ? (
                                    <>
                                        {
                                            item?.sportID === "664f1a89607b2fbd0f4938c1" && <>
                                                <Link to={`/overupdate/${item._id}/${item.inningsOvers}`} class="btn btn-success">
                                                    Cricket Update
                                                </Link>
                                            </>
                                        }
                                        {
                                            item?.sportID === "664f3bfa6b3786e7c2140390" && <>
                                                <Link to={`/minuteupdate/football/${item._id}`} class="btn btn-success">
                                                    Football Update
                                                </Link>
                                            </>
                                        }

                                    </>
                                ) : (
                                    <>
                                        {
                                            //item?.isMatch_ended ? "Match Ended" : "Match yet not started"
                                            item?.sportID === "664f1a89607b2fbd0f4938c1" && <>
                                                <Link to={`/overupdate/${item._id}/${item.inningsOvers}`} class="btn btn-success">
                                                    Score
                                                </Link>
                                            </>
                                        }

                                    </>
                                )
                            }


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

    const [allPlayers, setAllPlayers] = useState([])

    const fetchAllPlayersData = async () => {
        const response = await fetchAllPlayer()
        if (response && Object.keys(response.data.data).length > 0) {
            console.log("L533", response.data.data);
            let arrPlayers = response.data.data
                // .filter(item => item.id !== idToRemove)
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

    const _fetchPlayersBySessionAndTeam = async (match, session, team) => {
        const data = {
            // matchID: match,
            // teamID: team,
            // sessionID: session,

            sportsID: "",
            leagueID: "",
            teamID: "",
        }
        const response = await fetchAllPlayersBySessionAndTeam(data)
        console.log("response633", response);
        if (response && Object.keys(response.data.data).length > 0) {

            // let arrPlayers = response?.data?.data[0]?.teamOnedta.length > 0 ? response?.data?.data[0]?.teamOnedta : response?.data?.data[0]?.teamTwodta
            let arrPlayersList
            if (response?.data?.data[0]?.teamOnedta.length > 0) {
                arrPlayersList = response?.data?.data[0]?.teamOnedta
            } else if (response?.data?.data[0]?.teamTwodta.length > 0) {
                arrPlayersList = response?.data?.data[0]?.teamTwodta
            }
            // .filter(item => item.id !== idToRemove)
            let arrPlayers = arrPlayersList?.map((item, index) => {

                return {
                    id: item?.playerID,
                    name: item?.playerName,
                };
            })

            console.log("arrPlayers", arrPlayers);
            arrPlayers && setAllPlayers(arrPlayers)
        }
    }

    const fetchPlayersForPlaying11 = async (sports, league, team) => {
        const data = {
            sportsID: sports,
            teamLeagueID: league,
            teamID: team
        }
        // console.log("kk670", data);
        const response = await fetchAllPlayersForPlaying11(data)
        // console.log("response670", response.data);
        if (response && response?.data?.data.length > 0) {

            // let arrPlayers = response?.data?.data[0]?.teamOnedta.length > 0 ? response?.data?.data[0]?.teamOnedta : response?.data?.data[0]?.teamTwodta
            let arrPlayersList = response?.data?.data[0].playerdata

            // if (response?.data?.data[0]?.teamOnedta.length > 0) {
            //     arrPlayersList = response?.data?.data[0]?.teamOnedta
            // } else if (response?.data?.data[0]?.teamTwodta.length > 0) {
            //     arrPlayersList = response?.data?.data[0]?.teamTwodta
            // }

            // .filter(item => item.id !== idToRemove)
            let arrPlayers = arrPlayersList?.map((item, index) => {

                return {
                    id: item?._id,
                    name: item?.playerName,
                };
            })

            // console.log("arrPlayers691", arrPlayersList);
            arrPlayers && setAllPlayers(arrPlayers)
        }
    }

    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const handleSelectOption = (option) => {
        // console.log("UY702",option);
        setSelectedPlayers([...selectedPlayers, option])

        let index = allPlayers.findIndex(item => item.id === option.id);
        const newItems = [...allPlayers]
        newItems.splice(index, 1)
        setAllPlayers(newItems)
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
        // console.log("option612", option);
        setAllPlayers([...allPlayers, option])
    }

    const [captainID, setCaptainID] = useState()
    const [vice_captainID, setVice_captainID] = useState()
    const [wicket_keeperID, setWicket_keeperID] = useState()

    const [errPlaying11, setErrPlaying11] = useState("")
    const handleTeamPlayersData = async (e) => {
        e.preventDefault()
        const playerID = selectedPlayers.map(item => item.id)

        const inputPlayingEleven = {
            matchID: playersMatchID,
            teamID: playersTeamID,
            playerID: playerID,
            captainID: captainID,
            vice_captainID: vice_captainID,
            // wicket_keeperID: wicket_keeperID,
            // goal_keeperID: wicket_keeperID,
        }
        if (playersSportsID === "664f1a89607b2fbd0f4938c1") {
            //Spotrs: Cricket
            inputPlayingEleven.wicket_keeperID = wicket_keeperID
        } else if (playersSportsID === "664f3bfa6b3786e7c2140390") {
            //Spotrs: Football
            inputPlayingEleven.goal_keeperID = wicket_keeperID
        }
        console.log("inputPlayingEleven759", inputPlayingEleven)
        //return

        if (inputPlayingEleven.playerID.length < 11) {
            return swal("Error", "Choose all 11 players", "error")
        }
        if (inputPlayingEleven.captainID === "Choose player..." || inputPlayingEleven.captainID === "" || inputPlayingEleven.captainID === undefined || inputPlayingEleven.captainID === null) {
            return swal("Error", "Choose team Captain", "error")
        }
        if (inputPlayingEleven.vice_captainID === "Choose player..." || inputPlayingEleven.vice_captainID === "" || inputPlayingEleven.vice_captainID === undefined || inputPlayingEleven.vice_captainID === null) {
            return swal("Error", "Choose team Vice Captain", "error")
        }

        if (playersSportsID === "664f1a89607b2fbd0f4938c1") {
            //Spotrs: Cricket
            if (inputPlayingEleven.wicket_keeperID === "Choose player..." || inputPlayingEleven.wicket_keeperID === "" || inputPlayingEleven.wicket_keeperID === undefined || inputPlayingEleven.wicket_keeperID === null) {
                return swal("Error", "Choose team Wicket Keeper", "error")
            }
        } else if (playersSportsID === "664f3bfa6b3786e7c2140390") {
            //Spotrs: Football
            if (inputPlayingEleven.goal_keeperID === "Choose player..." || inputPlayingEleven.goal_keeperID === "" || inputPlayingEleven.goal_keeperID === undefined || inputPlayingEleven.goal_keeperID === null) {
                return swal("Error", "Choose team Goal Keeper", "error")
            }
        }



        // return
        const response = await addNewPlayingEleven(inputPlayingEleven);
        // console.log("L666", response);
        if (response && response.data.status) {
            swal("Good job!", response.data?.message, "success")
            setSelectedPlayers([])
            fetchAllData()
            setShowSearch(true)
            setShowTeamPlayers(false)
            setShowToss(false)
        } else {
            swal("Error", `Playing eleven already selected for ${playersTeamName} in this match!`, "error")
            setSelectedPlayers([])
        }

    }

    const viewAllData = () => {
        setFilteredData(allData)
        setInputData(initialValues)
    }


    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Score Board</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li class="breadcrumb-item">Score Board</li>
                            <li class="breadcrumb-item active">Match List</li>
                        </ol>
                    </nav>
                </div>
                <section class="section">
                    <div class="row">
                        <div class="col-lg-3">
                            {
                                showSearch && (
                                    <>
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">Find Match<a href="javascript:" style={{ float: "right" }} onClick={viewAllData}>View All</a></h5>


                                                <form method="post" class="row g-3">

                                                    {/* <div class="col-md-7">
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
                                                    </div> */}




                                                    <div class="col-md-12">
                                                        <div class="form-floating mb-3">
                                                            <select class="form-select"
                                                                id="sportID"
                                                                aria-label="Floating label select example"
                                                                name="sportID"
                                                                onChange={(e) => {
                                                                    postData(e)
                                                                    e.target.value && fetchAllTeamLeagueData(e.target.value)
                                                                }}
                                                            >
                                                                <option selected>Choose...</option>
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
                                                            <label for="sportID">Sports:</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="form-floating mb-3">
                                                            <select class="form-select"
                                                                id="leaugeID"
                                                                aria-label="Floating label select example"
                                                                name="leaugeID"
                                                                onChange={(e) => postData(e)}
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
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="form-floating">
                                                            <input
                                                                type="date"
                                                                class="form-control"
                                                                id="startDate"
                                                                placeholder="Start Date"
                                                                name="startDate"
                                                                onChange={(e) => postData(e)}
                                                                value={inputData.startDate}
                                                            />
                                                            <label for="startDate">Start Date</label>
                                                            <div class="validate text-danger">{dataError.startDate}</div>
                                                        </div>
                                                    </div>


                                                </form>

                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            {
                                showToss && (
                                    <>
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">Toss details</h5>


                                                <form method="post" class="row g-3">
                                                    <div class="col-md-12">
                                                        <div class="form-floating mb-3">

                                                            {
                                                                tossingTeams.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <div class="form-check" key={index}>
                                                                                <input class="form-check-input" type="radio"
                                                                                    name="tossWinnerTeamID"
                                                                                    //id={item.teamId}
                                                                                    id={index}
                                                                                    value={item.teamId}
                                                                                    onChange={(e) => postTossData(e)}
                                                                                />
                                                                                <label class="form-check-label" for={item.teamId}>
                                                                                    {item.teamName}
                                                                                </label>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                    </div>
                                                    {
                                                        tossSports === "664f1a89607b2fbd0f4938c1" && <>
                                                            <div class="col-md-12">
                                                                <div class="form-floating mb-3">
                                                                    <select class="form-select"
                                                                        id="play_by"
                                                                        aria-label="Floating label select example"
                                                                        name="play_by"
                                                                        onChange={(e) => postTossData(e)}
                                                                    >
                                                                        <option selected>Choose...</option>
                                                                        {
                                                                            [
                                                                                {
                                                                                    title: "BAT"
                                                                                },
                                                                                {
                                                                                    title: "BALL"
                                                                                }
                                                                            ].map((item, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <option value={item.title} key={index}
                                                                                        // selected={item._id == inputData.leaugeID ? true : false}
                                                                                        >{item.title}</option>
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <label for="play_by">Decision:</label>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }


                                                    <div class="text-center">
                                                        <button
                                                            type="submit"
                                                            class="btn btn-primary"
                                                            style={{
                                                                marginRight: "5px"
                                                            }}
                                                            onClick={handleTossData}
                                                        >Save Details</button>
                                                    </div>

                                                </form>

                                            </div>
                                        </div>
                                    </>
                                )
                            }

                            {
                                showTeamPlayers && (
                                    <>
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title"><span style={{
                                                    display: "block",
                                                    fontSize: "80%"
                                                }}>Team Players of</span> {playersTeamName}</h5>


                                                <form method="post" class="row g-3">


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
                                                                selectedPlayers?.length < 11 && (
                                                                    <>
                                                                        <Dropdown label="Type and choose player..." options={allPlayers} onSelect={handleSelectOption} />
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                errPlaying11 && <><div class="validate text-danger">{dataError.playerTagID}</div></>


                                                            }



                                                            {/* <label for="play_by">Decision:</label> */}
                                                        </div>
                                                    </div>

                                                    {
                                                        selectedPlayers?.length >= 11 && (
                                                            <>
                                                                <div>
                                                                    <div class="col-md-12">
                                                                        <div class="form-floating mb-3">
                                                                            <select class="form-select"
                                                                                id="captainID"
                                                                                aria-label="Floating label select example"
                                                                                name="captainID"
                                                                                onChange={(e) => {
                                                                                    setCaptainID(e.target.value)
                                                                                }}
                                                                            >
                                                                                <option selected>Choose player...</option>
                                                                                {
                                                                                    selectedPlayers.map((item, index) => {
                                                                                        return (
                                                                                            <>
                                                                                                <option value={item.id} key={index}
                                                                                                // selected={item._id == inputData.sportsID ? true : false}
                                                                                                >{item.name}</option>
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                            <label for="captainID">Captain:</label>
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-12">
                                                                        <div class="form-floating mb-3">
                                                                            <select class="form-select"
                                                                                id="vice_captainID"
                                                                                aria-label="Floating label select example"
                                                                                name="vice_captainID"
                                                                                onChange={(e) => {
                                                                                    setVice_captainID(e.target.value)
                                                                                }}
                                                                            >
                                                                                <option selected>Choose player...</option>
                                                                                {
                                                                                    selectedPlayers
                                                                                        .filter(item => item.id !== captainID)
                                                                                        .map((item, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <option value={item.id} key={index}
                                                                                                    // selected={item._id == inputData.sportsID ? true : false}
                                                                                                    >{item.name}</option>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                }
                                                                            </select>
                                                                            <label for="vice_captainID">Vice Captain:</label>
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-12">
                                                                        <div class="form-floating mb-3">
                                                                            <select class="form-select"
                                                                                id="wicket_keeperID"
                                                                                aria-label="Floating label select example"
                                                                                name="wicket_keeperID"
                                                                                onChange={(e) => {
                                                                                    setWicket_keeperID(e.target.value)
                                                                                }}
                                                                            >
                                                                                <option selected>Choose player...</option>
                                                                                {
                                                                                    selectedPlayers
                                                                                        // .filter(item=>item.id!==captainID)
                                                                                        .map((item, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <option value={item.id} key={index}
                                                                                                    // selected={item._id == inputData.sportsID ? true : false}
                                                                                                    >{item.name}</option>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                }
                                                                            </select>
                                                                            <label for="wicket_keeperID">{playersSportsID === "664f1a89607b2fbd0f4938c1" ? "Wicket Keeper" : playersSportsID === "664f3bfa6b3786e7c2140390" ? "Goal Keeper" : ""}:</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    }


                                                    <div class="text-center">
                                                        <button
                                                            type="submit"
                                                            class="btn btn-primary"
                                                            style={{
                                                                marginRight: "5px"
                                                            }}
                                                            onClick={e => handleTeamPlayersData(e)}
                                                        >Save Playing11</button>
                                                    </div>

                                                </form>

                                            </div>
                                        </div>
                                    </>
                                )
                            }




                        </div>

                        <div class="col-lg-9">

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

export default MatchList
