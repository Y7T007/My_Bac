import api from "Axios_api_cfg";

let isFetched = false;
let StudentRecords = [];
let labels = [];
let scores = [];
let gradientLineChartData={};
// Function to get the week number for a given date
function getWeekNumber(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000)) + 1;
  return Math.ceil(days / 7);
}

const fetchStudentRecords = async () => {
  try {
    const res = await api.get(`/quiz/records/get-records`);
    const records = JSON.stringify(res.data);
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
  } catch (e) {
    console.log("error: ", e);
  }
};

if (!isFetched) {
  fetchStudentRecords().then((r) => {
    console.log(r);

    gradientLineChartData = {
      labels,
      datasets: [
        {
          label: "Websites",
          color: "dark",
          data: scores,
        },
      ],
    };

    console.log('\t\t\t the final data is:', gradientLineChartData);
  });
  isFetched = true;
}

export default gradientLineChartData;
