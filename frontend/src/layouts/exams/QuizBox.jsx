import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Error from "./components/Error";
import {Route, Routes} from "react-router-dom";


export default function QuizBox() {
	return (

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/exams/quiz/:level" element={<Quiz />} />
					<Route path="/exams/result" element={<Result />} />
					<Route path="/exams/*" element={<Error />} />
				</Routes>

	);
};

