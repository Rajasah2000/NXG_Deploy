import axios from "axios";

const ADMIN_API = "https://nxg-backend-project.onrender.com/api/admin/";

const checkingAuth = () => {
  // let token = reactLocalStorage.get("token");
  let token = localStorage.getItem("token");
  console.log("TOKEn", token);
  // console.log('fucking token',token)
  if (token) {
    return token;
  }
  return false;
};

//Adding New Room
// export const addNewRoom = async (data) => {
//   try {
//     return await axios.post(`${ADMIN_API}/createRoom`, data, {
//       headers: {
//         Authorization: checkingAuth(),
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.log("create-team", error.message);
//   }
// };

export const adminLogin = async (data) => {
  try {
    return await axios.post(`${ADMIN_API}login`, data, {
      //   headers: {
      //     Authorization: checkingAuth(),
      //     "Content-Type": "application/json",
      //   },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

export const getAllBooking = async (data) => {
  try {
    return await axios.get(`${ADMIN_API}getalluser`, data, {
      //   headers: {
      //     Authorization: checkingAuth(),
      //     "Content-Type": "application/json",
      //   },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};

export const DeleteUserBooking = async (id) => {
  try {
    return await axios.delete(`${ADMIN_API}user-delete/${id}`, {
      headers: {
        Authorization: checkingAuth(),
        // "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("create-team", error.message);
  }
};
