import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { validateAdminUser } from "../service/API";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(initialValues);
  const [dataError, setDataError] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  let name, value;
  const setUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });

    let errorMsg = "";
    switch (name) {
      case "email":
        errorMsg = "Email should not be empty";
        break;
      case "password":
        errorMsg = "Password should not be empty";
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

  const validateAdmin = async (data) => {
    let response = await validateAdminUser(data);
    // console.log("L47", response);

    if (response.data.data.token) {
      let token = response.data.data.token;
      localStorage.setItem("token", token);
      swal("Login", response?.data.message, "success");
      setLoginStatus(true);
      navigate("/");
    } else {
      setLoginStatus(false);
      swal("Login Denied!", "Invalid Credentials!", "error");
    }
  };

  const validateData = () => {
    let error = {};
    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = "Enter valid email address";
    }
    if (user.password.length < 6) {
      error.password = "Password at least 6 charecters long";
    }
    setDataError(error);
    return error;
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    let errorData = validateData();
    if (Object.keys(errorData).length === 0) {
      validateAdmin(user);
    }
  };

  const password_show_hide = () => {
    var x = document.getElementById("password");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
      x.type = "text";
      show_eye.style.display = "none";
      hide_eye.style.display = "block";
    } else {
      x.type = "password";
      show_eye.style.display = "block";
      hide_eye.style.display = "none";
    }
  };

  return (
    <>
      <main>
        <div class="container">
          <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div class="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      class="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                      <span class="d-none d-lg-block">AdminDashboard</span>
                    </a>
                  </div>
                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="pt-4 pb-2">
                        <h5 class="card-title text-center pb-0 fs-4">
                          Login to Admin Account
                        </h5>
                        <p class="text-center small">
                          Enter your username & password to login
                        </p>
                      </div>

                      <form
                        class="row g-3 needs-validation"
                        novalidate
                        onSubmit={(e) => submitLogin(e)}
                        method="post"
                      >
                        <div class="col-12">
                          {/* <label for="yourUsername" class="form-label">Username</label> */}
                          <div class="input-group has-validation">
                            <span
                              class="input-group-text"
                              id="inputGroupPrepend"
                            >
                              <i class="bi bi-person-fill"></i>
                            </span>
                            <input
                              type="text"
                              autocomplete="off"
                              class="form-control"
                              placeholder="Username"
                              required
                              name="email"
                              id="email"
                              onChange={(e) => setUserData(e)}
                            />
                            <div class="invalid-feedback">
                              {dataError.email}
                            </div>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="input-group mb-3">
                            <span
                              class="input-group-text"
                              onClick={password_show_hide}
                            >
                              <i
                                class="bi bi-eye-fill"
                                style={{
                                  cursor: "pointer",
                                }}
                                id="show_eye"
                              ></i>
                              <i
                                class="bi bi-eye-slash-fill"
                                style={{
                                  cursor: "pointer",
                                  display: "none",
                                }}
                                id="hide_eye"
                              ></i>
                            </span>
                            <input
                              type="password"
                              class="form-control"
                              autocomplete="off"
                              name="password"
                              id="password"
                              placeholder="Password"
                              onChange={(e) => setUserData(e)}
                            />
                          </div>
                          <div class="input-group-append"></div>
                          <div class="invalid-feedback">
                            {dataError.password}
                          </div>
                        </div>

                        <div class="col-12">
                          <button class="btn btn-primary w-100" type="submit">
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div class="credits">
                    Designed by <a href="javascript:">Lorem Ipsum</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;
