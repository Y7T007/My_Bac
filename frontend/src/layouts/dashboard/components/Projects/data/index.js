// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";
import React, { useState,useEffect } from 'react';
// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import api from '../../../../../Axios_api_cfg'; // Make sure to import Axios_api_cfg or any required dependencies
// @mui material components

// Soft UI Dashboard React components


// Images
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function Data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt={name}
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

    const [divisionData, setDivisionData] = useState([]);
    const [importedDiv, setImportedDiv] = useState([]);
    const [isFetched, setIsFetched] = useState(false);


    // Function to fetch division data
    const getDivisionData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('userInfos')).id;
        if (userId != null) {
          const res = await api.get(`/division/get/${userId}`);
          const division = JSON.stringify(res.data);
          setDivisionData(JSON.parse(division));
          return division;
        }
        
      } catch (e) {
        console.log(e);
        setDivisionData([]);
      }
    };
    let division={}
    if (!isFetched) {
      getDivisionData().then(r => { 
        console.log(r);
        if  (r.status===404){
          division= {
            players: ['', 'No user found, please login first'],
              scores: (
                <SoftTypography variant="caption" color="text" fontWeight="medium">
                  _
                </SoftTypography>)
          
        }
      }else{
          division=JSON.parse(r)
          console.log("the division data is :",JSON.parse(r));
          setImportedDiv(
            division.student_id.map((studentId, index) => ({
              players: [logoXD, division.student_names[index]],
              scores: (
                <SoftTypography variant="caption" color="text" fontWeight="medium">
                  {division.student_scores[index]}
                </SoftTypography>
              ),
              
            }))
          )
        }

        
      });
      setIsFetched(true);
    }

  
    // Fetch division data when the component mounts
    useEffect(() => {
      getDivisionData();
    }, []);
  
    return {
      columns: [
        { name: "players", align: "left" },
        { name: "scores", align: "center" },
      ],
      rows: importedDiv,
    };
  }