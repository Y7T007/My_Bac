/*
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav.
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import CourseByCourse  from "layouts/course" ;


// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import {SignOut} from "./layouts/authentication/sign-out/SignOut";
import {Exams} from "./layouts/exams";
import DashboardNavbar from "./examples/Navbars/DashboardNavbar";
import SoftBox from "./components/SoftBox";
import {Provider} from "./layouts/exams/context/QuizContext";
import QuizBox from "./layouts/exams/QuizBox";
import Footer from "./examples/Footer";
import DashboardLayout from "./examples/LayoutContainers/DashboardLayout";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./layouts/exams/components/Home";
import Quiz from "./layouts/exams/components/Quiz";
import Result from "./layouts/exams/components/Result";
import Error from "./layouts/exams/components/Error";
import HomeQuiz from "./layouts/exams/components/HomeQuiz";
import HomeCourses from "./layouts/course/HomeCourses";
import {Notes} from "./layouts/notes";
const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "course",
    route: "/course",
    icon: <MenuBookTwoToneIcon />,
    component: <CourseByCourse />,
    noCollapse: true,
  },
  {
    route: "/course/:subject",
    component: (
        <DashboardLayout>
          <DashboardNavbar />
          <SoftBox mt={4}>
              <HomeCourses />
          </SoftBox>
          <Footer />
        </DashboardLayout>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Quizzes",
    key: "quizzes",
    route: "/quizzes",
    icon: <SchoolTwoToneIcon size="12px" />,
    noCollapse: true,
    component: (
        <DashboardLayout>
          <DashboardNavbar />
          <SoftBox mt={4}>

              <Home />
              <SoftBox mt={12}>
              </SoftBox>

          </SoftBox>
          <Footer />
        </DashboardLayout>
    ),
  },
  {

    route: "/quizzes/:subject",

    component: (
        <DashboardLayout>
          <DashboardNavbar />
          <SoftBox mt={4}>

              <HomeQuiz  />
              <SoftBox mt={12}>
              </SoftBox>

          </SoftBox>
          <Footer />
        </DashboardLayout>
    ),
  },
  {
    route: "/quizzes/:subject/:level/:id",
    component: (
        <DashboardLayout>
          <DashboardNavbar isMini={true} />
          <SoftBox mt={4}>
            <Provider>
                  <Quiz />
              <SoftBox mt={12}>
              </SoftBox>
            </Provider>
          </SoftBox>
          <Footer />
        </DashboardLayout>
    ),
  },
  {
    route: "/quizzes/result/:id",
    component: (
        <DashboardLayout>
          <DashboardNavbar />
          <SoftBox mt={4}>
            <Provider>
                  <Result />

              <SoftBox mt={12}>
              </SoftBox>
            </Provider>
          </SoftBox>
          <Footer />
        </DashboardLayout>
    ),
  },
  // {
  //   route: "/exams",
  //   component: (
  //       <DashboardLayout>
  //         <DashboardNavbar />
  //         <SoftBox mt={4}>
  //           <Provider>
  //
  //                 <Routes>
  //                   <Route path="/" element={<Home />} />
  //                   <Route path="/quiz/:level" element={<Quiz />} />
  //                   <Route path="/result" element={<Result />} />
  //                   <Route path="/*" element={<Error />} />
  //                 </Routes>
  // //
  //             <SoftBox mt={12}>
  //             </SoftBox>
  //
  //           </Provider>
  //         </SoftBox>
  //         <Footer />
  //       </DashboardLayout>
  //   ),
  // },
  {
    type: "collapse",
    name: "Planning",
    key: "planning",
    route: "/planning",
    icon: <CalendarMonthTwoToneIcon size="12px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Notes",
    key: "notes",
    route: "/notes",
    icon: <EditNoteTwoToneIcon size="12px" />,
    component: <Notes />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Forums",
    key: "forums",
    route: "/forums",
    icon: <ForumTwoToneIcon size="12px" />,
    component: <RTL />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Groups",
    key: "groups",
    route: "/groups",
    icon: <PeopleAltTwoToneIcon size="12px" />,
    component: <RTL />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    route: "/authentication/sign-out",
    icon: <Document size="12px" />,
    component: <SignOut />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
