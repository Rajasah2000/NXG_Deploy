import React, { useEffect, useState } from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import Footer from "../component/common/Footer";
import { Link, useParams } from "react-router-dom";
import {
  deletePlayer,
  fetchAllBallByBall,
  fetchAllMatch,
  fetchAllMatchTeamPlayers,
  fetchAllPlayer,
  updateBallByBall,
  updatePlayer,
} from "../service/API";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Dropdown from "../component/core/Dropdown";

const OverUpdate = () => {
  const { match } = useParams();
  //  jhdhjfhdjhfjd
  // hhfdjhjfdhjfhdjhfjdhf
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
  };

  const [matchOvers, setMatchOvers] = useState();
  const [matchUpdate, setMatchUpdate] = useState([]);
  const [battingTeamPlayers, setBattingTeamPlayers] = useState([]);
  const [bowlingTeamPlayers, setBowlingTeamPlayers] = useState([]);
  const [ballCounter, setBallCounter] = useState(1);
  const [overCounter, setOverCounter] = useState(0);
  const [overChangeIndicator, setOverChangeIndicator] = useState(0);
  const [displayWicketType, setDisplayWicketType] = useState(false);
  const [displayWicketTakenBy, setDisplayWicketTakenBy] = useState(false);
  const [displayRunForStricker, setDisplayRunForStricker] = useState(false);
  const [displayExtraRun, setDisplayExtraRun] = useState(false);
  const [displayExtraType, setDisplayExtraType] = useState(false);
  const [inputData, setInputData] = useState(initialValues);
  const [dataError, setDataError] = useState({});
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editItemID, setEditItemID] = useState();
  const [loader, setLoader] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [payLoadData, setPayLoadData] = useState();

  const arrBallActions = [
    // {
    //     text: "NO BALL",
    //     value: "no"
    // },
    {
      text: "EXTRA",
      value: "EXTRA",
    },
    {
      text: "DOT BALL",
      value: "DOT",
    },
    // {
    //     text: "BYE RUN",
    //     value: "bye"
    // },
    {
      text: "RUN",
      value: "RUN",
    },
    {
      text: "OUT",
      value: "WICKET",
    },
  ];
  const arrExtraTypes = [
    {
      text: "NO BALL",
      value: "NO_BALL",
    },
    {
      text: "WIDE BALL",
      value: "WIDE_BALL",
    },
    {
      text: "LEG BY",
      value: "LEG_BY",
    },
    {
      text: "BY RUN",
      value: "BY",
    },
  ];
  const arrRun = [
    {
      text: "1",
      value: 1,
    },
    {
      text: "2",
      value: 2,
    },
    {
      text: "3",
      value: 3,
    },
    {
      text: "BOUNDARY",
      value: 4,
    },
    {
      text: "5",
      value: 5,
    },
    {
      text: "SIXER",
      value: 6,
    },
  ];
  const arrWicket = [
    {
      text: "BOWLED OUT",
      value: "BOLD",
    },
    {
      text: "STUMP OUT",
      value: "STUMPING",
    },
    {
      text: "CATCH OUT",
      value: "CATCHOUT",
    },
    {
      text: "RUN OUT",
      value: "RUNOUT",
    },
    {
      text: "LBW",
      value: "LBW",
    },
    {
      text: "HIT WICKET",
      value: "HIT_WICKET",
    },
    {
      text: "TIME OUT",
      value: "TIME_OUT",
    },
  ];

  useEffect(() => {
    fetchMatchPlayers();
    // fetchAllData()
  }, []);

  // if (matchOvers) {
  //     console.log("matchOvers", Object.keys(matchOvers))
  // }

  useEffect(() => {
    fetchAllPlayersData();
  }, [inputData.ball_action]);

  useEffect(() => {
    if (selectedPlayers.length > 0) {
      const arrWicketTakers = selectedPlayers.map((item) => ({
        playerID: item.id,
      }));
      setInputData({ ...inputData, wicket_tackers: arrWicketTakers });
    }
  }, [selectedPlayers]);

  useEffect(() => {
    if (inputData.ball_action === "RUN") {
      const {
        nonStrikerID,
        extra_run,
        extra_type,
        wicket_type,
        wicket_tackers,
        ...payloadData
      } = inputData;
      setPayLoadData(payloadData);
    }
    if (inputData.ball_action === "EXTRA") {
      const { nonStrikerID, wicket_type, wicket_tackers, ...payloadData } =
        inputData;
      setPayLoadData(payloadData);
    }
    if (inputData.ball_action === "DOT") {
      const {
        nonStrikerID,
        extra_type,
        extra_run,
        wicket_type,
        wicket_tackers,
        ...payloadData
      } = inputData;
      setPayLoadData(payloadData);
    }
    if (inputData.ball_action === "WICKET") {
      const { nonStrikerID, extra_type, ...payloadData } = inputData;
      setPayLoadData(payloadData);
    }
  }, [inputData]);

  useEffect(() => {
    console.log("matchOvers", matchOvers);
  }, [matchUpdate]);

  let name, value;
  const postData = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "striker_run" || name === "extra_run") {
      value = parseInt(value);
    }

    setInputData({ ...inputData, [name]: value });

    if (name === "ball_action") {
      setInputData({
        ...inputData,
        over_number: overCounter,
        ball_number: ballCounter,
      });
      if (value === "RUN") {
        setDisplayWicketType(false);
        setDisplayWicketTakenBy(false);
        setDisplayExtraType(false);
        setDisplayRunForStricker(true);
        setDisplayExtraRun(false);
        setInputData({
          ...inputData,
          ball_action: value,
          extra_run: 0,
          over_number: overCounter,
          ball_number: ballCounter,
        });
      } else if (value === "EXTRA") {
        setDisplayWicketType(false);
        setDisplayWicketTakenBy(false);
        setDisplayRunForStricker(false);
        setDisplayExtraType(true);
        setDisplayExtraRun(true);
        setInputData({
          ...inputData,
          ball_action: value,
          over_number: overCounter,
          ball_number: ballCounter,
        });
      } else if (value === "DOT") {
        setDisplayWicketType(false);
        setDisplayWicketTakenBy(false);
        setDisplayRunForStricker(false);
        setDisplayExtraType(false);
        setDisplayExtraRun(false);
        setInputData({
          ...inputData,
          ball_action: value,
          over_number: overCounter,
          ball_number: ballCounter,
        });
      } else if (value === "WICKET") {
        setDisplayWicketType(true);
        setDisplayWicketTakenBy(true);
        setDisplayRunForStricker(true);
        setDisplayExtraType(false);
        setDisplayExtraRun(false);

        setInputData({
          ...inputData,
          ball_action: value,
          is_wicket: true,
          over_number: overCounter,
          ball_number: ballCounter,
        });
      } else {
        setDisplayWicketType(false);
        setDisplayWicketTakenBy(false);
        setDisplayRunForStricker(false);
        setDisplayExtraType(false);
        setDisplayExtraRun(false);
      }
    }
    if (name === "extra_type" && value === "NO_BALL") {
      setDisplayRunForStricker(true);
      setInputData({ ...inputData, extra_run: 1, extra_type: value });
    }
    if (name === "extra_type" && value === "WIDE_BALL") {
      setDisplayRunForStricker(true);
      setInputData({ ...inputData, extra_run: 1, extra_type: value });
    }
    if (name === "extra_type" && value === "LEG_BY") {
      setDisplayRunForStricker(true);
      setInputData({ ...inputData, extra_run: 0, extra_type: value });
    }
    if (name === "extra_type" && value === "BY") {
      setDisplayRunForStricker(true);
      setInputData({ ...inputData, extra_run: 0, extra_type: value });
    }

    if (name === "striker_run" && value === 4) {
      setInputData({ ...inputData, is_boundry: true, striker_run: 4 });
    }
    if (name === "striker_run" && value === 6) {
      setInputData({ ...inputData, is_six: true, striker_run: 6 });
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
  };

  const validateData = () => {
    let error = {};
    if (inputData.leaugeName === "") {
      error.leaugeName = "Please enter leauge name";
    }
    return error;
  };

  const submitData = async (e) => {
    e.preventDefault();

    let ErrorList = validateData();
    setDataError(validateData());
    if (Object.keys(ErrorList).length === 0) {
      // return

      const response = await updateBallByBall(payLoadData);
      // const response = {
      //     data: {
      //         status: true,
      //         message: "Dummy insert"
      //     }
      // }

      if (response?.data?.status) {
        // swal("Good job!", response.data?.message, "success")

        setMatchUpdate([...matchUpdate, inputData]);
        // setInputData(initialValues)
        // fetchAllData()
        // alert(overChangeIndicator)
        // console.log("overChangeIndicator325", overChangeIndicator, inputData);

        //After API Call///////////////
        inputData.extra_type !== "NO_BALL" &&
          inputData.extra_type !== "WIDE_BALL" &&
          setOverChangeIndicator(overChangeIndicator + 1);
        setBallCounter(ballCounter + 1);
        if (
          overChangeIndicator === 5 &&
          inputData.extra_type !== "NO_BALL" &&
          inputData.extra_type !== "WIDE_BALL"
        ) {
          setOverCounter(overCounter + 1);
          setBallCounter(1);
        }
        if (
          inputData.ball_action === "RUN" &&
          (inputData.striker_run === 1 ||
            inputData.striker_run === 3 ||
            inputData.striker_run === 5)
        ) {
          let x = inputData.strikerID;
          let y = inputData.nonStrikerID;
          setInputData({
            ...inputData,
            strikerID: y,
            nonStrikerID: x,
            ball_action: "",
            striker_run: 0,
            extra_run: 0,
            is_boundry: false,
            is_six: false,
            extra_type: "",
            wicket_type: "",
            wicket_tackers: [],
          });
        } else {
          setInputData({
            ...inputData,
            ball_action: "",
            striker_run: 0,
            extra_run: 0,
            is_boundry: false,
            is_six: false,
            extra_type: "",
            wicket_type: "",
            wicket_tackers: [],
          });
        }
        if (inputData.ball_action === "WICKET") {
          if (inputData.wicket_type === "RUNOUT") {
            setInputData({
              ...inputData,
              strikerID: "",
              nonStrikerID: "",
              ball_action: "",
              striker_run: "",
              is_wicket: false,
              wicket_type: "",
            });
          } else {
            const updatedArray = battingTeamPlayers.filter(
              (item) => item.playerdta._id !== inputData.strikerID
            );
            console.log(
              "updatedArray",
              inputData.strikerID,
              battingTeamPlayers
            );
            setBattingTeamPlayers(updatedArray);
            setInputData({
              ...inputData,
              strikerID: "",
              ball_action: "",
              striker_run: "",
              is_wicket: false,
              wicket_type: "",
            });
          }
        }

        if (
          inputData.ball_action === "WICKET" &&
          inputData.wicket_type === "RUNOUT"
        ) {
          setInputData({
            ...inputData,
            strikerID: "",
            nonStrikerID: "",
            ball_action: "",
            wicket_type: "",
          });
        } else if (
          inputData.ball_action === "WICKET" &&
          inputData.wicket_type !== "RUNOUT"
        ) {
          const updatedArray = battingTeamPlayers.filter(
            (item) => item.playerdta._id !== inputData.strikerID
          );
          console.log("updatedArray", inputData.strikerID, battingTeamPlayers);
          setBattingTeamPlayers(updatedArray);
          setInputData({
            ...inputData,
            strikerID: "",
            ball_action: "",
            wicket_type: "",
          });
        }

        setDisplayWicketType(false);
        setDisplayWicketTakenBy(false);
        setDisplayRunForStricker(false);
        setDisplayExtraType(false);
        setDisplayExtraRun(false);
        setSelectedPlayers([]);

        fetchAllData();
      }
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    let ErrorList = validateData();
    setDataError(validateData());
    if (Object.keys(ErrorList).length === 0) {
      const response = await updatePlayer(editItemID, inputData);

      setInputData(initialValues);
      // fetchAllData()
      response.data.status
        ? swal("Good job!", response.data?.message, "success")
        : swal("Error", response.message, "error");
    }
  };

  // const onEdit = (item) => {
  //     // console.log("L199", item);
  //     setInputData(
  //         {
  //             playerName: item?.playerName,
  //             sportsID: item?.sportsID,
  //             playerTagID: item?.playerTagID,
  //             nationality: item?.nationality,
  //             countryID: item?.countryID,
  //             dateoFbirth: item?.dateoFbirth,
  //             sportsWisePositionID: item?.sportsWisePositionID,
  //         }
  //     )

  //     setEditItemID(item._id)
  // }

  const deleteData = async (id) => {
    const response = await deletePlayer(id);
    // console.log("L212", response)
    if (response.data.status) {
      swal("Good job!", response.data?.message, "success");
      setInputData(initialValues);
      // fetchAllData()
    } else {
      swal("Error", response.data?.message, "error");
    }
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
        deleteData(id);
      }
    });
  };

  const fetchAllData = async () => {
    // setLoader(true)
    const data = {
      matchID: match,
    };
    const response = await fetchAllBallByBall(data);
    if (response && Object.keys(response.data.data).length > 0) {
      // setLoader(false)
      console.log("L440", response?.data?.data);
      const uniqueOvers = [
        ...new Set(response.data.data.map((item) => item.over_number)),
      ];
      // console.log("uniqueOvers", uniqueOvers);

      // Create an object to store groups by name
      const groupsByOver = {};

      // Iterate over the data to populate the groupsByOver object
      response?.data?.data.forEach((item) => {
        if (!groupsByOver[item.over_number]) {
          groupsByOver[item.over_number] = [item];
        } else {
          groupsByOver[item.over_number].push(item);
        }
      });
      setMatchOvers(groupsByOver);
      console.log("matchOvers", groupsByOver);

      // console.log("uniqueOvers", groupsByOver[uniqueOvers.length - 1][uniqueOvers.length - 1].bollerID)
      // setInputData({ ...inputData, bollerID: groupsByOver[uniqueOvers.length - 1][uniqueOvers.length - 1].bollerID, strikerID: groupsByOver[uniqueOvers.length - 1][uniqueOvers.length - 1].strikerID, ball_action: "", striker_run: 0, extra_run: 0, is_boundry: false, is_six: false, extra_type: "", wicket_type: "", wicket_tackers: [] });
      // if(groupsByOver[uniqueOvers.length - 1][uniqueOvers.length].striker_run===1){
      //     setInputData({ ...inputData, nonStrikerID: groupsByOver[uniqueOvers.length - 1][uniqueOvers.length].strikerID});
      // }
      setInputData({
        ...inputData,
        bollerID:
          groupsByOver[uniqueOvers.length - 1][uniqueOvers.length - 1].bollerID,
        ball_action: "",
        striker_run: 0,
        extra_run: 0,
        is_boundry: false,
        is_six: false,
        extra_type: "",
        wicket_type: "",
        wicket_tackers: [],
      });
      // setBallCounter(groupsByOver[uniqueOvers.length - 1][uniqueOvers.length+1].ball_number + 1)
      // console.log("overChangeIndicator",overChangeIndicator);
      if (overChangeIndicator === 5) {
        // console.log("AS467", inputData.ball_action,groupsByOver[uniqueOvers.length - 1][uniqueOvers.length - 1].over_number,groupsByOver)
        setBallCounter(0);
        setOverChangeIndicator(1);
        setOverCounter(
          groupsByOver[uniqueOvers.length - 1][uniqueOvers.length - 1]
            .over_number + 1
        );
      } else {
        setBallCounter(response?.data?.data.length + 1);
        setOverCounter(
          groupsByOver[uniqueOvers.length - 1][uniqueOvers.length - 1]
            .over_number
        );
      }
      // setMatchOvers(groupsByOver)
    }
  };

  const fetchMatchPlayers = async () => {
    const data = {
      matchID: match,
    };
    const response = await fetchAllMatchTeamPlayers(data);
    // console.log("L237", response);
    if (response && Object.keys(response.data.data).length > 0) {
      let arrPlayers = response.data.data;

      if (arrPlayers[0].teamOne[0]?.play_by) {
        if (arrPlayers[0].teamOne[0]?.play_by === "BALL") {
          setBowlingTeamPlayers(arrPlayers[0].teamOne);
          setBattingTeamPlayers(arrPlayers[0].teamTwo);
        } else {
          setBowlingTeamPlayers(arrPlayers[0].teamTwo);
          setBattingTeamPlayers(arrPlayers[0].teamOne);
        }
      } else {
        if (arrPlayers[0].teamTwo[0]?.play_by === "BALL") {
          setBowlingTeamPlayers(arrPlayers[0].teamTwo);
          setBattingTeamPlayers(arrPlayers[0].teamOne);
        } else {
          setBowlingTeamPlayers(arrPlayers[0].teamOne);
          setBattingTeamPlayers(arrPlayers[0].teamTwo);
        }
      }
    }
  };

  const fetchAllPlayersData = () => {
    if (Object.keys(bowlingTeamPlayers).length > 0) {
      let arr = bowlingTeamPlayers
        // .filter(item => item.id !== idToRemove)
        .map((item, index) => {
          return {
            id: item?.playerdta?._id,
            name: item?.playerdta?.playerName,
          };
        });
      setAllPlayers(arr);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedPlayers([...selectedPlayers, option]);
  };

  const handleRemoveFromDropdown = (e) => {
    e.preventDefault();
    console.log("L460", e.target.name);
    const newItems = [...selectedPlayers]; // Create a copy of the original array
    newItems.splice(e.target.name, 1); // Remove the item at indexToRemove
    setSelectedPlayers(newItems); // Update state with the modified array
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Match management</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item">Match</li>
              <li class="breadcrumb-item active">Manage</li>
            </ol>
          </nav>
        </div>
        <section class="section">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Over Update {overChangeIndicator}</h5>

                  <div class="accordion" id="accordionExample">
                    <form method="post" class="row g-3">
                      {matchOvers && (
                        <>
                          {Object.keys(matchOvers).map((itemOver, oKey) => {
                            return (
                              <>
                                {Object.keys(matchOvers).length - 1 !==
                                  oKey && (
                                  <>
                                    <div class="accordion-item">
                                      <h2
                                        class="accordion-header"
                                        id={`heading${itemOver}`}
                                      >
                                        <div class="accordion-button">
                                          <div
                                            class="btn btn-primary mb-2"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${itemOver}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse${itemOver}`}
                                          >
                                            Over{" "}
                                            <span class="badge bg-white text-primary">
                                              {parseInt(
                                                matchOvers[itemOver][0]
                                                  .over_number
                                              ) + 1}
                                            </span>
                                          </div>
                                          <div class="col-md-2">
                                            <div class="form-floating _mb-3">
                                              <select
                                                class="form-select"
                                                id="bollerID"
                                                aria-label="Floating label select example"
                                                name="bollerID"
                                                disabled
                                              >
                                                <option selected>
                                                  Choose player...
                                                </option>
                                                {bowlingTeamPlayers
                                                  // .filter(item => item._id !== inputData.strikerID)
                                                  .map((item, index) => {
                                                    return (
                                                      <>
                                                        <option
                                                          value={
                                                            item.playerdta?._id
                                                          }
                                                          key={index}
                                                          selected={
                                                            item.playerdta
                                                              ?._id ==
                                                            matchOvers[
                                                              itemOver
                                                            ][0].bollerID
                                                              ? true
                                                              : false
                                                          }
                                                        >
                                                          {
                                                            item.playerdta
                                                              ?.playerName
                                                          }
                                                        </option>
                                                      </>
                                                    );
                                                  })}
                                              </select>
                                              <label for="bollerID">
                                                Bowler:
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </h2>

                                      <div
                                        id={`collapse${itemOver}`}
                                        class="accordion-collapse collapse"
                                        aria-labelledby={`heading${itemOver}`}
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div class="accordion-body">
                                          {matchOvers[itemOver].map(
                                            (ball, key) => {
                                              return (
                                                <>
                                                  <div class="row g-3">
                                                    <div class="col-md-2 no-padding">
                                                      <div class="form-floating _mb-3">
                                                        <select
                                                          class="form-select"
                                                          id="strikerID"
                                                          aria-label="Floating label select example"
                                                          name="strikerID"
                                                          disabled
                                                        >
                                                          <option selected>
                                                            Choose player...
                                                          </option>
                                                          {battingTeamPlayers
                                                            .filter(
                                                              (item) =>
                                                                item.playerdta
                                                                  ?._id !==
                                                                ball.nonStrikerID
                                                            )
                                                            .map(
                                                              (item, index) => {
                                                                return (
                                                                  <>
                                                                    <option
                                                                      value={
                                                                        item
                                                                          .playerdta
                                                                          ?._id
                                                                      }
                                                                      key={
                                                                        index
                                                                      }
                                                                      selected={
                                                                        item
                                                                          .playerdta
                                                                          ?._id ==
                                                                        ball.strikerID
                                                                          ? true
                                                                          : false
                                                                      }
                                                                    >
                                                                      {
                                                                        item
                                                                          .playerdta
                                                                          ?.playerName
                                                                      }
                                                                    </option>
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                        </select>
                                                        <label for="strikerID">
                                                          Stricker Batsman:
                                                        </label>
                                                      </div>
                                                    </div>

                                                    <div class="col-md-1 no-padding">
                                                      <div class="form-floating _mb-3">
                                                        <select
                                                          class="form-select"
                                                          id="ball_action"
                                                          aria-label="Floating label select example"
                                                          name="ball_action"
                                                          disabled
                                                        >
                                                          <option
                                                            value=""
                                                            selected
                                                          >
                                                            Choose...
                                                          </option>
                                                          {arrBallActions.map(
                                                            (item, index) => {
                                                              return (
                                                                <>
                                                                  <option
                                                                    value={
                                                                      item.value
                                                                    }
                                                                    key={index}
                                                                    selected={
                                                                      item.value ==
                                                                      ball.ball_action
                                                                        ? true
                                                                        : false
                                                                    }
                                                                  >
                                                                    {item.text}
                                                                  </option>
                                                                </>
                                                              );
                                                            }
                                                          )}
                                                        </select>
                                                        <label for="ball_action">
                                                          Ball Action:
                                                        </label>
                                                      </div>
                                                    </div>

                                                    {ball.striker_run ? (
                                                      <>
                                                        <div class="col-md-1 no-padding">
                                                          <div class="form-floating _mb-3">
                                                            <select
                                                              class="form-select"
                                                              id="striker_run"
                                                              aria-label="Floating label select example"
                                                              name="striker_run"
                                                              disabled
                                                            >
                                                              <option
                                                                value={0}
                                                                selected
                                                              >
                                                                No run...
                                                              </option>
                                                              {arrRun.map(
                                                                (
                                                                  item,
                                                                  index
                                                                ) => {
                                                                  return (
                                                                    <>
                                                                      <option
                                                                        value={
                                                                          item.value
                                                                        }
                                                                        key={
                                                                          index
                                                                        }
                                                                        selected={
                                                                          item.value ==
                                                                          ball.striker_run
                                                                            ? true
                                                                            : false
                                                                        }
                                                                      >
                                                                        {
                                                                          item.text
                                                                        }
                                                                      </option>
                                                                    </>
                                                                  );
                                                                }
                                                              )}
                                                            </select>
                                                            <label for="striker_run">
                                                              Stricker Run:
                                                            </label>
                                                          </div>
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}

                                                    {ball.extra_type ? (
                                                      <>
                                                        <div class="col-md-2 no-padding">
                                                          <div class="form-floating _mb-3">
                                                            <select
                                                              class="form-select"
                                                              id="extra_type"
                                                              aria-label="Floating label select example"
                                                              name="extra_type"
                                                              disabled
                                                            >
                                                              <option selected>
                                                                Choose action...
                                                              </option>
                                                              {arrExtraTypes.map(
                                                                (
                                                                  item,
                                                                  index
                                                                ) => {
                                                                  return (
                                                                    <>
                                                                      <option
                                                                        value={
                                                                          item.value
                                                                        }
                                                                        key={
                                                                          index
                                                                        }
                                                                        selected={
                                                                          item.value ==
                                                                          ball.extra_type
                                                                            ? true
                                                                            : false
                                                                        }
                                                                      >
                                                                        {
                                                                          item.text
                                                                        }
                                                                      </option>
                                                                    </>
                                                                  );
                                                                }
                                                              )}
                                                            </select>
                                                            <label for="extra_type">
                                                              EXTRA TYPE:
                                                            </label>
                                                          </div>
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}

                                                    {ball.extra_run ? (
                                                      <>
                                                        <div class="col-md-1 no-padding">
                                                          <div class="form-floating _mb-3">
                                                            <select
                                                              class="form-select"
                                                              id="extra_run"
                                                              aria-label="Floating label select example"
                                                              name="extra_run"
                                                              disabled
                                                            >
                                                              <option selected>
                                                                Choose action...
                                                              </option>
                                                              {[
                                                                0, 1, 2, 3, 4,
                                                                5, 6, 7,
                                                              ].map(
                                                                (
                                                                  item,
                                                                  index
                                                                ) => {
                                                                  return (
                                                                    <>
                                                                      <option
                                                                        value={
                                                                          item
                                                                        }
                                                                        key={
                                                                          index
                                                                        }
                                                                        selected={
                                                                          item ===
                                                                          ball.extra_run
                                                                            ? true
                                                                            : false
                                                                        }
                                                                      >
                                                                        {item}
                                                                      </option>
                                                                    </>
                                                                  );
                                                                }
                                                              )}
                                                            </select>
                                                            <label for="extra_run">
                                                              Extra Run:
                                                            </label>
                                                          </div>
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}

                                                    {ball.wicket_type ? (
                                                      <>
                                                        <div class="col-md-2 no-padding">
                                                          <div class="form-floating _mb-3">
                                                            <select
                                                              class="form-select"
                                                              id="wicket_type"
                                                              aria-label="Floating label select example"
                                                              name="wicket_type"
                                                              disabled
                                                            >
                                                              <option
                                                                value=""
                                                                selected
                                                              >
                                                                Choose...
                                                              </option>
                                                              {arrWicket.map(
                                                                (
                                                                  item,
                                                                  index
                                                                ) => {
                                                                  return (
                                                                    <>
                                                                      <option
                                                                        value={
                                                                          item.value
                                                                        }
                                                                        key={
                                                                          index
                                                                        }
                                                                        selected={
                                                                          item.value ==
                                                                          ball.wicket_type
                                                                            ? true
                                                                            : false
                                                                        }
                                                                      >
                                                                        {
                                                                          item.text
                                                                        }
                                                                      </option>
                                                                    </>
                                                                  );
                                                                }
                                                              )}
                                                            </select>
                                                            <label for="wicket_type">
                                                              WICKET TYPE:
                                                            </label>
                                                          </div>
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}

                                                    {ball.wicket_tackers ? (
                                                      <>
                                                        <div class="col-md-2 no-padding">
                                                          <div class="form-floating _mb-3">
                                                            {ball.wicket_tackers
                                                              ?.length > 0 && (
                                                              <>
                                                                <ul class="list-group">
                                                                  {ball.wicket_tackers.map(
                                                                    (
                                                                      item,
                                                                      index
                                                                    ) => {
                                                                      return (
                                                                        <>
                                                                          <li
                                                                            key={
                                                                              index
                                                                            }
                                                                            class="list-group-item d-flex justify-content-between align-items-center"
                                                                            draggable
                                                                          >
                                                                            {
                                                                              item?.playerID
                                                                            }
                                                                          </li>
                                                                        </>
                                                                      );
                                                                    }
                                                                  )}
                                                                </ul>
                                                              </>
                                                            )}
                                                            {/* <label for="play_by">Decision:</label> */}
                                                          </div>
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </div>
                                                </>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            );
                          })}
                        </>
                      )}

                      <div class="accordion-item">
                        <h2 class="accordion-header" id={`heading`}>
                          <div class="accordion-button">
                            <div
                              class="btn btn-primary mb-2"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse`}
                              aria-expanded="true"
                              aria-controls={`collapse`}
                            >
                              Over{" "}
                              <span class="badge bg-white text-primary">
                                {overCounter}.{ballCounter}{" "}
                              </span>
                            </div>
                            <div class="col-md-2">
                              <div class="form-floating _mb-3">
                                <select
                                  class="form-select"
                                  id="bollerID"
                                  aria-label="Floating label select example"
                                  name="bollerID"
                                  onChange={(e) => postData(e)}
                                >
                                  <option selected>Choose player...</option>
                                  {bowlingTeamPlayers
                                    // .filter(item => item._id !== inputData.strikerID)
                                    .map((item, index) => {
                                      return (
                                        <>
                                          <option
                                            value={item.playerdta?._id}
                                            key={index}
                                            selected={
                                              item.playerdta?._id ==
                                              inputData.bollerID
                                                ? true
                                                : false
                                            }
                                          >
                                            {item.playerdta?.playerName}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                                <label for="bollerID">Bowler:</label>
                              </div>
                            </div>
                          </div>
                        </h2>

                        <div
                          id={`collapse`}
                          class="accordion-collapse collapse show"
                          aria-labelledby={`heading`}
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            {matchOvers && (
                              <>
                                {Object.keys(matchOvers).map(
                                  (itemOver, oKey) => {
                                    return (
                                      <>
                                        {Object.keys(matchOvers).length - 1 ===
                                          oKey && (
                                          <>
                                            {matchOvers[itemOver].map(
                                              (ball, key) => {
                                                return (
                                                  <>
                                                    <div class="row g-3">
                                                      <div class="col-md-2 no-padding">
                                                        <div class="form-floating _mb-3">
                                                          <select
                                                            class="form-select"
                                                            id="strikerID"
                                                            aria-label="Floating label select example"
                                                            name="strikerID"
                                                            disabled
                                                          >
                                                            <option selected>
                                                              Choose player...
                                                            </option>
                                                            {battingTeamPlayers
                                                              .filter(
                                                                (item) =>
                                                                  item.playerdta
                                                                    ?._id !==
                                                                  ball.nonStrikerID
                                                              )
                                                              .map(
                                                                (
                                                                  item,
                                                                  index
                                                                ) => {
                                                                  return (
                                                                    <>
                                                                      <option
                                                                        value={
                                                                          item
                                                                            .playerdta
                                                                            ?._id
                                                                        }
                                                                        key={
                                                                          index
                                                                        }
                                                                        selected={
                                                                          item
                                                                            .playerdta
                                                                            ?._id ==
                                                                          ball.strikerID
                                                                            ? true
                                                                            : false
                                                                        }
                                                                      >
                                                                        {
                                                                          item
                                                                            .playerdta
                                                                            ?.playerName
                                                                        }
                                                                      </option>
                                                                    </>
                                                                  );
                                                                }
                                                              )}
                                                          </select>
                                                          <label for="strikerID">
                                                            Stricker Batsman:
                                                          </label>
                                                        </div>
                                                      </div>

                                                      <div class="col-md-1 no-padding">
                                                        <div class="form-floating _mb-3">
                                                          <select
                                                            class="form-select"
                                                            id="ball_action"
                                                            aria-label="Floating label select example"
                                                            name="ball_action"
                                                            disabled
                                                          >
                                                            <option
                                                              value=""
                                                              selected
                                                            >
                                                              Choose...
                                                            </option>
                                                            {arrBallActions.map(
                                                              (item, index) => {
                                                                return (
                                                                  <>
                                                                    <option
                                                                      value={
                                                                        item.value
                                                                      }
                                                                      key={
                                                                        index
                                                                      }
                                                                      selected={
                                                                        item.value ==
                                                                        ball.ball_action
                                                                          ? true
                                                                          : false
                                                                      }
                                                                    >
                                                                      {
                                                                        item.text
                                                                      }
                                                                    </option>
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                          </select>
                                                          <label for="ball_action">
                                                            Ball Action:
                                                          </label>
                                                        </div>
                                                      </div>

                                                      {ball.striker_run ? (
                                                        <>
                                                          <div class="col-md-1 no-padding">
                                                            <div class="form-floating _mb-3">
                                                              <select
                                                                class="form-select"
                                                                id="striker_run"
                                                                aria-label="Floating label select example"
                                                                name="striker_run"
                                                                disabled
                                                              >
                                                                <option
                                                                  value={0}
                                                                  selected
                                                                >
                                                                  No run...
                                                                </option>
                                                                {arrRun.map(
                                                                  (
                                                                    item,
                                                                    index
                                                                  ) => {
                                                                    return (
                                                                      <>
                                                                        <option
                                                                          value={
                                                                            item.value
                                                                          }
                                                                          key={
                                                                            index
                                                                          }
                                                                          selected={
                                                                            item.value ==
                                                                            ball.striker_run
                                                                              ? true
                                                                              : false
                                                                          }
                                                                        >
                                                                          {
                                                                            item.text
                                                                          }
                                                                        </option>
                                                                      </>
                                                                    );
                                                                  }
                                                                )}
                                                              </select>
                                                              <label for="striker_run">
                                                                Stricker Run:
                                                              </label>
                                                            </div>
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}

                                                      {ball.extra_type ? (
                                                        <>
                                                          <div class="col-md-2 no-padding">
                                                            <div class="form-floating _mb-3">
                                                              <select
                                                                class="form-select"
                                                                id="extra_type"
                                                                aria-label="Floating label select example"
                                                                name="extra_type"
                                                                disabled
                                                              >
                                                                <option
                                                                  selected
                                                                >
                                                                  Choose
                                                                  action...
                                                                </option>
                                                                {arrExtraTypes.map(
                                                                  (
                                                                    item,
                                                                    index
                                                                  ) => {
                                                                    return (
                                                                      <>
                                                                        <option
                                                                          value={
                                                                            item.value
                                                                          }
                                                                          key={
                                                                            index
                                                                          }
                                                                          selected={
                                                                            item.value ==
                                                                            ball.extra_type
                                                                              ? true
                                                                              : false
                                                                          }
                                                                        >
                                                                          {
                                                                            item.text
                                                                          }
                                                                        </option>
                                                                      </>
                                                                    );
                                                                  }
                                                                )}
                                                              </select>
                                                              <label for="extra_type">
                                                                EXTRA TYPE:
                                                              </label>
                                                            </div>
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}

                                                      {ball.extra_run ? (
                                                        <>
                                                          <div class="col-md-1 no-padding">
                                                            <div class="form-floating _mb-3">
                                                              <select
                                                                class="form-select"
                                                                id="extra_run"
                                                                aria-label="Floating label select example"
                                                                name="extra_run"
                                                                disabled
                                                              >
                                                                <option
                                                                  selected
                                                                >
                                                                  Choose
                                                                  action...
                                                                </option>
                                                                {[
                                                                  0, 1, 2, 3, 4,
                                                                  5, 6, 7,
                                                                ].map(
                                                                  (
                                                                    item,
                                                                    index
                                                                  ) => {
                                                                    return (
                                                                      <>
                                                                        <option
                                                                          value={
                                                                            item
                                                                          }
                                                                          key={
                                                                            index
                                                                          }
                                                                          selected={
                                                                            item ===
                                                                            ball.extra_run
                                                                              ? true
                                                                              : false
                                                                          }
                                                                        >
                                                                          {item}
                                                                        </option>
                                                                      </>
                                                                    );
                                                                  }
                                                                )}
                                                              </select>
                                                              <label for="extra_run">
                                                                Extra Run:
                                                              </label>
                                                            </div>
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}

                                                      {ball.wicket_type ? (
                                                        <>
                                                          <div class="col-md-2 no-padding">
                                                            <div class="form-floating _mb-3">
                                                              <select
                                                                class="form-select"
                                                                id="wicket_type"
                                                                aria-label="Floating label select example"
                                                                name="wicket_type"
                                                                disabled
                                                              >
                                                                <option
                                                                  value=""
                                                                  selected
                                                                >
                                                                  Choose...
                                                                </option>
                                                                {arrWicket.map(
                                                                  (
                                                                    item,
                                                                    index
                                                                  ) => {
                                                                    return (
                                                                      <>
                                                                        <option
                                                                          value={
                                                                            item.value
                                                                          }
                                                                          key={
                                                                            index
                                                                          }
                                                                          selected={
                                                                            item.value ==
                                                                            ball.wicket_type
                                                                              ? true
                                                                              : false
                                                                          }
                                                                        >
                                                                          {
                                                                            item.text
                                                                          }
                                                                        </option>
                                                                      </>
                                                                    );
                                                                  }
                                                                )}
                                                              </select>
                                                              <label for="wicket_type">
                                                                WICKET TYPE:
                                                              </label>
                                                            </div>
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}

                                                      {ball.wicket_tackers ? (
                                                        <>
                                                          <div class="col-md-2 no-padding">
                                                            <div class="form-floating _mb-3">
                                                              {ball
                                                                .wicket_tackers
                                                                ?.length >
                                                                0 && (
                                                                <>
                                                                  <ul class="list-group">
                                                                    {ball.wicket_tackers.map(
                                                                      (
                                                                        item,
                                                                        index
                                                                      ) => {
                                                                        return (
                                                                          <>
                                                                            <li
                                                                              key={
                                                                                index
                                                                              }
                                                                              class="list-group-item d-flex justify-content-between align-items-center"
                                                                              draggable
                                                                            >
                                                                              {
                                                                                item?.playerID
                                                                              }
                                                                            </li>
                                                                          </>
                                                                        );
                                                                      }
                                                                    )}
                                                                  </ul>
                                                                </>
                                                              )}
                                                              {/* <label for="play_by">Decision:</label> */}
                                                            </div>
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </div>
                                                  </>
                                                );
                                              }
                                            )}
                                          </>
                                        )}
                                      </>
                                    );
                                  }
                                )}
                              </>
                            )}

                            <div class="row g-3 mt-2">
                              <div class="col-md-2 no-padding">
                                <div class="form-floating _mb-3">
                                  <select
                                    class="form-select"
                                    id="strikerID"
                                    aria-label="Floating label select example"
                                    name="strikerID"
                                    onChange={(e) => postData(e)}
                                  >
                                    <option selected>Choose player...</option>
                                    {battingTeamPlayers
                                      .filter(
                                        (item) =>
                                          item.playerdta?._id !==
                                          inputData.nonStrikerID
                                      )
                                      .map((item, index) => {
                                        return (
                                          <>
                                            <option
                                              value={item.playerdta?._id}
                                              key={index}
                                              selected={
                                                item.playerdta?._id ==
                                                inputData.strikerID
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {item.playerdta?.playerName}
                                            </option>
                                          </>
                                        );
                                      })}
                                  </select>
                                  <label for="strikerID">
                                    Stricker Batsman:
                                  </label>
                                </div>
                              </div>

                              <div class="col-md-2 no-padding">
                                <div class="form-floating _mb-3">
                                  <select
                                    class="form-select"
                                    id="nonStrikerID"
                                    aria-label="Floating label select example"
                                    name="nonStrikerID"
                                    onChange={(e) => postData(e)}
                                  >
                                    <option selected>Choose player...</option>
                                    {battingTeamPlayers
                                      .filter(
                                        (item) =>
                                          item.playerdta?._id !==
                                          inputData.strikerID
                                      )
                                      .map((item, index) => {
                                        return (
                                          <>
                                            <option
                                              value={item.playerdta?._id}
                                              key={index}
                                              selected={
                                                item.playerdta?._id ==
                                                inputData.nonStrikerID
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {item.playerdta?.playerName}
                                            </option>
                                          </>
                                        );
                                      })}
                                  </select>
                                  <label for="nonStrikerID">
                                    Non-stricker Batsman:
                                  </label>
                                </div>
                              </div>

                              <div class="col-md-1 no-padding">
                                <div class="form-floating _mb-3">
                                  <select
                                    class="form-select"
                                    id="ball_action"
                                    aria-label="Floating label select example"
                                    name="ball_action"
                                    onChange={(e) => {
                                      postData(e);
                                    }}
                                  >
                                    <option value="" selected>
                                      Choose...
                                    </option>
                                    {arrBallActions.map((item, index) => {
                                      return (
                                        <>
                                          <option
                                            value={item.value}
                                            key={index}
                                            selected={
                                              item.value ==
                                              inputData.ball_action
                                                ? true
                                                : false
                                            }
                                          >
                                            {item.text}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </select>
                                  <label for="ball_action">Ball Action:</label>
                                </div>
                              </div>

                              {displayExtraType && (
                                <>
                                  <div class="col-md-2 no-padding">
                                    <div class="form-floating _mb-3">
                                      <select
                                        class="form-select"
                                        id="extra_type"
                                        aria-label="Floating label select example"
                                        name="extra_type"
                                        onChange={(e) => postData(e)}
                                      >
                                        <option selected>
                                          Choose action...
                                        </option>
                                        {arrExtraTypes.map((item, index) => {
                                          return (
                                            <>
                                              <option
                                                value={item.value}
                                                key={index}
                                                selected={
                                                  item.value ==
                                                  inputData.extra_type
                                                    ? true
                                                    : false
                                                }
                                              >
                                                {item.text}
                                              </option>
                                            </>
                                          );
                                        })}
                                      </select>
                                      <label for="extra_type">
                                        EXTRA TYPE:
                                      </label>
                                    </div>
                                  </div>
                                </>
                              )}

                              {displayExtraRun && (
                                <>
                                  <div class="col-md-1 no-padding">
                                    <div class="form-floating _mb-3">
                                      <select
                                        class="form-select"
                                        id="extra_run"
                                        aria-label="Floating label select example"
                                        name="extra_run"
                                        onChange={(e) => postData(e)}
                                      >
                                        <option selected>
                                          Choose action...
                                        </option>
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map(
                                          (item, index) => {
                                            return (
                                              <>
                                                <option
                                                  value={item}
                                                  key={index}
                                                  selected={
                                                    item === inputData.extra_run
                                                      ? true
                                                      : false
                                                  }
                                                >
                                                  {item}
                                                </option>
                                              </>
                                            );
                                          }
                                        )}
                                      </select>
                                      <label for="extra_run">Extra Run:</label>
                                    </div>
                                  </div>
                                </>
                              )}

                              {displayWicketType && (
                                <>
                                  <div class="col-md-2 no-padding">
                                    <div class="form-floating _mb-3">
                                      <select
                                        class="form-select"
                                        id="wicket_type"
                                        aria-label="Floating label select example"
                                        name="wicket_type"
                                        onChange={(e) => postData(e)}
                                      >
                                        <option value="" selected>
                                          Choose...
                                        </option>
                                        {arrWicket.map((item, index) => {
                                          return (
                                            <>
                                              <option
                                                value={item.value}
                                                key={index}
                                                selected={
                                                  item.value ==
                                                  inputData.wicket_type
                                                    ? true
                                                    : false
                                                }
                                              >
                                                {item.text}
                                              </option>
                                            </>
                                          );
                                        })}
                                      </select>
                                      <label for="wicket_type">
                                        WICKET TYPE:
                                      </label>
                                    </div>
                                  </div>
                                </>
                              )}

                              {displayWicketTakenBy && (
                                <>
                                  <div class="col-md-2 no-padding">
                                    <div class="form-floating _mb-3">
                                      {selectedPlayers?.length < 11 && (
                                        <>
                                          <Dropdown
                                            label="Wicket taken by"
                                            options={allPlayers}
                                            onSelect={handleSelectOption}
                                          />
                                        </>
                                      )}
                                      {selectedPlayers?.length > 0 && (
                                        <>
                                          <ul class="list-group">
                                            {selectedPlayers.map(
                                              (item, index) => {
                                                return (
                                                  <>
                                                    <li
                                                      key={index}
                                                      class="list-group-item d-flex justify-content-between align-items-center"
                                                      draggable
                                                    >
                                                      {item.name}
                                                      <button
                                                        class="btn btn-outline-danger btn-sm"
                                                        name={index}
                                                        onClick={(e) =>
                                                          handleRemoveFromDropdown(
                                                            e
                                                          )
                                                        }
                                                      >
                                                        <i class="bi bi-file-excel"></i>
                                                      </button>
                                                    </li>
                                                  </>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </>
                                      )}
                                      {/* <label for="play_by">Decision:</label> */}
                                    </div>
                                  </div>
                                </>
                              )}

                              {displayRunForStricker && (
                                <>
                                  <div class="col-md-1 no-padding">
                                    <div class="form-floating _mb-3">
                                      <select
                                        class="form-select"
                                        id="striker_run"
                                        aria-label="Floating label select example"
                                        name="striker_run"
                                        onChange={(e) => postData(e)}
                                      >
                                        <option value={0} selected>
                                          No run...
                                        </option>
                                        {arrRun.map((item, index) => {
                                          return (
                                            <>
                                              <option
                                                value={item.value}
                                                key={index}
                                                selected={
                                                  item.value ==
                                                  inputData.striker_run
                                                    ? true
                                                    : false
                                                }
                                              >
                                                {item.text}
                                              </option>
                                            </>
                                          );
                                        })}
                                      </select>
                                      <label for="striker_run">
                                        Stricker Run:
                                      </label>
                                    </div>
                                  </div>
                                </>
                              )}

                              <div class="col-md-2 no-padding">
                                <div class="form-floating _mb-3">
                                  {editItemID ? (
                                    <>
                                      <button
                                        type="submit"
                                        class="btn btn-primary"
                                        style={{
                                          marginRight: "5px",
                                        }}
                                        onClick={updateData}
                                      >
                                        Update
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        type="submit"
                                        class="btn btn-success mb-2"
                                        style={{
                                          margin: "0 5px",
                                          height: "58px",
                                        }}
                                        onClick={submitData}
                                      >
                                        Next{" "}
                                        <span class="badge bg-white text-success">
                                          BALL
                                        </span>
                                      </button>
                                    </>
                                  )}
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
  );
};

// kllklkioioio
// jkfkdkjfkdjkdjkfjkd

export default OverUpdate;
