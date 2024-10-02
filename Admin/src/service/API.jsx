import axios from "axios";
import { checkingAuth } from "../utility/func";

// const ADMIN_API_URL = "http://137.184.218.7:7086/api/v1/admin"
const ADMIN_API_URL = "http://68.183.95.204:6020/v1/admin";

const ADMIN_API = "http://localhost:5000/api/admin/";

// const AUTH_TOKEN = localStorage.getItem("token")
// const AUTH_TOKEN = checkingAuth()

//*******************************
// ******* Authentication *******
//*******************************

export const validateAdminUser = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/login`, data);
  } catch (error) {
    console.log("login", error.message);
  }
};

//*********************************** */
//************ Fetch Room *********** */
export const fetchAllRoom = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/fetchRoom`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Adding New Room
export const addNewRoom = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/createRoom`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

//Updating Room
export const updateRoom = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/updateRoom/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("update-team", error.message);
  }
};
//Deleting Room
export const deleteRoom = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.delete(`${ADMIN_API_URL}/deleteRoom/${id}`, null, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("delete-team-leauge", error.message);
  }
};

//  Fetch Facility ////////////////////////

export const fetchAllFacility = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/facility`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//  Fetch Facility ////////////////////////

export const fetchAllProperties = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/property-highlight`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//  Fetch Hotel ////////////////////////

export const FetchHotel = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/fetchHotel`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Updating Room
export const updateHotelData = async (data) => {
  try {
    // if (id !== "" && id !== undefined && id !== null) {
    return await axios.put(`${ADMIN_API_URL}/updateHotel`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
    // }
  } catch (error) {
    console.log("update-team", error.message);
  }
};

//*******************************
// ******* File Uploading *******
//*******************************

export const uploadImageFile = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/uploadprofessionimage`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "multipart/form-data",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("image-upload", error.message);
  }
};

//*******************************
// ******* Country Management *******
//*******************************

//Adding New Country
export const addNewCountry = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-country`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-country", error.message);
  }
};
//Fetching all countries
export const fetchAllCountry = async (data) => {
  try {
    // console.log("L39",data);
    return await axios.get(`${ADMIN_API_URL}/view-country`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-country", error.message);
  }
};

//*******************************
// *** Team Leauge Management ***
//*******************************

//Adding New Team Leauge
export const addNewTeamLeauge = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-team-leauge`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-team-leauge", error.message);
  }
};
//Fetching all Team Leauges
export const fetchAllTeamLeauge = async (data) => {
  try {
    return await axios.get(`${ADMIN_API_URL}/view-team-leauge`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-team-leauge", error.message);
  }
};
//Updating Team Leauge
export const updateTeamLeauge = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(
        `${ADMIN_API_URL}/update-team-leauge/${id}`,
        data,
        {
          headers: {
            Authorization: checkingAuth(),
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.log("update-team-leauge", error.message);
  }
};
//Deleting Team Leauge
export const deleteTeamLeauge = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(
        `${ADMIN_API_URL}/delete-team-leauge/${id}`,
        null,
        {
          headers: {
            Authorization: checkingAuth(),
          },
        }
      );
    }
  } catch (error) {
    console.log("delete-team-leauge", error.message);
  }
};

//*******************************
// ******* Team Management *******
//*******************************

//*******************************
// ****** Sports Management ******
//*******************************

//Adding New Sports
export const addNewSports = async (data) => {
  try {
    // console.log("L23",data);
    return await axios.post(`${ADMIN_API_URL}/add-sports`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("add-sports", error.message);
  }
};
//Fetching all Sports
export const fetchAllSports = async (data) => {
  try {
    // console.log("L39",data);
    return await axios.get(`${ADMIN_API_URL}/view-sports`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-sports", error.message);
  }
};
//Updating Sports
export const updateSports = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/update-sports/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("update-sports", error.message);
  }
};
//Deleting Sports
export const deleteSports = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/delete-sports/${id}`, null, {
        headers: {
          Authorization: checkingAuth(),
        },
      });
    }
  } catch (error) {
    console.log("delete-sports", error.message);
  }
};

