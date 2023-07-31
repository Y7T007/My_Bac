/* eslint-disable react/prop-types */
// Soft UI Dashboard React components


// Images
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import { useState, useEffect } from "react";

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

function CoursesTableData() {
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

  return { columns, rows };
}

export default CoursesTableData;
