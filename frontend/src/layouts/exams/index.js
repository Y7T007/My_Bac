import React from "react";
import "./assets/css/style.css";
import "./assets/css/result.css";
import "./assets/css/home.css";
import "./assets/css/quiz.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/QuizContext";
import QuizBox from "./QuizBox";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import SoftBox from "../../components/SoftBox";
import Footer from "../../examples/Footer";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";


export function Exams(){
    return(
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox mt={4}>
                <Provider>
                    <QuizBox />
                </Provider>
            </SoftBox>
            <Footer />
        </DashboardLayout>

    );
}
