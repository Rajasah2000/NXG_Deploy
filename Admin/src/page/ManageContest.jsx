import React, { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import Sidebar from '../component/common/Sidebar'
import Footer from '../component/common/Footer'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { addNewContest, addNewCountry, addNewTeamLeauge, deleteContest, deleteTeamLeauge, fetchAllContest, fetchAllCountry, fetchAllMatch, fetchAllPlayer, fetchAllSports, fetchAllTeam, fetchAllTeamLeauge, fetchAllWinningPrice, updateContest, updateTeamLeauge } from '../service/API'
import swal from 'sweetalert'
import Loader from '../component/common/Loader'
import Swal from 'sweetalert2'
import Dropdown from '../component/core/Dropdown'

const ManageContest = () => {

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
                    Match
                </div>
            ),
            selector: (row) => row.matchType,
            wrap: true,
            // center: true,
            // width: "96px"
        },

        {
            name: (
                <div>
                    Entry Fee
                </div>
            ),
            selector: (row) => row.entryFee,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Pool Price
                </div>
            ),
            selector: (row) => row.poolPrice,
            wrap: true,
            // center: true,
            // width: "175px",
            sortable: true
        },
        {
            name: (
                <div>
                    Total Spot
                </div>
            ),
            selector: (row) => row.totalSpot,
            wrap: true,
            // center: true,
            // width: "175px",
            sortable: true
        },
        {
            name: (
                <div>
                    Winning Price Set
                </div>
            ),
            selector: (row) => row.winningID,
            wrap: true,
            // center: true,
            // width: "175px",
            // sortable: true
        },
        {
            name: (
                <div>
                    Contest Type
                </div>
            ),
            selector: (row) => row.contestType,
            wrap: true,
            // center: true,
            // width: "175px",
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

    const typesOfContest = [
        {
            _id: "Single_Entry",
            value: "Single Entry"
        },
        {
            _id: "Multi_Entry",
            value: "Multiple Entry"
        },
        {
            _id: "Single_Winner",
            value: "Single Winner"
        },
        {
            _id: "Multi_Winner",
            value: "Multiple Winner"
        }
    ]

    const initialValues = {
        matchID: "",
        entryFee: 0,
        poolPrice: 0,
        totalSpot: 0,
        winningID: "",
        contestType: ""
    }
    const [inputData, setInputData] = useState(initialValues);
    const [dataError, setDataError] = useState({});
    const [allMatches, setAllMatches] = useState([])
    const [allWinningPriceSet, setAllWinningPriceSet] = useState([])

    const [allData, setAllData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [editItemID, setEditItemID] = useState()
    const [loader, setLoader] = useState(false)
    const [selectedTeams, setSelectedTeams] = useState([])
    const [allTeams, setAllTeams] = useState([])
    const [errPlaying11, setErrPlaying11] = useState("")
    let name, value

    useEffect(() => {
        fetchAllData()
        fetchAllMatchesData()
        // fetchAllPlayingTeamData()
        fetchAllWinningPriceSet()
    }, [])

    // useEffect(() => {
    //     const teamID = selectedTeams.map(item => item.id)
    //     setInputData({ ...inputData, teamID: teamID })
    // }, [selectedTeams])

    const fetchAllMatchesData = async () => {
        const response = await fetchAllMatch()
        // console.log("Matches139", response.data);
        if (response && Object.keys(response.data.data).length > 0) {
            let arrData = response.data.data.sort().reverse();
            setAllMatches(arrData)
        }
    }

    const fetchAllWinningPriceSet = async () => {
        const response = await fetchAllWinningPrice()
        // console.log("SER154", response.data);
        if (response && Object.keys(response.data.data).length > 0) {
            let arrData = response.data.data.sort().reverse();
            setAllWinningPriceSet(arrData)
        }
    }

    const postData = (e) => {
        name = e.target.name;
        value = e.target.value;

        setInputData({ ...inputData, [name]: value });

        let errorMsg = "";
        switch (name) {
            case "matchID":
                errorMsg = "Choose the match";
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
        if (inputData.matchID === "") {
            error.matchID = "Please choose match";
        }
        return error;
    };

    const submitData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());

        // console.log("inputData115", inputData)
        // return
        if (Object.keys(ErrorList).length === 0) {
            const response = await addNewContest(inputData);
            // console.log("L92", response);
            setInputData(initialValues)
            fetchAllData()
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
        }
    }

    const updateData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        // console.log("inputData228",inputData)
        // return
        if (Object.keys(ErrorList).length === 0) {
            const response = await updateContest(editItemID, inputData);

            setInputData(initialValues)
            fetchAllData()
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
            setEditItemID("")
            setSelectedTeams([])
        }
    }

    const onEdit = (item) => {
        console.log("item240",item);
        setInputData({ contestType: item.contestType, entryFee: item.entryFee, matchID: item?.matchID, poolPrice: item?.poolPrice, totalSpot: item?.totalSpot, winningID: item?.winningID })
        setEditItemID(item._id)
    }

    const deleteData = async (id) => {
        const response = await deleteContest(id)
        // console.log("L130", response)
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
        const response = await fetchAllContest()
        if (response && Object.keys(response.data.data).length > 0) {
            setLoader(false)
            let arr = response.data.data.sort().reverse().map((item, index) => {
                return {
                    sl: index + 1,
                    entryFee: item?.entryFee,
                    poolPrice: item?.poolPrice,
                    totalSpot: item?.totalSpot,
                    winningID: item?.winningdta?.winning_name,
                    matchType: item?.matchdta?.matchType,
                    contestType: item?.contestType,
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
            setFilteredData(arr)
            setAllData(arr);
        }
    }


    const fetchAllPlayingTeamData = async () => {
        const response = await fetchAllTeam()
        if (response && Object.keys(response.data.data).length > 0) {
            // console.log("L533", response.data.data);
            let arrPlayers = response.data.data
                // .filter(item => item.id !== idToRemove)
                .map((item, index) => {
                    return {
                        id: item?._id,
                        name: item?.teamName,
                    };
                })
            // console.log("L464", arrPlayers);
            setAllTeams(arrPlayers)
        }
    }
    const handleRemoveFromDropdown = (e, index, id, name) => {
        e.preventDefault()
        const newItems = [...selectedTeams]
        // console.log("dd646",index);
        newItems.splice(index, 1)
        setSelectedTeams(newItems)

        const option = {
            id: id,
            name: name
        }
        console.log("option612", option);
        setAllTeams([...allTeams, option])
    }
    const handleSelectOption = (option) => {
        setSelectedTeams([...selectedTeams, option])

        let index = allTeams.findIndex(item => item.id === option.id);
        const newItems = [...allTeams]
        newItems.splice(index, 1)
        setAllTeams(newItems)
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Contest management</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li class="breadcrumb-item">Contest</li>
                            <li class="breadcrumb-item active">Manage</li>
                        </ol>
                    </nav>
                </div>
                <section class="section">
                    <div class="row">
                        <div class="col-lg-4">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Contest details</h5>


                                    <form method="post" class="row g-3">
                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="matchID"
                                                    aria-label="Floating label select example"
                                                    name="matchID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        // e.target.value && fetchAllPlayerTags(e.target.value)
                                                        // e.target.value && fetchAllSportsWisePositions(e.target.value)
                                                    }}
                                                >
                                                    <option selected>Choose match...</option>
                                                    {
                                                        allMatches.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.matchID ? true : false}
                                                                    >{item.leaugeName} - {item.matchType}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="matchID">Match:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.matchID}</div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="winningID"
                                                    aria-label="Floating label select example"
                                                    name="winningID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        // e.target.value && fetchAllPlayerTags(e.target.value)
                                                        // e.target.value && fetchAllSportsWisePositions(e.target.value)
                                                    }}
                                                >
                                                    <option selected>Choose...</option>
                                                    {
                                                        allWinningPriceSet.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.winningID ? true : false}
                                                                    >{item.winning_name ? item.winning_name : item._id}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="winningID">Winning Price Set:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.winningID}</div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="entryFee"
                                                    placeholder="Entry Fee"
                                                    name="entryFee"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.entryFee}
                                                />
                                                <label for="entryFee">Entry Fee</label>
                                                <div class="validate text-danger">{dataError.entryFee}</div>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="poolPrice"
                                                    placeholder="Pool Price"
                                                    name="poolPrice"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.poolPrice}
                                                />
                                                <label for="poolPrice">Pool Price</label>
                                                <div class="validate text-danger">{dataError.poolPrice}</div>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="totalSpot"
                                                    placeholder="Total Spot"
                                                    name="totalSpot"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.totalSpot}
                                                />
                                                <label for="totalSpot">Total Spot</label>
                                                <div class="validate text-danger">{dataError.totalSpot}</div>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="contestType"
                                                    aria-label="Floating label select example"
                                                    name="contestType"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        // e.target.value && fetchAllPlayerTags(e.target.value)
                                                        // e.target.value && fetchAllSportsWisePositions(e.target.value)
                                                    }}
                                                >
                                                    <option selected>Choose...</option>
                                                    {
                                                        typesOfContest.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option value={item._id} key={index}
                                                                        selected={item._id == inputData.contestType ? true : false}
                                                                    >{item.value}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label for="contestType">Contest Type:</label>
                                            </div>
                                            <div class="validate text-danger">{dataError.contestType}</div>
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
                                    <h5 class="card-title">List of all Contest</h5>
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

export default ManageContest
