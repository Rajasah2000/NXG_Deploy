import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { validateUser } from '../API';

const Login = () => {
  const navigate = useNavigate()

    const initialValues = {
      email: '',
      password: '',
    };

     const setUserData = (e) => {
   let names = e.target.name;
   let value = e.target.value;
    setUser({ ...user, [names]: value });
     }
       const [user, setUser] = useState(initialValues);

    const validateData = () => {
      let error = {};
      if(user.email===""){
       return toast.error("Email field is required")
      }
          if (user.password === '') {
           return toast.error('Password field is required');
          }

              if (user.email === '' && user.password === "") {
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
        let response = await validateUser(data);
        // console.log("L47", response);

        if (response?.status) {
          console.log('L47fffffffffffff', response?.data?.data);
          let token = response?.data?.data;
          localStorage.setItem('token', token);
          // swal('Login', response?.data.message, 'success');
          toast.success("Login Successfully");
          // setLoginStatus(true);
          navigate('/');
        } else {
          // setLoginStatus(false);
          // swal('Login Denied!', 'Invalid Credentials!', 'error');
           toast.error('User not found.! Or Admin has not verified yet');
          // swal('Login Failed!', 'User not found.!', 'error');
        }
      };

    const submitLogin = async (e) => {
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
                    <h1 className="text-22 fw-500">Welcome back</h1>
                    <p className="mt-10">
                      Don't have an account yet?{' '}
                      <Link to="/signup" className="text-blue-1">
                        Sign up for free
                      </Link>
                    </p>
                  </div>
                  <div className="col-12">
                    <div className="form-input ">
                      <input type="text" required name="email" id="email" onChange={e => setUserData(e)} />
                      <label className="lh-1 text-14 text-light-1">Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-input ">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={e => setUserData(e)}
                      />
                      <label className="lh-1 text-14 text-light-1">Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <a href="#" className="text-14 fw-500 text-blue-1 underline">
                      Forgot your password?
                    </a>
                  </div>
                  <div
                    className="col-12"
                    onClick={(e) => {
                      submitLogin(e);
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
                      By creating an account, you agree to our Terms of Service and Privacy Statement.
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

export default Login;
