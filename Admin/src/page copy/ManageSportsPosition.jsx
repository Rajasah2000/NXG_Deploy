import React, { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import Sidebar from '../component/common/Sidebar'
import Footer from '../component/common/Footer'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { addNewSportsWisePosition, addNewTeam, addNewTeamLeauge, deleteSportsWisePosition, deleteTeam, deleteTeamLeauge, fetchAllCountry, fetchAllSports, fetchAllSportsWisePosition, fetchAllTeam, fetchAllTeamLeauge, updateSportsWisePosition, updateTeam, updateTeamLeauge } from '../service/API'
import swal from 'sweetalert'
import Loader from '../component/common/Loader'
import Swal from 'sweetalert2'

const ManageSportsPosition = () => {

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
                    Position
                </div>
            ),
            selector: (row) => row.position,
            wrap: true,
            // center: true,
            // width: "125px",
            sortable: true
        },
        {
            name: (
                <div>
                    Limit
                </div>
            ),
            selector: (row) => row.limit,
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
        sportsID: "",
        position: "",
        positionLimit: "",
    }
    const [inputData, setInputData] = useState(initialValues);
    const [dataError, setDataError] = useState({});
    const [allData, setAllData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [editItemID, setEditItemID] = useState()
    const [allSports, setAllSports] = useState([])
    const [allLeagues, setAllLeagues] = useState([])
    const [loader, setLoader] = useState(false)
    let name, value

    useEffect(() => {
        fetchAllSportsData()
    }, [])

    useEffect(() => {
        inputData.sportsID !== "" ? fetchAllData(inputData.sportsID):setLoader(false)
    }, [inputData.sportsID])



    const postData = (e) => {
        name = e.target.name;
        value = e.target.value;

        setInputData({ ...inputData, [name]: value });

        let errorMsg = "";
        switch (name) {
            case "sportsID":
                errorMsg = "Choose sports name";
                break;
            case "position":
                errorMsg = "Position should not be empty";
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
        if (inputData.sportsID === "" || inputData.sportsID === null ||inputData.sportsID === undefined) {
            error.sportsID = "Choose Sports Name";
        }
        if (inputData.position === "" || inputData.position === null ||inputData.position === undefined) {
            error.position = "Please enter Playing Position";
        }
        if (inputData.positionLimit === "" || inputData.positionLimit === null ||inputData.positionLimit === undefined) {
            error.position = "Please enter maximum number of players in the Position";
        }
        return error;
    };

    const submitData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        if (Object.keys(ErrorList).length === 0) {
            const response = await addNewSportsWisePosition(inputData);
            // console.log("L92", response);
            fetchAllData(inputData.sportsID)
            setInputData({sportsID:inputData.sportsID})
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
        }
    }

    const updateData = async (e) => {
        e.preventDefault();
        let ErrorList = validateData();
        setDataError(validateData());
        if (Object.keys(ErrorList).length === 0) {
            const response = await updateSportsWisePosition(editItemID, inputData);
            fetchAllData(inputData.sportsID)
            setInputData({sportsID:inputData.sportsID})
            response.data.status ? swal("Good job!", response.data?.message, "success") : swal("Error", response.message, "error");
        }
    }

    const onEdit = (item) => {
        // console.log("L197", item);
        setInputData(
            {
                position: item?.position,
                sportsID: item?.sportsID,
                positionLimit: item?.positionLimit,
            }
        )
        setEditItemID(item._id)
    }

    const deleteData = async (id) => {
        const response = await deleteSportsWisePosition(id)
        if (response.data.status) {
            swal("Good job!", response.data?.message, "success")
            setInputData(initialValues)
            fetchAllData(inputData.sportsID)
            setInputData({sportsID:inputData.sportsID})
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

    const fetchAllData = async (sports) => {
        setLoader(true)
        let data = {
            sportsID: sports
        }
        const response = await fetchAllSportsWisePosition(data)
        if (response && Object.keys(response.data.data).length > 0) {
            setLoader(false)
            console.log("L179", response);
            let arr = response.data.data.sort().reverse().map((item, index) => {
                return {
                    sl: index + 1,
                    position: item?.position,
                    limit: item?.positionLimit,
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
            // console.log("L228", arr);
            setFilteredData(arr)
            setAllData(arr);
        }else{
            setLoader(false)
            setFilteredData([])
            setAllData([]);
        }
    }

    const fetchAllSportsData = async () => {
        const response = await fetchAllSports()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrSports = response.data.data.sort().reverse();
            setAllSports(arrSports)
        }
    }

    const fetchAllLeagues = async () => {
        const response = await fetchAllTeamLeauge()
        if (response && Object.keys(response.data.data).length > 0) {
            let arrLeauges = response.data.data.sort().reverse();
            setAllLeagues(arrLeauges)
        }
    }



    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Sports Position management</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li class="breadcrumb-item">Sports Position</li>
                            <li class="breadcrumb-item active">Manage</li>
                        </ol>
                    </nav>
                </div>
                <section class="section">
                    <div class="row">
                        <div class="col-lg-4">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Sports Position details</h5>


                                    <form method="post" class="row g-3">

                                        <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="sportsID"
                                                    aria-label="Floating label select example"
                                                    name="sportsID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        // fetchAllData(e.target.value)
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
                                            <div class="validate text-danger">{dataError.sportsID}</div>
                                        </div>



                                        <div class="col-md-12">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="position"
                                                    placeholder="Player position"
                                                    name="position"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.position}
                                                />
                                                <label for="position">Position name</label>
                                                <div class="validate text-danger">{dataError.position}</div>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-floating">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="positionLimit"
                                                    placeholder="Player position limit"
                                                    name="positionLimit"
                                                    onChange={(e) => postData(e)}
                                                    value={inputData.positionLimit}
                                                />
                                                <label for="position">Position limit</label>
                                                <div class="validate text-danger">{dataError.positionLimit}</div>
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
                                    <h5 class="card-title">List of all Sports Position</h5>
                                    {
                                        inputData.sportsID ? (
                                            <>
                                            {
                                                loader ? (<Loader />) : (<DataTable columns={columns} data={filteredData} pagination />)
                                            }
                                            </>
                                        ):(
                                            <>
                                            <div class="col-md-12">
                                            <div class="form-floating -mb-3">
                                                <select class="form-select"
                                                    id="sportsID"
                                                    aria-label="Floating label select example"
                                                    name="sportsID"
                                                    onChange={(e) => {
                                                        postData(e)
                                                        // fetchAllData(e.target.value)
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
                                        </div>
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

export default ManageSportsPosition
