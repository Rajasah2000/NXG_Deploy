import axios from "axios";

const ADMIN_API_URL = "http://68.183.95.204:4070/api/v1/";

const ADMIN_API = "https://nxg-backend-project.onrender.com/api/user/";

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

//************ Fetch Room *********** */
export const fetchAllhotel = async (id) => {
  try {
    return await axios.get(`${ADMIN_API_URL}/fetchHotel/${id}`, {
      // headers: {
      //   Authorization: checkingAuth(),
      //   'Content-Type': 'application/json',
      // },
    });
  } catch (error) {
    // console.log('view-team', error.message);
  }
};

export const fetchAllhotelData = async (id) => {
  try {
    return await axios.get(`${ADMIN_API_URL}/fetchAllHotel`, {
      // headers: {
      //   Authorization: checkingAuth(),
      //   'Content-Type': 'application/json',
      // },
    });
  } catch (error) {
    console.log("view-team", error.message);
  }
};

export const fetchSinglehotel = async (id) => {
  try {
    return await axios.get(`${ADMIN_API_URL}/hotel/${id}`, {});
  } catch (error) {
    console.log("view-team", error.message);
  }
};

export const fetchhotelBanner = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}helicopter-dashboard-image`, {});
  } catch (error) {
    console.log("view-team", error.message);
  }
};
//**************  Fetch Country ************* */
export const fetchCountry = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/city`, {});
  } catch (error) {
    // console.log('view-team', error.message);
  }
};

// all - city;

export const fetchAllCity = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/all-city`, {});
  } catch (error) {
    // console.log('view-team', error.message);
  }
};

export const fetchDestination = async () => {
  try {
    return await axios.get(`${ADMIN_API_URL}/destinaton`, {});
  } catch (error) {
    console.log("view-team", error.message);
  }
};

export const validateUser = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/user/login`, data);
  } catch (error) {
    console.log("login", error.message);
  }
};

export const validateUserRegister = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/user/register`, data);
  } catch (error) {
    console.log("login", error.message);
  }
};

export const FilterHotel = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}/filter-hotel`, data);
  } catch (error) {
    // console.log('login', error.message);
  }
};

export const FilterHelicopterData = async (data) => {
  try {
    return await axios.post(`${ADMIN_API_URL}filter-helicopter`, data);
  } catch (error) {
    // console.log('login', error.message);
  }
};

export const UserBooking = async (data) => {
  try {
    return await axios.post(`${ADMIN_API}register`, data);
  } catch (error) {
    // console.log('login', error.message);
  }
};