//Adding New Sports wise position
export const addNewSportsWisePosition = async (data) => {
  try {
    // console.log("L23",data);
    return await axios.post(
      `${ADMIN_API_URL}/create-sport-wise-position`,
      data,
      {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("add-sports", error.message);
  }
};
//Fetching all Sports wise position
export const fetchAllSportsWisePosition = async (data) => {
  try {
    console.log("L257", data);
    return await axios.post(`${ADMIN_API_URL}/view-sport-wise-position`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-sports", error.message);
  }
};
//Updating Sports wise position
export const updateSportsWisePosition = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(
        `${ADMIN_API_URL}/update-sport-wise-position/${id}`,
        data,
        {
          headers: {
            Authorization: checkingAuth(),
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.log("update-sports", error.message);
  }
};
//Deleting Sports wise position
export const deleteSportsWisePosition = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.delete(
        `${ADMIN_API_URL}/delete-sport-wise-position/${id}`,
        {
          headers: {
            Authorization: checkingAuth(),
          },
        }
      );
    }
  } catch (error) {
    console.log("delete-sports", error.message);
  }
};

//Adding New Player Tag
export const addNewPlayerTag = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-player-tag`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("add-sports", error.message);
  }
};
//Fetching all Player Tags
export const fetchAllPlayerTag = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/view-player-tag`, {
      headers: {
        Authorization: checkingAuth(),
      },
    });
  } catch (error) {
    console.log("view-sports", error.message);
  }
};
//Updating Player Tag
export const updatePlayerTag = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/update-player-tag/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("update-sports", error.message);
  }
};
//Deleting Player Tag
export const deletePlayerTag = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.delete(`${ADMIN_API_URL}/delete-player-tag/${id}`, {
        headers: {
          Authorization: checkingAuth(),
        },
      });
    }
  } catch (error) {
    console.log("delete-sports", error.message);
  }
};

//*******************************
// ******* Player Management *******
//*******************************

//Adding New Player
export const addNewPlayer = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-palyer`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-palyer", error.message);
  }
};
//Fetching all Player
export const fetchAllPlayer = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/view-palyer`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-palyer", error.message);
  }
};
//Updating Player
export const updatePlayer = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/update-player/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("update-player", error.message);
  }
};
//Deleting Player
export const deletePlayer = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/delete-player/${id}`, null, {
        headers: {
          Authorization: checkingAuth(),
        },
      });
    }
  } catch (error) {
    console.log("delete-player", error.message);
  }
};

//*******************************
// ******* Session Management *******
//*******************************

//Adding New Session
export const addNewSession = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-session`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-session", error.message);
  }
};
//Fetching all Sessions
export const fetchAllSession = async () => {
  try {
    // console.log("L39",data);
    return await axios.get(`${ADMIN_API_URL}/view-session`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-session", error.message);
  }
};
//Updating Session
export const updateSession = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/update-session/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("update-session", error.message);
  }
};
//Deleting Session
export const deleteSession = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/delete-session/${id}`, null, {
        headers: {
          Authorization: checkingAuth(),
        },
      });
    }
  } catch (error) {
    console.log("delete-session", error.message);
  }
};

//Fetching all TimeZone
export const fetchAllTimeZone = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/view-time-zone`, {
      headers: {
        Authorization: checkingAuth(),
      },
    });
  } catch (error) {
    console.log("view-session", error.message);
  }
};

//*******************************
// ******* Match Management *******
//*******************************

