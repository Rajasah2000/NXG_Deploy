import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { validateUserRegister } from '../API';

const Signup = () => {
//   {
//     "firstName": "Vipin",
//     "lastName": "Jain",
//     "email": "vipin@gmail.com",
//     "password": "12345678",
//     "mobile": 8957986255
// }

const navigate = useNavigate();

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  mobile:"",
};

const setUserData = e => {
  let names = e.target.name;
  let value = e.target.value;
  setUser({ ...user, [names]: value });
};
const [user, setUser] = useState(initialValues);

const validateData = () => {
  let error = {};


  if (user.email === '' || user.password === '' || user?.firstName === "" || user?.lastName === "" || user?.mobile === "") {
    return toast.error('All fields are required');
  }
  if (
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      user.email
    )
  ) {
    return toast.error('Enter valid email address!');
    // error.email = 'Enter valid email address';
  }
  if (user.password.length < 6) {
    return toast.error('Password at least 6 charecters long!');
    // error.password = 'Password at least 6 charecters long';
  }
  // setDataError(error);
  return error;
};

const validateAdmin = async data => {
  let response = await validateUserRegister(data);
  // console.log("L47", response);

  if (response?.status) {
    console.log('L47fffffffffffff', response?.data?.data);
    let token = response?.data?.data;
    localStorage.setItem('token', token);
    // swal('Login', response?.data.message, 'success');
    toast.success('Register Successfully');
    // setLoginStatus(true);
    navigate('/login');
  } else {
    // setLoginStatus(false);
    // swal('Login Denied!', 'Invalid Credentials!', 'error');
    toast.error('User not found.!');
    // swal('Login Failed!', 'User not found.!', 'error');
  }
};

const submitRegister = async e => {
  e.preventDefault();
  let errorData = validateData();
  if (Object.keys(errorData).length === 0) {
    validateAdmin(user);
  }
};
  return (
    <main>
      <div className="header-margin" />

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
                <div className="row y-gap-20">
                  <div className="col-12">
                    <h1 className="text-22 fw-500">Sign in or create an account</h1>
                    <p className="mt-10">
                      Already have an account?{' '}
                      <a href="/login" className="text-blue-1">
                        Log in
                      </a>
                    </p>
                  </div>
                  <div className="col-12">
                    <div className="form-input ">
                      <input
                        type="text"
                        required=""
                        name="firstName"
                        value={user?.firstName}
                        onChange={e => setUserData(e)}
                      />
                      <label className="lh-1 text-14 text-light-1">First Name</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-input ">
                      <input
                        type="text"
                        required=""
                        name="lastName"
                        value={user?.lastName}
                        onChange={e => setUserData(e)}
                      />
                      <label className="lh-1 text-14 text-light-1">Last Name</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-input ">
                      <input type="text" required="" name="email" value={user?.email} onChange={e => setUserData(e)} />
                      <label className="lh-1 text-14 text-light-1">Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-input ">
                      <input
                        type="password"
                        required=""
                        name="password"
                        value={user?.password}
                        onChange={e => setUserData(e)}
                      />
                      <label className="lh-1 text-14 text-light-1">Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-input ">
                      <input
                        type="number"
                        required=""
                        name="mobile"
                        value={user?.mobile}
                        onChange={e => setUserData(e)}
                      />
                      <label className="lh-1 text-14 text-light-1">Mobile No</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex ">
                      <div className="form-checkbox mt-5">
                        <input type="checkbox" name="name" />
                        <div className="form-checkbox__mark">
                          <div className="form-checkbox__icon icon-check" />
                        </div>
                      </div>
                      <div className="text-15 lh-15 text-light-1 ml-10">
                        Email me exclusive Agoda promotions. I can opt out later as stated in the Privacy Policy.
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12"
                    onClick={e => {
                      submitRegister(e);
                    }}
                  >
                    <a href="#" className="button py-20 -dark-1 bg-blue-1 text-white">
                      Sign In <div className="icon-arrow-top-right ml-15" />
                    </a>
                  </div>
                </div>
                <div className="row y-gap-20 pt-30">
                  <div className="col-12">
                    <div className="text-center">or sign in with</div>
                    <button className="button col-12 -outline-blue-1 text-blue-1 py-15 rounded-8 mt-10">
                      <i className="icon-apple text-15 mr-10" />
                      Facebook
                    </button>
                    <button className="button col-12 -outline-red-1 text-red-1 py-15 rounded-8 mt-15">
                      <i className="icon-apple text-15 mr-10" />
                      Google
                    </button>
                    <button className="button col-12 -outline-dark-2 text-dark-2 py-15 rounded-8 mt-15">
                      <i className="icon-apple text-15 mr-10" />
                      Apple
                    </button>
                  </div>
                  <div className="col-12">
                    <div className="text-center px-30">
                      By signing in, I agree to GuyVip Terms of Use and Privacy Policy.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-md bg-dark-2">
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <div className="col-auto">
              <div className="row y-gap-20  flex-wrap items-center">
                <div className="col-auto">
                  <div className="icon-newsletter text-60 sm:text-40 text-white" />
                </div>
                <div className="col-auto">
                  <h4 className="text-26 text-white fw-600">Your Travel Journey Starts Here</h4>
                  <div className="text-white">Sign up and we'll send the best deals to you</div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="single-field -w-410 d-flex x-gap-10 y-gap-20">
                <div>
                  <input className="bg-white h-60" type="text" placeholder="Your Email" />
                </div>
                <div>
                  <button className="button -md h-60 bg-blue-1 text-white">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
