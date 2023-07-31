
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import PropTypes from 'prop-types';

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import projectsTableData from "layouts/tables/data/projectsTableData";
import React, {useEffect, useState} from "react";
import SoftBadge from "../../components/SoftBadge";
import SoftAvatar from "../../components/SoftAvatar";

import api from "../../Axios_api_cfg";
import Sidebar from "./SideBar/SideBar";
import levels from "../../context/levels";
import {Link} from "react-router-dom";

function Course({ image, name, dispo }) {

  return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox mr={2}>
          <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {name}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {dispo}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
  );
}
Course.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dispo: PropTypes.string.isRequired,
};

function Function({ Difficulty, supply_item }) {
  return (
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          {Difficulty}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {supply_item}
        </SoftTypography>
      </SoftBox>
  );
}
Function.propTypes = {
    Difficulty: PropTypes.string.isRequired,
    supply_item: PropTypes.string.isRequired,
};


function CourseByCourse() {
    const level = JSON.parse(localStorage.getItem('userInfos')).level;
    console.log(level)

    const subjects = levels.find((l) => l.levelId === level).subjects;
    console.log(subjects);

  return (
    <DashboardLayout>
      <DashboardNavbar />

        <SoftBox py={3}>
        <SoftBox mb={3}>
            <div className="home">
                <div className="intro-box">
                    <div className="intro-texts">
                        <h1 className="intro-title">{levels.find(l=>l.levelId===level).name} Courses</h1>
                        <p className="intro-description" style={{fontSize:"50px"}}>COURSES</p>
                    </div>
                    <div className="intro-icon">
                        <i className="bi bi-question-circle"></i>
                    </div>
                </div>

                <div className="level-boxes">
                    {subjects.map((subject) => (
                        <div
                            key={subject.key}
                            className="level-box"
                            style={{ backgroundColor: subject.color }}
                        >
                            <div className="level-text">
                                <h2 className="level-name">{subject.name}</h2>
                                <span>{levels.find(l=>l.levelId===level).name}</span>
                            </div>
                            <Link className="level-link" to={subject.key}>
                                <span>Show All Courses</span> <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>

            <Card>

                {/*<SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>*/}
            {/*  <SoftTypography variant="h6">Courses table</SoftTypography>*/}
            {/*</SoftBox>*/}
            {/*<SoftBox*/}
            {/*  sx={{*/}
            {/*    "& .MuiTableRow-root:not(:last-child)": {*/}
            {/*      "& td": {*/}
            {/*        borderBottom: ({ borders: { borderWidth, borderColor } }) =>*/}
            {/*          `${borderWidth[1]} solid ${borderColor}`,*/}
            {/*      },*/}
            {/*    },*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Table columns={columns} rows={rows} />*/}
            {/*</SoftBox>*/}
          </Card>
        </SoftBox>
        <Card>

        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CourseByCourse;
