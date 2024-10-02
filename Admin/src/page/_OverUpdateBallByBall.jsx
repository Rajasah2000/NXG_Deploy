import React, { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import Sidebar from '../component/common/Sidebar'
import Footer from '../component/common/Footer'
import { Link, useParams } from 'react-router-dom'
import { endInningsPlay, endMatchPlay, fetchAllBallByBall, fetchAllMatchTeamPlayers, fetchAllPlayer, updateBallByBall } from '../service/API'
import Dropdown from '../component/core/Dropdown'
import Swal from 'sweetalert2'
import swal from 'sweetalert'

const OverUpdateBallByBall = () => {
    const { match } = useParams();

    const initialValues = {
        matchID: match,
        strikerID: "",
        nonStrikerID: "",
        bollerID: "",
        ball_number: 1,
        over_number: 0,
        striker_run: 0,
        extra_run: 0,
        is_boundry: false,
        is_six: false,
        is_wicket: false,
        ball_action: "",
        extra_type: "",
        wicket_type: "",
        wicket_tackers: [],
    }

    const [matchOvers, setMatchOvers] = useState()
    const [matchUpdate, setMatchUpdate] = useState([])
    const [battingTeamPlayers, setBattingTeamPlayers] = useState([])
    const [allBattingPlayers, setAllBattingPlayers] = useState([])
    const [bowlingTeamPlayers, setBowlingTeamPlayers] = useState([])
    const [ballCounter, setBallCounter] = useState(1)
    const [overCounter, setOverCounter] = useState(0)
    const [overChangeIndicator, setOverChangeIndicator] = useState(0)
    const [displayWicketType, setDisplayWicketType] = useState(false)
    const [displayWicketTakenBy, setDisplayWicketTakenBy] = useState(false)
    const [displayRunForStricker, setDisplayRunForStricker] = useState(false)
    const [displayExtraRun, setDisplayExtraRun] = useState(false)
    const [displayExtraType, setDisplayExtraType] = useState(false)
    const [inputData, setInputData] = useState(initialValues)
    const [dataError, setDataError] = useState({});
    const [allData, setAllData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [editItemID, setEditItemID] = useState()
    const [loader, setLoader] = useState(false)
    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [allPlayers, setAllPlayers] = useState([])
    const [payLoadData, setPayLoadData] = useState()
    const [wicketKeeperID, setWicketKeeperID] = useState("")
    const [inningsOvers, setInningsOvers] = useState(2)



    const arrBallActions = [
        {
            text: "DOT BALL",
            value: "DOT"
        },
        {
            text: "RUN",
            value: "RUN"
        },
        {
            text: "EXTRA",
            value: "EXTRA"
        },
        {
            text: "OUT",
            value: "WICKET"
        },
    ]
    const arrExtraTypes = [
        {
            text: "NO BALL",
            value: "NO_BALL"
        },
        {
            text: "WIDE BALL",
            value: "WIDE_BALL"
        }, {
            text: "LEG BY",
            value: "LEG_BY"
        },
        {
            text: "BY RUN",
            value: "BY"
        },

    ]
    const arrRun = [
        {
            text: "1",
            value: 1
        },
        {
            text: "2",
            value: 2
        },
        {
            text: "3",
            value: 3
        },
        {
            text: "FOUR",
            value: 4
        },
        {
            text: "5",
            value: 5
        },
        {
            text: "SIX",
            value: 6
        },
    ]
    const arrWicket = [
        {
            text: "BOWLED OUT",
            value: "BOLD"
        },
        {
            text: "STUMP OUT",
            value: "STUMPING"
        }, {
            text: "CATCH OUT",
            value: "CATCHOUT"
        },
        {
            text: "RUN OUT",
            value: "RUNOUT"
        },
        {
            text: "LBW",
            value: "LBW"
        },
        {
            text: "HIT WICKET",
            value: "HIT_WICKET"
        },
        {
            text: "TIME OUT",
            value: "TIME_OUT"
        },
    ]

    useEffect(() => {
        console.log("inputData402", inputData, overChangeIndicator)
        fetchMatchPlayers()
        fetchAllData()
        getOverChangeIndicator()
    }, [])

    useEffect(() => {
        console.log("inputData402", inputData, overChangeIndicator)
        fetchAllPlayersData()
        fetchAllData()
    }, [inputData.ball_action])

    useEffect(() => {
        console.log("inputData402", inputData, overChangeIndicator)
        if (selectedPlayers.length > 0) {
            const arrWicketTakers = selectedPlayers.map(item => ({ playerID: item.id }));
            setInputData({ ...inputData, wicket_tackers: arrWicketTakers })
        }
    }, [selectedPlayers])

    useEffect(() => {
        console.log("inputData402", inputData, overChangeIndicator)
        if (inputData.ball_action === "RUN") {
            const { nonStrikerID, extra_run, extra_type, wicket_type, wicket_tackers, ...payloadData } = inputData;
            setPayLoadData(payloadData)
        }
        if (inputData.ball_action === "EXTRA") {
            const { nonStrikerID, wicket_type, wicket_tackers, ...payloadData } = inputData;
            setPayLoadData(payloadData)
        }
        if (inputData.ball_action === "DOT") {
            const { nonStrikerID, extra_type, extra_run, wicket_type, wicket_tackers, ...payloadData } = inputData;
            setPayLoadData(payloadData)
        }
        if (inputData.ball_action === "WICKET") {
            const { nonStrikerID, extra_type, ...payloadData } = inputData;
            setPayLoadData(payloadData)
        }
    }, [inputData])

    useEffect(() => {
        console.log("overChangeIndicator", overChangeIndicator, inputData.over_number);
        if (overChangeIndicator === 0 && inningsOvers === inputData.over_number + 1) {
            // alert("First Innings Completed")
            const secondInningsBattingTeam = bowlingTeamPlayers
            setBowlingTeamPlayers(allBattingPlayers)
            console.log("secondInningsBattingTeam", allBattingPlayers, bowlingTeamPlayers);
            setBattingTeamPlayers(secondInningsBattingTeam)
            inningsCompleted()
        } else if (overChangeIndicator === 0 && inningsOvers === ((inputData.over_number + 1) / 2)) {
            alert("Match Completed")
            endMatch()
        }
    }, [overChangeIndicator])

    let name, value

    const postData = (e) => {
        name = e.target.name;
        value = e.target.value
        if (name === "striker_run" || name === "extra_run") {
            value = parseInt(value)
        }

        setInputData({ ...inputData, [name]: value });

        if (name === "ball_action") {
            setInputData({ ...inputData, over_number: overCounter, ball_number: ballCounter })
            if (value === "RUN") {

                setDisplayWicketType(false)
                setDisplayWicketTakenBy(false)
                setDisplayExtraType(false)
                setDisplayRunForStricker(true)
                setDisplayExtraRun(false)

                setInputData({
                    ...inputData,
                    ball_action: value,
                    extra_run: 0,
                    extra_type: "",
                    over_number: overCounter,
                    ball_number: ballCounter
                });

            } else if (value === "EXTRA") {

                setDisplayWicketType(false)
                setDisplayWicketTakenBy(false)
                setDisplayRunForStricker(false)
                setDisplayExtraType(true)
                setDisplayExtraRun(true)

                setInputData({
                    ...inputData,
                    ball_action: value,
                    over_number: overCounter,
                    ball_number: ballCounter
                })

            } else if (value === "DOT") {

                setDisplayWicketType(false)
                setDisplayWicketTakenBy(false)
                setDisplayRunForStricker(false)
                setDisplayExtraType(false)
                setDisplayExtraRun(false)

                setInputData({
                    ...inputData,
                    ball_action: value,
                    extra_run: 0,
                    extra_type: "",
                    striker_run: 0,
                    over_number: overCounter,
                    ball_number: ballCounter
                })

            } else if (value === "WICKET") {
                setDisplayWicketType(true)
                setDisplayWicketTakenBy(false)
                setDisplayRunForStricker(false)
                setDisplayExtraType(false)
                setDisplayExtraRun(false)

                setInputData({
                    ...inputData,
                    ball_action: value,
                    extra_run: 0,
                    extra_type: "",
                    is_wicket: true,
                    over_number: overCounter,
                    ball_number: ballCounter
                })

            } else {
                setDisplayWicketType(false)
                setDisplayWicketTakenBy(false)
                setDisplayRunForStricker(false)
                setDisplayExtraType(false)
                setDisplayExtraRun(false)
            }
        }

        if (name === "wicket_type") {
            if (value === "BOLD") {
                setDisplayWicketTakenBy(false)
                setDisplayRunForStricker(false)
                setInputData({ ...inputData, wicket_type: value, wicket_tackers: [{ playerID: inputData.bollerID }] })
            } else if (value === "STUMPING") {
                setDisplayWicketTakenBy(false)
                setDisplayRunForStricker(false)
                setInputData({ ...inputData, wicket_type: value, wicket_tackers: [{ playerID: wicketKeeperID }] })
            } else {
                setDisplayWicketTakenBy(true)
                setDisplayRunForStricker(true)
            }
        }

        if (name === "extra_type" && value === "NO_BALL") {
            setDisplayRunForStricker(true)
            setInputData({ ...inputData, extra_run: 1, extra_type: value })
        }
        if (name === "extra_type" && value === "WIDE_BALL") {
            setDisplayRunForStricker(true)
            setInputData({ ...inputData, extra_run: 1, extra_type: value })
        }
        if (name === "extra_type" && value === "LEG_BY") {
            setDisplayRunForStricker(true)
            setInputData({ ...inputData, extra_run: 0, extra_type: value })
        }
        if (name === "extra_type" && value === "BY") {
            setDisplayRunForStricker(true)
            setInputData({ ...inputData, extra_run: 0, extra_type: value })
        }

        if (name === "striker_run" && value === 4) {
            setInputData({ ...inputData, is_boundry: true, striker_run: 4, extra_run: 0, extra_type: "" })
        }
        if (name === "striker_run" && value === 6) {
            setInputData({ ...inputData, is_six: true, striker_run: 6, extra_run: 0, extra_type: "" })
        }

        let errorMsg = "";
        switch (name) {
            case "strikerID":
                errorMsg = "Choose the Stricker name";
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
        if (inputData.leaugeName === "") {
            error.leaugeName = "Please enter leauge name";
        }
        return error;
    }



    const submitData = async (e) => {
        e.preventDefault()

        let ErrorList = validateData();
        setDataError(validateData());
        if (Object.keys(ErrorList).length === 0) {

            const response = await updateBallByBall(payLoadData);

            if (response?.data?.status) {

                fetchAllData()

                //After API Call///////////////

                inputData.extra_type !== "NO_BALL" && inputData.extra_type !== "WIDE_BALL" && setOverChangeIndicator(overChangeIndicator + 1)
                setBallCounter(ballCounter + 1)

                if (inputData.ball_action === "RUN" && overChangeIndicator < 5 && (inputData.striker_run === 1 || inputData.striker_run === 3 || inputData.striker_run === 5)) {
                    console.log("inputData392", inputData, overChangeIndicator)
                    let x = inputData.strikerID
                    let y = inputData.nonStrikerID
                    setInputData({ ...inputData, strikerID: y, nonStrikerID: x, ball_action: "", striker_run: 0, extra_run: 0, is_boundry: false, is_six: false, extra_type: "", wicket_type: "", wicket_tackers: [] })
                }
                else if (overChangeIndicator === 5) {
                    if (inputData.ball_action === "WICKET" || inputData.ball_action === "DOT") {
                        console.log("inputData392", inputData, overChangeIndicator)
                        let x = inputData.strikerID
                        let y = inputData.nonStrikerID
                        setInputData({ ...inputData, strikerID: y, nonStrikerID: x, ball_action: "", striker_run: 0, extra_run: 0, is_boundry: false, is_six: false, extra_type: "", wicket_type: "", wicket_tackers: [] })
                    } else if (inputData.ball_action === "RUN") {
                        if (inputData.striker_run === 2 || inputData.striker_run === 4 || inputData.striker_run === 6) {
                            console.log("inputData392", inputData, overChangeIndicator)
                            let x = inputData.strikerID
                            let y = inputData.nonStrikerID
                            setInputData({ ...inputData, strikerID: y, nonStrikerID: x, ball_action: "", striker_run: 0, extra_run: 0, is_boundry: false, is_six: false, extra_type: "", wicket_type: "", wicket_tackers: [] })
                        } else {
                            console.log("inputData402", inputData, overChangeIndicator)
                            setInputData({ ...inputData, strikerID: inputData.strikerID, nonStrikerID: inputData.nonStrikerID, ball_action: "", striker_run: 0, extra_run: 0, is_boundry: false, is_six: false, extra_type: "", wicket_type: "", wicket_tackers: [] })
                        }
                    } else {
                        console.log("inputData402", inputData, overChangeIndicator)
                        setInputData({ ...inputData, strikerID: inputData.strikerID, nonStrikerID: inputData.nonStrikerID, ball_action: "", striker_run: 0, extra_run: 0, is_boundry: false, is_six: false, extra_type: "", wicket_type: "", wicket_tackers: [] })
                    }
                } else {
                    console.log("inputData402", inputData, overChangeIndicator)
                    setInputData({ ...inputData, ball_action: "", striker_run: 0, extra_run: 0, is_boundry: false, is_six: false, extra_type: "", wicket_type: "", wicket_tackers: [] })
                }

                if (inputData.ball_action === "WICKET") {
                    if (inputData.wicket_type === "BOLD") {
                        setInputData({ ...inputData, strikerID: "", ball_action: "", striker_run: "", is_wicket: false, wicket_type: "" })
                    } else if (inputData.wicket_type === "RUNOUT") {
                        setInputData({ ...inputData, strikerID: "", nonStrikerID: "", ball_action: "", striker_run: "", is_wicket: false, wicket_type: "" })
                    } if (inputData.wicket_type === "CATCHOUT") {
                        setInputData({ ...inputData, strikerID: "", ball_action: "", striker_run: "", is_wicket: false, wicket_type: "" })
                    } if (inputData.wicket_type === "STUMPING") {
                        setInputData({ ...inputData, strikerID: "", ball_action: "", striker_run: "", is_wicket: false, wicket_type: "" })
                    } else {
                        const updatedArray = battingTeamPlayers.filter(item => item._id !== inputData.strikerID)
                        console.log("updatedArray", inputData.strikerID, battingTeamPlayers);
                        setBattingTeamPlayers(updatedArray)
                        setInputData({ ...inputData, strikerID: "", ball_action: "", striker_run: "", is_wicket: false, wicket_type: "" })
                    }
                }

                if (inputData.ball_action === "WICKET" && inputData.wicket_type === "RUNOUT") {
                    setInputData({ ...inputData, strikerID: "", nonStrikerID: "", ball_action: "", wicket_type: "" })
                } else if (inputData.ball_action === "WICKET" && inputData.wicket_type !== "RUNOUT") {
                    const updatedArray = battingTeamPlayers.filter(item => item._id !== inputData.strikerID)
                    setBattingTeamPlayers(updatedArray)
                    setInputData({ ...inputData, strikerID: "", ball_action: "", wicket_type: "" })
                }

                if (overChangeIndicator === 5 && inputData.extra_type !== "NO_BALL" && inputData.extra_type !== "WIDE_BALL") {
                    setOverCounter(overCounter + 1)
                    setBallCounter(1)
                    setOverChangeIndicator(0)

                    setInputData({ ...inputData, bollerID: "", ball_action: "", striker_run: "", is_wicket: false, wicket_type: "" })
                }

                setDisplayWicketType(false)
                setDisplayWicketTakenBy(false)
                setDisplayRunForStricker(false)
                setDisplayExtraType(false)
                setDisplayExtraRun(false)
                setSelectedPlayers([])

                // fetchAllData()
            }
        }
    }

    const inningsCompleted = async () => {
        const response = await endInningsPlay(match);
        response?.data?.status ? swal("Good job!", response?.data?.message, "success") : (swal("Congratulations!", "Match Ended Successfully", "success"))
    }

    const endMatch = async () => {
        const response = await endMatchPlay(match);
        response?.data?.status ? swal("Good job!", response?.data?.message, "success") : (swal("Congratulations!", "Match Ended Successfully", "success"))
    }


    const getOverChangeIndicator = async () => {
        const data = {
            "matchID": match
        }
        const response = await fetchAllBallByBall(data)
        if (response && Object.keys(response.data.data).length > 0) {

            //When Page Reloads

            const resData = response.data.data
            const lastBall = resData.length > 0 ? resData[resData.length - 1] : null;



            const lastOver = resData.filter(item => item.over_number === lastBall?.over_number)
            const totalExtraBall = lastOver.filter(item => item.extra_type === "NO_BALL" || item.extra_type === "WIDE_BALL").length
            if (lastBall?.ball_number - totalExtraBall === 6) {
                setBallCounter(1)
                setOverCounter(lastBall?.over_number + 1)
                setOverChangeIndicator(0)
                setInputData({ ...inputData, bollerID: "", strikerID: "" })
            } else {
                setBallCounter(lastBall?.ball_number + 1)
                setOverCounter(lastBall?.over_number)
                setOverChangeIndicator(lastBall?.ball_number - totalExtraBall)
                setInputData({ ...inputData, bollerID: lastBall?.bollerID, strikerID: "" })
            }


            // console.log("L411", lastBall);
        }
    }

    const fetchAllData = async () => {
        const data = {
            "matchID": match
        }
        const response = await fetchAllBallByBall(data)

        if (response && Object.keys(response.data.data).length > 0) {

            //When Page Reloads

            // const resData = response.data.data
            // const lastBall = resData.length > 0 ? resData[resData.length - 1] : null;

            // setBallCounter(lastBall?.ball_number)
            // setOverCounter(lastBall?.over_number)
            // const lastOver = resData.filter(item => item.over_number === lastBall?.over_number)
            // const totalExtraBall = lastOver.filter(item => item.extra_type === "NO_BALL" || item.extra_type === "WIDE_BALL").length
            // setOverChangeIndicator(lastBall?.ball_number - totalExtraBall)
            // setInputData({ ...inputData, bollerID: lastBall?.bollerID, strikerID: lastBall?.strikerID })
            // console.log("L411", lastBall);


            // const uniqueOvers = [...new Set(response.data.data.map(item => item.over_number))]
            // console.log("uniqueOvers", uniqueOvers);

            // Create an object to store groups by name
            const groupsByOver = {};

            // Iterate over the data to populate the groupsByOver object
            response?.data?.data.forEach(item => {
                if (!groupsByOver[item.over_number]) {
                    groupsByOver[item.over_number] = [item];
                } else {
                    groupsByOver[item.over_number].push(item);
                }
            });
            setMatchOvers(groupsByOver)

            // const lastOver=groupsByOver[Object.keys(groupsByOver).length - 1]
            // const lastBall=lastOver[lastOver.length-1]
            // console.log("groupsByOver",lastBall.over_number+1,overChangeIndicator);

            // setOverCounter(Object.keys(groupsByOver).length)
            // console.log("matchOvers", overChangeIndicator, groupsByOver, groupsByOver[Object.keys(groupsByOver).length - 1], Object.keys(groupsByOver).length)
        }
    }

    const fetchMatchPlayers = async () => {
        const data = {
            matchID: match
        }
        const response = await fetchAllMatchTeamPlayers(data)
        // console.log("L419", response.data.data[0]);
        if (response && Object.keys(response.data.data).length > 0) {
            let resData = response.data.data[0];

            // let tossWinnerDecision = arrPlayers[0].teamOne[0]?.tossWinnerdata ? arrPlayers[0].teamOne[0]?.play_by : arrPlayers[0].teamTwo[0]?.play_by
            // if (arrPlayers[0].teamOne[0]?.tossWinnerdata) {
            //     tossWinnerDecision = arrPlayers[0].teamOne[0]?.play_by
            // }
            // alert(tossWinnerDecision)

            // console.log("resData431", resData.teamOnedta[0].playerdta);

            if (resData.tossWinnerTeamID === resData.teamOnedta[0].teamID) {
                if (resData.play_by === "BALL") {
                    setBowlingTeamPlayers(resData.teamOnedta[0].playerdta)
                    setWicketKeeperID(resData.teamOnedta[0].wicket_keeperID)
                    setBattingTeamPlayers(resData.teamTwodta[0].playerdta)
                    setAllBattingPlayers(resData.teamTwodta[0].playerdta)
                } else if (resData.play_by === "BAT") {
                    setBowlingTeamPlayers(resData.teamTwodta[0].playerdta)
                    setWicketKeeperID(resData.teamTwodta[0].wicket_keeperID)
                    setBattingTeamPlayers(resData.teamOnedta[0].playerdta)
                    setAllBattingPlayers(resData.teamOnedta[0].playerdta)
                }
            } else if (resData.tossWinnerTeamID === resData.teamTwodta[0].teamID) {
                if (resData.play_by === "BALL") {
                    setBowlingTeamPlayers(resData.teamTwodta[0].playerdta)
                    setWicketKeeperID(resData.teamTwodta[0].wicket_keeperID)
                    setBattingTeamPlayers(resData.teamOnedta[0].playerdta)
                    setAllBattingPlayers(resData.teamOnedta[0].playerdta)
                } else if (resData.play_by === "BAT") {
                    setBowlingTeamPlayers(resData.teamOnedta[0].playerdta)
                    setWicketKeeperID(resData.teamOnedta[0].wicket_keeperID)
                    setBattingTeamPlayers(resData.teamTwodta[0].playerdta)
                    setAllBattingPlayers(resData.teamTwodta[0].playerdta)
                }
            }

            // if (arrPlayers[0].teamOne[0]?.play_by === "BAT") {
            //     setBowlingTeamPlayers(arrPlayers[0].teamTwo)
            //     setBattingTeamPlayers(arrPlayers[0].teamOne)
            //     setAllBattingPlayers(arrPlayers[0].teamOne)
            // } else if (arrPlayers[0].teamOne[0]?.play_by === "BALL") {
            //     setBowlingTeamPlayers(arrPlayers[0].teamOne)
            //     setBattingTeamPlayers(arrPlayers[0].teamTwo)
            //     setAllBattingPlayers(arrPlayers[0].teamTwo)
            // }

        }
    }

    const fetchAllPlayersData = () => {

        if (Object.keys(bowlingTeamPlayers).length > 0) {

            let arr = bowlingTeamPlayers
                // .filter(item => item.id !== idToRemove)
                .map((item, index) => {
                    return {
                        id: item?._id,
                        name: item?.playerName,
                    }
                })
            setAllPlayers(arr)
        }
    }

    const handleSelectOption = (option) => {
        setSelectedPlayers([...selectedPlayers, option])
    }

    const handleRemoveFromDropdown = (e) => {
        e.preventDefault()
        const newItems = [...selectedPlayers]
        newItems.splice(e.target.name, 1)
        setSelectedPlayers(newItems)
    }

    // console.log("bowlingTeamPlayers", bowlingTeamPlayers);

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
                            <li class="breadcrumb-item">Match</li>
                            <li class="breadcrumb-item active">Over Update</li>
                        </ol>
                    </nav>
                </div>
                <section class="section">
                    <div class="row">
                        <div class="col-lg-12">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Over Details <span>BALL BY BALL</span></h5>

                                    <div class="accordion" id="accordionExample">
                                        <form method="post" class="row g-3">
                                            {
                                                matchOvers && (
                                                    <>
                                                        {
                                                            Object.keys(matchOvers).map((itemOver, oKey) => {
                                                                return (
                                                                    <>
                                                                        {
                                                                            // Object.keys(matchOvers).length - 1 !== oKey && (
                                                                            Object.keys(matchOvers).length > 0 && Object.keys(matchOvers).length - 1 !== oKey && (
                                                                                <>
                                                                                    <div class="accordion-item">
                                                                                        <h2 class="accordion-header" id={`heading${itemOver}`}>
                                                                                            <div class="accordion-button">
                                                                                                <div class="btn btn-primary mb-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${itemOver}`} aria-expanded="true" aria-controls={`collapse${itemOver}`}>
                                                                                                    Over <span class="badge bg-white text-primary">{parseInt(matchOvers[itemOver][0].over_number) + 1}</span>
                                                                                                </div>
                                                                                                <div class="col-md-2">
                                                                                                    {/* <div class="form-floating _mb-3">
                                                                                                        <select class="form-select"
                                                                                                            id="bollerID"
                                                                                                            aria-label="Floating label select example"
                                                                                                            name="bollerID"
                                                                                                            disabled
                                                                                                            style={{
                                                                                                                "--bs-form-select-bg-img": "none"
                                                                                                            }}
                                                                                                        >
                                                                                                            <option selected>Choose player...</option>
                                                                                                            {
                                                                                                                bowlingTeamPlayers
                                                                                                                    // .filter(item => item._id !== inputData.strikerID)
                                                                                                                    .map((item, index) => {
                                                                                                                        return (
                                                                                                                            <>
                                                                                                                                <option value={item?._id} key={index}
                                                                                                                                    selected={item?._id == matchOvers[itemOver][0].bollerID ? true : false}
                                                                                                                                >{item?.playerName}</option>
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    })
                                                                                                            }
                                                                                                        </select>
                                                                                                        <label for="bollerID">Bowler:</label>
                                                                                                    </div> */}
                                                                                                    <div class="form-floating">
                                                                                                        <input
                                                                                                            id="image"
                                                                                                            name="image"
                                                                                                            class="form-control"
                                                                                                            type="text"
                                                                                                            value={matchOvers[itemOver][0].bollerName}
                                                                                                            disabled
                                                                                                        />
                                                                                                        <label for="sportsName">Bowler:</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </h2>

                                                                                        <div id={`collapse${itemOver}`} class="accordion-collapse collapse" aria-labelledby={`heading${itemOver}`} data-bs-parent="#accordionExample">
                                                                                            <div class="accordion-body">

                                                                                                {
                                                                                                    matchOvers[itemOver].map((ball, key) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <div class="row g-3">
                                                                                                                    <div class="col-md-2 no-padding"
                                                                                                                        style={{
                                                                                                                            maxWidth: "68px"
                                                                                                                        }}>
                                                                                                                        <div class="btn btn-info mb-2"
                                                                                                                            style={{
                                                                                                                                //margin: "0px 5px",
                                                                                                                                height: "58px",
                                                                                                                                width: "auto"
                                                                                                                            }}>
                                                                                                                            <span class="badge bg-white text-info"
                                                                                                                                style={{
                                                                                                                                    fontSize: "1.5em",
                                                                                                                                    top: "4px",
                                                                                                                                    borderRadius: "50%"
                                                                                                                                }}>
                                                                                                                                {key + 1}
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div class="col-md-2 no-padding">
                                                                                                                        {/* <div class="form-floating _mb-3">
                                                                                                                            <select class="form-select"
                                                                                                                                id="strikerID"
                                                                                                                                aria-label="Floating label select example"
                                                                                                                                name="strikerID"
                                                                                                                                disabled
                                                                                                                                style={{
                                                                                                                                    "--bs-form-select-bg-img": "none"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <option selected>Choose player...</option>
                                                                                                                                {
                                                                                                                                    allBattingPlayers
                                                                                                                                        // .filter(item => item?._id !== ball.nonStrikerID)
                                                                                                                                        .map((item, index) => {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    <option value={item?._id} key={index}
                                                                                                                                                        selected={item?._id == ball.strikerID ? true : false}
                                                                                                                                                    >{item?.playerName}</option>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        })
                                                                                                                                }
                                                                                                                            </select>
                                                                                                                            <label for="strikerID">Stricker Batsman:</label>
                                                                                                                        </div> */}
                                                                                                                        <div class="form-floating">
                                                                                                                            <input
                                                                                                                                id="image"
                                                                                                                                name="image"
                                                                                                                                class="form-control"
                                                                                                                                type="text"
                                                                                                                                value={ball.strikerName}
                                                                                                                                disabled
                                                                                                                            />
                                                                                                                            <label for="sportsName">Stricker Batsman:</label>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <div class="col-md-1 no-padding">
                                                                                                                        <div class="form-floating _mb-3">
                                                                                                                            <select class="form-select"
                                                                                                                                id="ball_action"
                                                                                                                                aria-label="Floating label select example"
                                                                                                                                name="ball_action"
                                                                                                                                disabled
                                                                                                                                style={{
                                                                                                                                    "--bs-form-select-bg-img": "none"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <option value="" selected>Choose...</option>
                                                                                                                                {
                                                                                                                                    arrBallActions.map((item, index) => {
                                                                                                                                        return (
                                                                                                                                            <>
                                                                                                                                                <option value={item.value} key={index}
                                                                                                                                                    selected={item.value == ball.ball_action ? true : false}
                                                                                                                                                >{item.text}</option>
                                                                                                                                            </>
                                                                                                                                        )
                                                                                                                                    })
                                                                                                                                }
                                                                                                                            </select>
                                                                                                                            <label for="ball_action">Ball Action:</label>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    {
                                                                                                                        ball.striker_run ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-1 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">
                                                                                                                                        <select class="form-select"
                                                                                                                                            id="striker_run"
                                                                                                                                            aria-label="Floating label select example"
                                                                                                                                            name="striker_run"
                                                                                                                                            disabled
                                                                                                                                            style={{
                                                                                                                                                "--bs-form-select-bg-img": "none"
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <option value={0} selected>No run...</option>
                                                                                                                                            {
                                                                                                                                                arrRun.map((item, index) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <option value={item.value} key={index}
                                                                                                                                                                selected={item.value == ball.striker_run ? true : false}
                                                                                                                                                            >{item.text}</option>
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        </select>
                                                                                                                                        <label for="striker_run">Stricker Run:</label>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)
                                                                                                                    }

                                                                                                                    {
                                                                                                                        ball.extra_type ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-2 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">
                                                                                                                                        <select class="form-select"
                                                                                                                                            id="extra_type"
                                                                                                                                            aria-label="Floating label select example"
                                                                                                                                            name="extra_type"
                                                                                                                                            disabled
                                                                                                                                            style={{
                                                                                                                                                "--bs-form-select-bg-img": "none"
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <option selected>Choose action...</option>
                                                                                                                                            {
                                                                                                                                                arrExtraTypes.map((item, index) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <option value={item.value} key={index}
                                                                                                                                                                selected={item.value == ball.extra_type ? true : false}
                                                                                                                                                            >{item.text}</option>
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        </select>
                                                                                                                                        <label for="extra_type">EXTRA TYPE:</label>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)

                                                                                                                    }

                                                                                                                    {
                                                                                                                        ball.extra_run ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-1 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">
                                                                                                                                        <select class="form-select"
                                                                                                                                            id="extra_run"
                                                                                                                                            aria-label="Floating label select example"
                                                                                                                                            name="extra_run"
                                                                                                                                            disabled
                                                                                                                                            style={{
                                                                                                                                                "--bs-form-select-bg-img": "none"
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <option selected>Choose action...</option>
                                                                                                                                            {
                                                                                                                                                [0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <option value={item} key={index}
                                                                                                                                                                selected={item === ball.extra_run ? true : false}
                                                                                                                                                            >{item}</option>
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        </select>
                                                                                                                                        <label for="extra_run">Extra Run:</label>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)
                                                                                                                    }

                                                                                                                    {
                                                                                                                        ball.wicket_type ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-2 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">
                                                                                                                                        <select class="form-select"
                                                                                                                                            id="wicket_type"
                                                                                                                                            aria-label="Floating label select example"
                                                                                                                                            name="wicket_type"
                                                                                                                                            disabled
                                                                                                                                            style={{
                                                                                                                                                "--bs-form-select-bg-img": "none"
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <option value="" selected>Choose...</option>
                                                                                                                                            {
                                                                                                                                                arrWicket.map((item, index) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <option value={item.value} key={index}
                                                                                                                                                                selected={item.value == ball.wicket_type ? true : false}
                                                                                                                                                            >{item.text}</option>
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        </select>
                                                                                                                                        <label for="wicket_type">WICKET TYPE:</label>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)
                                                                                                                    }

                                                                                                                    {
                                                                                                                        ball.wickettakerdta ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-2 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">

                                                                                                                                        {
                                                                                                                                            ball.wickettakerdta?.length > 0 && (
                                                                                                                                                <>

                                                                                                                                                    <ul class="list-group">
                                                                                                                                                        {
                                                                                                                                                            ball.wickettakerdta.map((item, index) => {
                                                                                                                                                                return (
                                                                                                                                                                    <>
                                                                                                                                                                        <li key={index} class="list-group-item d-flex justify-content-between align-items-center" draggable>
                                                                                                                                                                            {item?.playerName}
                                                                                                                                                                        </li>
                                                                                                                                                                    </>
                                                                                                                                                                )
                                                                                                                                                            })
                                                                                                                                                        }
                                                                                                                                                    </ul>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                        {/* <label for="play_by">Decision:</label> */}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)
                                                                                                                    }



                                                                                                                </div>
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        }


                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )

                                            }



                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id={`heading`}>
                                                    <div class="accordion-button">
                                                        <div class="btn btn-primary mb-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse`} aria-expanded="true" aria-controls={`collapse`}>
                                                            Running Over <span class="badge bg-white text-primary">({overChangeIndicator}) {overCounter}.{ballCounter} </span>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <div class="form-floating _mb-3">
                                                                <select class="form-select"
                                                                    id="bollerID"
                                                                    aria-label="Floating label select example"
                                                                    name="bollerID"
                                                                    onChange={(e) => postData(e)}
                                                                    disabled={ballCounter > 0 && overChangeIndicator > 0 ? true : false}
                                                                    style={ballCounter > 0 && overChangeIndicator > 0
                                                                        ? { "--bs-form-select-bg-img": "none" }
                                                                        : {}}

                                                                >
                                                                    <option selected value="">Choose player...</option>
                                                                    {
                                                                        bowlingTeamPlayers
                                                                            // .filter(item => item._id !== inputData.strikerID)
                                                                            .map((item, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <option value={item?._id} key={index}
                                                                                            selected={item?._id === inputData.bollerID ? true : false}
                                                                                        >{item?.playerName}</option>
                                                                                    </>
                                                                                )
                                                                            })
                                                                    }
                                                                </select>
                                                                <label for="bollerID">Bowler:{}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </h2>

                                                <div id={`collapse`} class="accordion-collapse collapse show" aria-labelledby={`heading`} data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">

                                                        {
                                                            matchOvers && overChangeIndicator !== 0 && ballCounter > 0 && (
                                                                <>
                                                                    {
                                                                        Object.keys(matchOvers).map((itemOver, oKey) => {
                                                                            return (
                                                                                <>
                                                                                    {
                                                                                        Object.keys(matchOvers).length - 1 === oKey && (
                                                                                            <>
                                                                                                {
                                                                                                    matchOvers[itemOver].map((ball, key) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <div class="row g-3">
                                                                                                                    <div class="col-md-2 no-padding"
                                                                                                                        style={{
                                                                                                                            maxWidth: "68px"
                                                                                                                        }}>
                                                                                                                        <div class="btn btn-info mb-2"
                                                                                                                            style={{
                                                                                                                                margin: "0px 5px",
                                                                                                                                height: "58px",
                                                                                                                                width: "auto"
                                                                                                                            }}>
                                                                                                                            <span class="badge bg-white text-info"
                                                                                                                                style={{
                                                                                                                                    fontSize: "1.5em",
                                                                                                                                    top: "4px"
                                                                                                                                }}>
                                                                                                                                {key + 1}
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <div class="col-md-2 no-padding">
                                                                                                                        <div class="form-floating _mb-3">
                                                                                                                            <select class="form-select"
                                                                                                                                id="strikerID"
                                                                                                                                aria-label="Floating label select example"
                                                                                                                                name="strikerID"
                                                                                                                                disabled
                                                                                                                                style={{
                                                                                                                                    "--bs-form-select-bg-img": "none"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <option selected>Choose player...</option>
                                                                                                                                {
                                                                                                                                    allBattingPlayers
                                                                                                                                        // .filter(item => item?._id !== ball.nonStrikerID)
                                                                                                                                        .map((item, index) => {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    <option value={item?._id} key={index}
                                                                                                                                                        selected={item?._id == ball.strikerID ? true : false}
                                                                                                                                                    >{item?.playerName}</option>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        })
                                                                                                                                }
                                                                                                                            </select>
                                                                                                                            <label for="strikerID">Stricker Batsman:</label>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <div class="col-md-1 no-padding">
                                                                                                                        <div class="form-floating _mb-3">
                                                                                                                            <select class="form-select"
                                                                                                                                id="ball_action"
                                                                                                                                aria-label="Floating label select example"
                                                                                                                                name="ball_action"
                                                                                                                                disabled
                                                                                                                                style={{
                                                                                                                                    "--bs-form-select-bg-img": "none"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <option value="" selected>Choose...</option>
                                                                                                                                {
                                                                                                                                    arrBallActions.map((item, index) => {
                                                                                                                                        return (
                                                                                                                                            <>
                                                                                                                                                <option value={item.value} key={index}
                                                                                                                                                    selected={item.value == ball.ball_action ? true : false}
                                                                                                                                                >{item.text}</option>
                                                                                                                                            </>
                                                                                                                                        )
                                                                                                                                    })
                                                                                                                                }
                                                                                                                            </select>
                                                                                                                            <label for="ball_action">Ball Action:</label>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    {
                                                                                                                        ball.striker_run ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-1 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">
                                                                                                                                        <select class="form-select"
                                                                                                                                            id="striker_run"
                                                                                                                                            aria-label="Floating label select example"
                                                                                                                                            name="striker_run"
                                                                                                                                            disabled
                                                                                                                                            style={{
                                                                                                                                                "--bs-form-select-bg-img": "none"
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <option value={0} selected>No run...</option>
                                                                                                                                            {
                                                                                                                                                arrRun.map((item, index) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <option value={item.value} key={index}
                                                                                                                                                                selected={item.value == ball.striker_run ? true : false}
                                                                                                                                                            >{item.text}</option>
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        </select>
                                                                                                                                        <label for="striker_run">Stricker Run:</label>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)
                                                                                                                    }

                                                                                                                    {
                                                                                                                        ball.extra_type ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-2 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">
                                                                                                                                        <select class="form-select"
                                                                                                                                            id="extra_type"
                                                                                                                                            aria-label="Floating label select example"
                                                                                                                                            name="extra_type"
                                                                                                                                            disabled
                                                                                                                                            style={{
                                                                                                                                                "--bs-form-select-bg-img": "none"
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <option selected>Choose action...</option>
                                                                                                                                            {
                                                                                                                                                arrExtraTypes.map((item, index) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <option value={item.value} key={index}
                                                                                                                                                                selected={item.value == ball.extra_type ? true : false}
                                                                                                                                                            >{item.text}</option>
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        </select>
                                                                                                                                        <label for="extra_type">EXTRA TYPE:</label>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)

                                                                                                                    }

                                                                                                                    {
                                                                                                                        ball.extra_run ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-1 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">
                                                                                                                                        <select class="form-select"
                                                                                                                                            id="extra_run"
                                                                                                                                            aria-label="Floating label select example"
                                                                                                                                            name="extra_run"
                                                                                                                                            disabled
                                                                                                                                            style={{
                                                                                                                                                "--bs-form-select-bg-img": "none"
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <option selected>Choose action...</option>
                                                                                                                                            {
                                                                                                                                                [0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <option value={item} key={index}
                                                                                                                                                                selected={item === ball.extra_run ? true : false}
                                                                                                                                                            >{item}</option>
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        </select>
                                                                                                                                        <label for="extra_run">Extra Run:</label>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)
                                                                                                                    }

                                                                                                                    {
                                                                                                                        ball.wicket_type ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-2 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">
                                                                                                                                        <select class="form-select"
                                                                                                                                            id="wicket_type"
                                                                                                                                            aria-label="Floating label select example"
                                                                                                                                            name="wicket_type"
                                                                                                                                            disabled
                                                                                                                                            style={{
                                                                                                                                                "--bs-form-select-bg-img": "none"
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <option value="" selected>Choose...</option>
                                                                                                                                            {
                                                                                                                                                arrWicket.map((item, index) => {
                                                                                                                                                    return (
                                                                                                                                                        <>
                                                                                                                                                            <option value={item.value} key={index}
                                                                                                                                                                selected={item.value == ball.wicket_type ? true : false}
                                                                                                                                                            >{item.text}</option>
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        </select>
                                                                                                                                        <label for="wicket_type">WICKET TYPE:</label>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)
                                                                                                                    }

                                                                                                                    {
                                                                                                                        ball.wickettakerdta ? (
                                                                                                                            <>
                                                                                                                                <div class="col-md-2 no-padding">
                                                                                                                                    <div class="form-floating _mb-3">

                                                                                                                                        {
                                                                                                                                            ball.wickettakerdta?.length > 0 && (
                                                                                                                                                <>

                                                                                                                                                    <ul class="list-group">
                                                                                                                                                        {
                                                                                                                                                            ball.wickettakerdta.map((item, index) => {
                                                                                                                                                                return (
                                                                                                                                                                    <>
                                                                                                                                                                        <li key={index} class="list-group-item d-flex justify-content-between align-items-center" draggable>
                                                                                                                                                                            {item?.playerName}
                                                                                                                                                                        </li>
                                                                                                                                                                    </>
                                                                                                                                                                )
                                                                                                                                                            })
                                                                                                                                                        }
                                                                                                                                                    </ul>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                        {/* <label for="play_by">Decision:</label> */}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        ) : (<></>)
                                                                                                                    }



                                                                                                                </div>
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </>
                                                                                        )

                                                                                    }
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                            )



                                                        }



                                                        <div class="row g-3 mt-2">

                                                            <div class="col-md-2 no-padding">
                                                                <div class="form-floating _mb-3">
                                                                    <select class="form-select"
                                                                        id="strikerID"
                                                                        aria-label="Floating label select example"
                                                                        name="strikerID"
                                                                        onChange={(e) => postData(e)}
                                                                        disabled={ballCounter > 0 && overChangeIndicator > 0 && inputData.strikerID ? true : false}
                                                                        style={ballCounter > 0 && overChangeIndicator > 0 && inputData.strikerID
                                                                            ? { "--bs-form-select-bg-img": "none" }
                                                                            : {}}
                                                                    >
                                                                        <option selected>Choose player...</option>
                                                                        {
                                                                            battingTeamPlayers
                                                                                .filter(item => item?._id !== inputData.nonStrikerID)
                                                                                .map((item, index) => {
                                                                                    return (
                                                                                        <>
                                                                                            <option value={item?._id} key={index}
                                                                                                selected={item?._id == inputData.strikerID ? true : false}
                                                                                            >{item?.playerName}</option>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                        }
                                                                    </select>
                                                                    <label for="strikerID">Stricker Batsman:</label>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-2 no-padding">
                                                                <div class="form-floating _mb-3">
                                                                    <select class="form-select"
                                                                        id="nonStrikerID"
                                                                        aria-label="Floating label select example"
                                                                        name="nonStrikerID"
                                                                        onChange={(e) => postData(e)}
                                                                        disabled={ballCounter > 0 && overChangeIndicator > 0 && inputData.nonStrikerID ? true : false}
                                                                        style={ballCounter > 0 && overChangeIndicator > 0 && inputData.nonStrikerID
                                                                            ? { "--bs-form-select-bg-img": "none" }
                                                                            : {}}
                                                                    >
                                                                        <option selected>Choose player...</option>
                                                                        {
                                                                            battingTeamPlayers
                                                                                .filter(item => item?._id !== inputData.strikerID)
                                                                                .map((item, index) => {
                                                                                    return (
                                                                                        <>
                                                                                            <option value={item?._id} key={index}
                                                                                                selected={item?._id == inputData.nonStrikerID ? true : false}
                                                                                            >{item?.playerName}</option>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                        }
                                                                    </select>
                                                                    <label for="nonStrikerID">Non-stricker Batsman:</label>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-1 no-padding">
                                                                <div class="form-floating _mb-3">
                                                                    <select class="form-select"
                                                                        id="ball_action"
                                                                        aria-label="Floating label select example"
                                                                        name="ball_action"
                                                                        onChange={(e) => {
                                                                            postData(e)
                                                                        }}
                                                                    >
                                                                        <option value="" selected>Choose...</option>
                                                                        {
                                                                            arrBallActions.map((item, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <option value={item.value} key={index}
                                                                                            selected={item.value == inputData.ball_action ? true : false}
                                                                                        >{item.text}</option>
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <label for="ball_action">Ball Action:</label>
                                                                </div>
                                                            </div>

                                                            {
                                                                displayExtraType && (
                                                                    <>
                                                                        <div class="col-md-2 no-padding">
                                                                            <div class="form-floating _mb-3">
                                                                                <select class="form-select"
                                                                                    id="extra_type"
                                                                                    aria-label="Floating label select example"
                                                                                    name="extra_type"
                                                                                    onChange={(e) => postData(e)}
                                                                                >
                                                                                    <option selected>Choose action...</option>
                                                                                    {
                                                                                        arrExtraTypes.map((item, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <option value={item.value} key={index}
                                                                                                        selected={item.value == inputData.extra_type ? true : false}
                                                                                                    >{item.text}</option>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                <label for="extra_type">EXTRA TYPE:</label>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }

                                                            {
                                                                displayExtraRun && (
                                                                    <>
                                                                        <div class="col-md-1 no-padding">
                                                                            <div class="form-floating _mb-3">
                                                                                <select class="form-select"
                                                                                    id="extra_run"
                                                                                    aria-label="Floating label select example"
                                                                                    name="extra_run"
                                                                                    onChange={(e) => postData(e)}
                                                                                >
                                                                                    <option selected>Choose action...</option>
                                                                                    {
                                                                                        [0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <option value={item} key={index}
                                                                                                        selected={item === inputData.extra_run ? true : false}
                                                                                                    >{item}</option>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                <label for="extra_run">Extra Run:</label>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }

                                                            {
                                                                displayWicketType && (
                                                                    <>
                                                                        <div class="col-md-2 no-padding">
                                                                            <div class="form-floating _mb-3">
                                                                                <select class="form-select"
                                                                                    id="wicket_type"
                                                                                    aria-label="Floating label select example"
                                                                                    name="wicket_type"
                                                                                    onChange={(e) => postData(e)}
                                                                                >
                                                                                    <option value="" selected>Choose...</option>
                                                                                    {
                                                                                        arrWicket.map((item, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <option value={item.value} key={index}
                                                                                                        selected={item.value == inputData.wicket_type ? true : false}
                                                                                                    >{item.text}</option>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                <label for="wicket_type">WICKET TYPE:</label>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }

                                                            {
                                                                displayWicketTakenBy && (
                                                                    <>
                                                                        <div class="col-md-2 no-padding">
                                                                            <div class="form-floating _mb-3">
                                                                                {
                                                                                    selectedPlayers?.length < 11 && (
                                                                                        <>
                                                                                            <Dropdown label="Wicket taken by" options={allPlayers} onSelect={handleSelectOption} />
                                                                                        </>
                                                                                    )
                                                                                }
                                                                                {
                                                                                    selectedPlayers?.length > 0 && (
                                                                                        <>

                                                                                            <ul class="list-group">
                                                                                                {
                                                                                                    selectedPlayers.map((item, index) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <li key={index} class="list-group-item d-flex justify-content-between align-items-center" draggable>
                                                                                                                    {item.name}
                                                                                                                    <button class="btn btn-outline-danger btn-sm"
                                                                                                                        name={index}
                                                                                                                        onClick={(e) => handleRemoveFromDropdown(e)}
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
                                                                                {/* <label for="play_by">Decision:</label> */}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }

                                                            {
                                                                displayRunForStricker && (
                                                                    <>
                                                                        <div class="col-md-1 no-padding">
                                                                            <div class="form-floating _mb-3">
                                                                                <select class="form-select"
                                                                                    id="striker_run"
                                                                                    aria-label="Floating label select example"
                                                                                    name="striker_run"
                                                                                    onChange={(e) => postData(e)}
                                                                                >
                                                                                    <option value={0} selected>No run...</option>
                                                                                    {
                                                                                        arrRun.map((item, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <option value={item.value} key={index}
                                                                                                        selected={item.value == inputData.striker_run ? true : false}
                                                                                                    >{item.text}</option>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                <label for="striker_run">Stricker Run:</label>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }

                                                            <div class="col-md-2 no-padding">
                                                                <div class="form-floating _mb-3">
                                                                    {
                                                                        editItemID ? (
                                                                            <>

                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <button
                                                                                    type="submit"
                                                                                    class="btn btn-success mb-2"
                                                                                    style={{
                                                                                        margin: "0 5px",
                                                                                        height: "58px"
                                                                                    }}
                                                                                    onClick={submitData}
                                                                                >
                                                                                    Next <span class="badge bg-white text-success">BALL</span>
                                                                                </button>
                                                                            </>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>





                        </div>

                        {/* <div class="col-lg-8">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">List of all Matches</h5>
                                    {
                                        loader ? (<Loader />) : (<DataTable columns={columns} data={filteredData} pagination />)
                                    }
                                </div>
                            </div>

                        </div> */}
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}

export default OverUpdateBallByBall
