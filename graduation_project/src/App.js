import "./App.css";
import { useState, useEffect, useLayoutEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Nav from "./common/Nav";
import SideNav from "./common/SideNav";
import Departments from "./component/Departments";
import EditDepartments from "./component/EditDepartments";
import EditSubject from "./component/EditSubject";
import Faculty from "./component/Faculty";
import Proffessor from "./component/Proffessor";
import Subjects from "./component/Subjects";
import LandingPage from "./component/LandingPage";
import University from "./component/University";
import FacultyUni from "./component/FacultyUni";
import LandingUni from "./component/LandingUni";
import Faculties from "./component/Faculties";
import Questions from "./component/Questions";

function App() {
	const [reSize, setResize] = useState(false);
	const [size, setSize] = useState([0, 0]);
	const currentPath = window.location.pathname.split("/");
	console.log(currentPath[1]);

	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	const handleClick = () => {
		setResize(!reSize);
	};

	useEffect(() => {
		if (size[0] < 950) {
			setResize(false);
		}
	}, [size]);

	const handleReSizechange = reSize ? { width: "95%", marginLeft: "5%" } : {};
	return (
		<div className="App">
			<Router>
				<SideNav
					reSize={reSize}
					size={size}
					page={currentPath[1]}
				/>
				<Nav
					handleClick={handleClick}
					resizeStyle={handleReSizechange}
					page={currentPath[1]}
				/>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<Faculty
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="/faculty/departments"
						element={<Departments />}
					/>
					<Route
						path="/facultyeditdep"
						element={<EditDepartments />}
					/>
					<Route
						path="/faculty/proffesors"
						element={<Proffessor />}
					/>
					<Route
						path="/facultyeditsubj"
						element={<EditSubject />}
					/>
					<Route
						path="/facultysubj"
						element={<Subjects />}
					/>
					<Route
						path="/landing"
						element={<LandingPage />}
					/>
					<Route
						path="/university"
						element={<University />}
					/>
					<Route
						path="university/faculties/:facultyId"
						element={<FacultyUni />}
					/>
					<Route
						path="/landinguni"
						element={<LandingUni />}
					/>
					<Route
						path="university/faculties"
						element={
							<Faculties
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="/questions"
						element={
							<Questions
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
