import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import SoftBox from "../../components/SoftBox";
import React from "react";
import levels from "../../context/levels";
import {Note} from "./Note";

export const Notes = () => {
	return (
		<>
			<DashboardLayout>
				<DashboardNavbar />
				<SoftBox py={4}>
					<SoftBox mb={3}>
						<div className="home">
							<div className="intro-box">
								<div className="intro-texts">
									<h1 className="intro-title"> Create and Review your private notes : </h1>
									<p className="intro-description" style={{fontSize:"40px"}}>NOTES</p>
								</div>
								<div className="intro-icon">
									<i className="bi bi-question-circle"></i>
								</div>
							</div>
							<Note title={"Create new Note"} body={"testining"} isCreateNote={true}/>
						</div>

					</SoftBox>

				</SoftBox>
			</DashboardLayout>
			</>
	)
}