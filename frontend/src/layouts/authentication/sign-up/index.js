import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import Socials from 'layouts/authentication/components/Socials';
import Separator from 'layouts/authentication/components/Separator';
import InputElement from 'components/Elements/InputField/InputElement';
import api from '../../../Axios_api_cfg';
import curved6 from 'assets/images/curved-images/curved14.jpg';
import InputDropMenu from "../../../components/Elements/InputField/InputDropMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

require('./signup.css')


function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    level: ' ',
  });
  const [emailExists, setEmailExists] = useState(false);

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
// CSS for the divider element
  const dividerStyle = {
    borderTop: '1px solid #ccc', // Define the style of the horizontal line
    margin: '8px 0', // Adjust the spacing as needed
    padding: '0', // You can add padding if desired
  };


  const CustomOption = ({ label, isDivider }) => {
    if (isDivider) {
      return <div style={dividerStyle}></div>;
    } else {
      return <div>{label}</div>;
    }
  };

  CustomOption.propTypes = {
    label: PropTypes.string, // Add PropTypes validation for 'label'
    isDivider: PropTypes.bool, // Add PropTypes validation for 'isDivider'
  };
  const handlePasswordChange = (e) => {
    const isSecure = isPasswordSecured(e.target.value);
    setIsPasswordSecure(isSecure);
    handleChange(e)
  };

  const isPasswordSecured = (password) => {
    // Password validation criteria
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[@#$%^&+=]/;

    return (
        password.length >= minLength &&
        uppercaseRegex.test(password) &&
        lowercaseRegex.test(password) &&
        digitRegex.test(password) &&
        specialCharRegex.test(password)
    );
  };
  const regions = [
    { label: 'Tanger - Tétouan - Al Hoceima', value: 'tanger-tetouan-al-hoceima' },
    { label: "L'Oriental", value: 'l-oriental' },
    { label: 'Fès - Meknès', value: 'fes-meknes' },
    { label: 'Rabat - Salé - Kénitra', value: 'rabat-sale-kenitra' },
    { label: 'Beni Mellal - Khénifra', value: 'beni-mellal-khenifra' },
    { label: 'Casablanca - Settat', value: 'casablanca-settat' },
    { label: 'Marrakech - Safi', value: 'marrakech-safi' },
    { label: 'Drâa - Tafilalet', value: 'draa-tafilalet' },
    { label: 'Souss - Massa', value: 'souss-massa' },
    { label: 'Guelmim - Oued Noun', value: 'guelmim-oued-noun' },
    { label: 'Laâyoune - Saguia al Hamra', value: 'laayoune-saguia-al-hamra' },
    { label: 'Dakhla - Oued Ed-Dahab', value: 'dakhla-oued-ed-dahab' },
  ];


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDropdownChange = (e) => {
    console.log("drop down changed and the value is ",e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/add-student', formData);
      console.log('Form submitted successfully!', response.data);
      const currentDomain = `http//${window.location.hostname}:${window.location.port}`;
      window.location.href=`${currentDomain}/authentication/sign-in`;

      setFormData({ name: '', email: '', password: '', city: '', level: '' });
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Email already exists') {
        console.error('Email already exists');
        setEmailExists(true);
      } else {
        console.error('Form submission error:', error);
      }
    }
  };
  const token = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage

  return (
    (!token)? (
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

                <SoftBox >

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
                      isInvalid={emailExists}
                      message={"This email already exists, choose another one or login!"}
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
                      onChange={handlePasswordChange}
                      isInvalid={!isPasswordSecure}
                      message={"The Password should contain at least Maj, min, num, special characters"}
                      required
                      icon="bi bi-lock"
                      path="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
                  />
                  <InputDropMenu
                      name="city"
                      required={true}
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={handleDropdownChange}
                      icon="bi bi-geo"
                      path="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                      options={regions.map((city) => ({
                        value: city.value,
                        label: city.label,
                      }))}
                  />
                  <InputDropMenu
                      name="level"
                      required={true}
                      type="text"
                      id="level"
                      value={formData.level}
                      onChange={handleDropdownChange}
                      icon="bi bi-mortarboard"
                      path="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z"
                      path2="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z"
                      options={[
                        { value: 'tc-s', label: 'Tron Commun Scientific' },
                        { value: 'tc-l', label: 'Tron Commun Lettre' },
                        { isDivider: true }, // Add a divider
                        { value: '1bac-s', label: '1er Bac Scientific' },
                        { value: '1bac-l', label: '1er Bac Lettre' },
                        { isDivider: true }, // Add a divider
                        { value: '2bac-sx', label: '2eme Bac Sc. Experimental' },
                        { value: '2bac-spc', label: '2eme Bac Sc. Physique' },
                        { value: '2bac-ssma', label: '2eme Bac Sc. Maths A' },
                        { value: '2bac-ssmb', label: '2eme Bac Sc. Maths B' },
                      ]}
                  />


                  {/*<SoftBox display="flex" alignItems="center">*/}
                  {/*  <Checkbox />*/}
                  {/*  <SoftTypography*/}
                  {/*      variant="button"*/}
                  {/*      fontWeight="regular"*/}
                  {/*      sx={{ cursor: 'pointer', userSelect: 'none' }}*/}
                  {/*  >*/}
                  {/*    &nbsp;&nbsp;I agree to the&nbsp;*/}
                  {/*  </SoftTypography>*/}
                  {/*  <SoftTypography*/}
                  {/*      component="a"*/}
                  {/*      href="#"*/}
                  {/*      variant="button"*/}
                  {/*      fontWeight="bold"*/}
                  {/*      textGradient*/}
                  {/*  >*/}
                  {/*    Terms and Conditions*/}
                  {/*  </SoftTypography>*/}
                  {/*</SoftBox>*/}

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
    ):
        (
            window.location.href=`/sign-in`
        )



  );
}

export default SignUp;
