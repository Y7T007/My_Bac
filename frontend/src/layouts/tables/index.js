
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
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import {useEffect, useState} from "react";
import SoftBadge from "../../components/SoftBadge";
import SoftAvatar from "../../components/SoftAvatar";

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
function Tables() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/courses/");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const rows = data.map((course) => ({
    course: (
        <Course image={course.course.image} name={course.course.name} dispo={course.course.dispo} />
    ),
    function: (
        <Function Difficulty={course.function.Difficulty} supply_item={course.function.supply_item} />
    ),
    status: (
        <SoftBadge variant="gradient" badgeContent={course.status} color="success" size="xs" container />
    ),
    employed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {course.employed}
        </SoftTypography>
    ),
    action: (
        <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
        >
          Edit
        </SoftTypography>
    ),
  }));
  const columns = [
    { name: "course", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    { name: "action", align: "center" },
  ];

  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Courses table</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Projects table</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
