

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

//  Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

//  Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

//  Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import api from "Axios_api_cfg";

import { useEffect, useState } from "react";
function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  useEffect(() => {

    // Check if the page is being loaded or reloaded
      const userInfos = localStorage.getItem('userInfos');
      if (!userInfos && window.location.href !== '/authentication/sign-in') {
        // User is not logged in and not on the sign-in page, redirect to the sign-in page
        window.location.href = '/authentication/sign-in';
      }
  }, []);


let StudentRecords = [];
let labels = [];
let scores = [];
const [gradientLineChartData,setGradientLineChartData]=useState({});
const [isFetched,setisFetched]=useState(false);
// Function to get the week number for a given date
function getWeekNumber(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000)) + 1;
  return Math.ceil(days / 7);
}

const fetchStudentRecords = async () => {
  try {
    let records=[];
    const res = await api.get(`/quiz/records/get-records`);
    records = JSON.stringify(res.data);
    StudentRecords = JSON.parse(records);
    console.log(StudentRecords);

    // Now that the data is fetched, you can process it here
    const dataWithWeek = StudentRecords.map((record) => {
      const createdAt = new Date(record.createdAt);
      const weekNumber = getWeekNumber(createdAt);
      return { ...record, weekNumber };
    });

    const groupedByWeek = dataWithWeek.reduce((acc, record) => {
      if (!acc[record.weekNumber]) {
        acc[record.weekNumber] = [];
      }
      acc[record.weekNumber].push(record);
      return acc;
    }, {});

    const scoresByWeek = Object.keys(groupedByWeek).map((weekNumber) => ({
      weekNumber: parseInt(weekNumber, 10),
      totalScore: groupedByWeek[weekNumber].reduce((sum, record) => sum + record.Score, 0),
    }));

    console.log('score by weeks is:', scoresByWeek);

    labels = scoresByWeek.map((weekData) => `Week ${weekData.weekNumber}`);
    scores = scoresByWeek.map((weekData) => weekData.totalScore);
    console.log('count are \t\t\t\t',JSON.stringify(StudentRecords));

    if(JSON.stringify(StudentRecords)!=='[]'){
      setGradientLineChartData ( {
        labels,
        datasets: [
          {
            label: "Score",
            color: "dark",
            data: scores,
          },
        ],
      });
      console.log('\t\t\t the final data is:', gradientLineChartData);
    }else{
      setGradientLineChartData ( {
        labels:['No Data: you should pass a quiz to begin',''],
        datasets: [
          {
            label: "Score",
            color: "dark",
            data: [0,0,0,0,0,0],
          },
        ],
      });
    }
  } catch (e) {
    console.log("error: ", e);
  }
};

if (!isFetched) {
  fetchStudentRecords().then((r) => {
    console.log('returned values are :',r);



    setisFetched(true);

  })}

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's money" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        {/*<SoftBox mb={3}>*/}
        {/*  <Grid container spacing={3}>*/}
        {/*    <Grid item xs={12} lg={7}>*/}
        {/*      <BuildByDevelopers />*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} lg={5}>*/}
        {/*      <WorkWithTheRockets />*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</SoftBox>*/}
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              {/*/*/}
              <Projects />

            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Performance"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      Your score{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in the last weeks
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
