
import React, { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import InputElement from "../../../components/Elements/InputField/InputElement";
import api from "../../../Axios_api_cfg";
import Cookies from "js-cookie";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailNotExists, setEmailNotExists] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const handleChange =  (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const checkEmail = async (e)=>{
    handleChange(e)
    e.preventDefault()
    try {
      // Assuming you have defined the fetchBaseQuery function correctly.
      // If not, replace it with the appropriate function for making API requests.
      const response = await fetchBaseQuery.post('/login', formData);
      console.log('Form submitted successfully!', response.data);

    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Email not exists') {
        console.error('Email not exists');
        setEmailNotExists(true);
      } else if (error.response && error.response.status === 400 && error.response.data.message === 'password is wrong') {
        console.error('Password is wrong');
        setPasswordWrong(true);
      } else {
        console.log('An error occurred while checking login credentials.');
      }
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', formData);
      console.log('Form submitted successfully!');

      if (response.status === 202) {
        console.log("Here's the id:", response);

        // Get the token from the cookie and store it in a variable
        const token = response.data.token
        localStorage.setItem('jwt',token)
        localStorage.setItem('level',(response.data.level));
        localStorage.setItem('userInfos', JSON.stringify({
          id:response.data.id,
          name: response.data.name,
          email: response.data.email,
          level: response.data.level
        }));

        console.log(token);

        // Set the token in Axios' default headers

        // You don't need to set the jwt cookie again with 'Cookies.set('jwt', token)' since it's already set by the server-side.

        // Reload the page (optional, depending on your application flow)
        window.location.reload();
        // Redirect to a specific page (optional, depending on your application flow)
        window.location.href = '/';
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Email not exists') {
        console.error('Email not exists');
        setEmailNotExists(true);
      } else if (error.response && error.response.status === 400 && error.response.data.message === 'password is wrong') {
        console.error('Password is wrong');
        setIsWrongPassword(true);
      } else {
        console.error('Form submission error:', error);
      }
    }
  };




  return (
    <CoverLayout
        title="Welcome back"
        description="Enter your email and password to sign in"
        image={curved9}
    >
      <form onSubmit={handleSubmit}>
      <SoftBox >
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <InputElement
              name="email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={emailNotExists}
              message={"No account found with this email address, create a new one !"}
              required
              icon="bi bi-lock"
              path="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"
              path2="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <InputElement
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
              isInvalid={isWrongPassword}
              message={"The password is wrong!"}
              value={formData.password}
              required
              icon="bi bi-lock"
              path="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>

          <button className="submitButton" type="submit" onClick={handleSubmit} >
            sign in
          </button>


        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      </form>
    </CoverLayout>
  );
}

export default SignIn;
