import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import Socials from 'layouts/authentication/components/Socials';
import Separator from 'layouts/authentication/components/Separator';
import InputElement from 'components/Elements/InputField/InputElement';
import api from '../../../Axios_api_cfg';
import curved6 from 'assets/images/curved-images/curved14.jpg';
import {dark} from "@mui/material/styles/createPalette";
import InputDropMenu from "../../../components/Elements/InputField/InputDropMenu";
require('./signup.css')

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    level: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/add-course', formData);
      console.log('Form submitted successfully!', response.data);
      setFormData({ name: '', email: '', password: '',city:'' ,level:''});
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
      <BasicLayout
          title="Welcome!"
          description="Use these awesome forms to login or create a new account in your project for free."
          image={curved6}
      >
        <Card>


            <SoftBox p={3} mb={1} textAlign="center">
              <SoftTypography variant="h5" fontWeight="medium">
              Register with
            </SoftTypography>
            </SoftBox>
            <SoftBox mb={2}>
              <Socials />
            </SoftBox>
            <Separator />
            <form onSubmit={handleSubmit}>
            <SoftBox pt={2} pb={3} px={3}>

              <SoftBox component="form" role="form">
              <InputElement
                  name="name"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  icon="bi bi-person"
                  path="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
              />
              <InputElement
                  name="email"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  icon="bi bi-lock"
                  path="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"
                  path2="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
              />
              <InputElement
                  name="password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  icon="bi bi-lock"
                  path="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
              />


              <br/>
              <SoftBox display="flex" alignItems="center">
                <Checkbox />
                <SoftTypography
                    variant="button"
                    fontWeight="regular"
                    sx={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  &nbsp;&nbsp;I agree to the&nbsp;
                </SoftTypography>
                <SoftTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    textGradient
                >
                  Terms and Conditions
                </SoftTypography>
              </SoftBox>

              <SoftBox mt={4} mb={1}>

                  <button className="submitButton" type="submit" >
                    sign up
                  </button>


              </SoftBox>

              <SoftBox mt={3} textAlign="center">
                <SoftTypography variant="button" color="text" fontWeight="regular">
                  Already have an account?&nbsp;
                  <SoftTypography
                      component={Link}
                      to="/authentication/sign-in"
                      variant="button"
                      color="dark"
                      fontWeight="bold"
                      textGradient
                  >
                    Sign in
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </SoftBox>

          </SoftBox>
          </form>

        </Card>
      </BasicLayout>
  );
}

export default SignUp;