//Adding New Match
export const addNewMatch = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-match`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-match", error.message);
  }
};
//Fetching all Matches
export const fetchAllMatch = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/view-match`, {
      headers: {
        Authorization: checkingAuth(),
      },
    });
  } catch (error) {
    console.log("view-match", error.message);
  }
};
//Update Match Play
export const updateMatchPlay = async (data) => {
  try {
    console.log("inputmatchstart566", data);
    // return
    return await axios.post(`${ADMIN_API_URL}/is-match-start`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-match", error.message);
  }
};

//End Match Play
export const endInningsPlay = async (id) => {
  try {
    console.log("inputmatchstart566", id);
    // return
    return await axios.put(
      `${ADMIN_API_URL}/first-inning-complete/${id}`,
      {},
      {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("first-inning-complete", error.message);
  }
};

//End Match Play
export const endMatchPlay = async (id) => {
  try {
    console.log("inputmatchstart566", id);
    // return
    return await axios.put(
      `${ADMIN_API_URL}/match-end/${id}`,
      {},
      {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("match-end", error.message);
  }
};

//*******************************
//******* Toss Management *******
//*******************************

//Adding New Toss
export const addNewToss = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/add-toss`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("add-toss", error.message);
  }
};

//*******************************
// ******* Team Wise Player Management *******
//*******************************

//Adding New Team Wise Player
export const addNewTeamWisePlayer = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-team-wise-player`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-team-wise-player", error.message);
  }
};
//Updating Team Wise Player
export const updateNewTeamWisePlayer = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/edit-team-wise-player`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("edit-team-wise-player", error.message);
  }
};
//Fetching all Team Wise Player
export const _fetchAllTeamWisePlayer = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.get(`${ADMIN_API_URL}/view-team-wise-player/${id}`, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("view-team-wise-player", error.message);
  }
};
//Fetching all Team Wise Player
export const fetchAllTeamWisePlayer = async (data) => {
  try {
    ///view-team-wise-player
    return await axios.post(
      `${ADMIN_API_URL}/get-team-sports-leauge-wise`,
      data,
      {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("view-team-wise-player", error.message);
  }
};
//Fetch All Unselected Playing Player
export const fetchAllUnselectedPLayers = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/view-unselected-player`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-unselected-player", error.message);
  }
};
//Updating Team Wise Player
export const updateTeamWisePlayer = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/update-session/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("update-session", error.message);
  }
};
//Deleting Team Wise Player
export const deleteTeamWisePlayer = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/delete-session/${id}`, null, {
        headers: {
          Authorization: checkingAuth(),
        },
      });
    }
  } catch (error) {
    console.log("delete-session", error.message);
  }
};

//*******************************
// ******* Playing Eleven Management *******
//*******************************

//Adding New Playing Eleven
export const addNewPlayingEleven = async (data) => {
  try {
    // console.log("L569",data);
    return await axios.post(`${ADMIN_API_URL}/create-playing-eleven`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-palyer", error.message);
  }
};

//Fetching all Playing Eleven
export const fetchAllPlayingEleven = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/view-playing-eleven`, {
      headers: {
        Authorization: checkingAuth(),
      },
    });
  } catch (error) {
    console.log("view-match", error.message);
  }
};

//***************************************************
// ******* Match Over Ball by Ball Management *******
//***************************************************

//Fetching all Players by Match, Seaaion and Team
export const fetchAllPlayersBySessionAndTeam = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/view-session-wise-match`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-session-wise-match", error.message);
  }
};

//Fetching all Players for Playing11
export const fetchAllPlayersForPlaying11 = async (data) => {
  try {
    return await axios.post(
      `${ADMIN_API_URL}/get-team-sports-leauge-wise`,
      data,
      {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("view-session-wise-match", error.message);
  }
};

//Fetching Batting Team Players
export const fetchAllMatchTeamPlayers = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/match-player-listing`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-country", error.message);
  }
};

//*******************************
// ******* Ball By Ball Update *******
//*******************************

//Adding New Ball By Ball data
export const updateBallByBall = async (data) => {
  try {
    // console.log("L569",data);
    return await axios.post(`${ADMIN_API_URL}/ball-per-ball-update`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("ball-per-ball-update", error.message);
  }
};

//Fetching Ball By Ball data
export const fetchAllBallByBall = async (data) => {
  try {
    // console.log("L569",data);
    return await axios.post(`${ADMIN_API_URL}/view-ball-per-ball`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-ball-per-ball", error.message);
  }
};

//*******************************
// ******* Winning Price Management *******
//*******************************

//Adding New Winning Price
export const addNewWinningPrice = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-winning-point`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-winning-point", error.message);
  }
};
//Fetching all Sessions
export const fetchAllWinningPrice = async () => {
  try {
    // console.log("L39",data);
    return await axios.get(`${ADMIN_API_URL}/view-winning-point`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-winning-point", error.message);
  }
};

//*******************************
// *** Contest Management ***
//*******************************

//Adding New Contest
export const addNewContest = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-contest`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-contest", error.message);
  }
};
//Fetching all Contest
export const fetchAllContest = async (data) => {
  try {
    return await axios.get(`${ADMIN_API_URL}/view-contest`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-contest", error.message);
  }
};
//Updating Contest
export const updateContest = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/update-contest/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("update-contest", error.message);
  }
};
//Deleting Contest
export const deleteContest = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/delete-contest/${id}`, null, {
        headers: {
          Authorization: checkingAuth(),
        },
      });
    }
  } catch (error) {
    console.log("delete-contest", error.message);
  }
};

export const fetchAllTeam = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/fetchRoom`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Adding New Room
export const addNewTeam = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/createRoom`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

//Updating Room
export const updateTeam = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/updateRoom/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("update-team", error.message);
  }
};
//Deleting Room
export const deleteTeam = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/deleteRoom/${id}`, null, {
        headers: {
          Authorization: checkingAuth(),
        },
      });
    }
  } catch (error) {
    console.log("delete-team-leauge", error.message);
  }
};

export const fetchAllProfession = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/viewprofession`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Adding New Room
export const addNewProfession = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/createprofession`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

//Updating Room
export const updateProfession = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(
        `${ADMIN_API_URL}/updateprofessiondetails/${id}`,
        data,
        {
          headers: {
            Authorization: checkingAuth(),
            "Content-Type": "application/json",
            userType: "Admin",
          },
        }
      );
    }
  } catch (error) {
    console.log("update-team", error.message);
  }
};
//Deleting Room
export const deleteProfession = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.delete(`${ADMIN_API_URL}/deleteprofession/${id}`, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
          userType: "Admin",
        },
      });
    }
  } catch (error) {
    console.log("delete-team-leauge", error.message);
  }
};

//    Home Screen

export const fetchAllScreen = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/viewhomescreen`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Adding New Room
export const addNewScreen = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/createhomescreen`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

//Updating Room
export const updateScreen = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(
        `${ADMIN_API_URL}/updatehomescreendetails/${id}`,
        data,
        {
          headers: {
            Authorization: checkingAuth(),
            "Content-Type": "application/json",
            userType: "Admin",
          },
        }
      );
    }
  } catch (error) {
    console.log("update-team", error.message);
  }
};
//Deleting Room
export const deletSecren = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.delete(`${ADMIN_API_URL}/deletehomescreen/${id}`, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
          userType: "Admin",
        },
      });
    }
  } catch (error) {
    console.log("delete-team-leauge", error.message);
  }
};

//    App Module

export const fetchAllModule = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/app-module`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Adding New Room
export const addModule = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/app-module`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

//Updating Room
export const updateModule = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/app-module/update/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
          userType: "Admin",
        },
      });
    }
  } catch (error) {
    console.log("update-team", error.message);
  }
};
//Deleting Room
export const deletModule = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/app-module/delete/${id}`, null, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
          userType: "Admin",
        },
      });
    }
  } catch (error) {
    console.log("delete-team-leauge", error.message);
  }
};

// CRUD ELEMENT TYPE
//Adding New Room
export const addElement = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/element-type`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

//Updating Room
export const fetchElement = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/element-type`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

// CRUD ELEMENT TYPE
//Adding New Room
export const addElementField = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/element-field-type`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

//Updating Room
export const fetchElementField = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/element-field-type`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Adding Banner Element
export const addBannerElement = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/element`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

export const fetchBannerElement = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/element`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Updating Room
export const updateBannerElement = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/edit-element/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
          userType: "Admin",
        },
      });
    }
  } catch (error) {
    console.log("update-team", error.message);
  }
};

export const fetchAllMapping = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/get-professional-mapping`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Adding New Room
export const addNewMapping = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/professional-mapping`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

//Updating Room
export const updateMapping = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(
        `${ADMIN_API_URL}/update-professional-mapping/${id}`,
        data,
        {
          headers: {
            Authorization: checkingAuth(),
            "Content-Type": "application/json",
            userType: "Admin",
          },
        }
      );
    }
  } catch (error) {
    console.log("update-team", error.message);
  }
};
//Deleting Room
export const deleteMapping = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.delete(
        `${ADMIN_API_URL}/delete-professional-mapping/${id}`,
        {
          headers: {
            Authorization: checkingAuth(),
            "Content-Type": "application/json",
            userType: "Admin",
          },
        }
      );
    }
  } catch (error) {
    console.log("delete-team-leauge", error.message);
  }
};

//    Home Screen

export const fetchAllAppDetails = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/view-splash`, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

//Adding New Room
export const addNewAppDetails = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/create-splash`, data, {
      headers: {
        Authorization: checkingAuth(),
        "Content-Type": "application/json",
        userType: "Admin",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

//Updating Room
export const updateAppDetails = async (id, data) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/update-splash/${id}`, data, {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
          userType: "Admin",
        },
      });
    }
  } catch (error) {
    console.log("update-team", error.message);
  }
};
//Deleting Room
export const deletAppDetails = async (id) => {
  try {
    if (id !== "" && id !== undefined && id !== null) {
      return await axios.put(`${ADMIN_API_URL}/delete-splash/${id}`, "", {
        headers: {
          Authorization: checkingAuth(),
          "Content-Type": "application/json",
          userType: "Admin",
        },
      });
    }
  } catch (error) {
    console.log("delete-team-leauge", error.message);
  }
};
