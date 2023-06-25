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
import Faculty from "./component/Faculty";
import Proffessor from "./component/Proffessor";
import Subjects from "./component/Subjects";
import LandingPage from "./component/LandingPage";
import University from "./component/University";
import FacultyUni from "./component/FacultyUni";
import LandingUni from "./component/LandingUni";
import Faculties from "./component/Faculties";
import Questions from "./component/Questions";
import Admins from "./component/Admins";
import DepAnalysis from "./component/DepAnalysis";
import FacultyAdmins from "./component/FacultyAdmins";
import DepartmentAdmin from "./component/DepartmentAdmin";
import SubjectAnalysis from "./component/SubjectAnalysis";
import ProfessorHome from "./component/ProfessorHome";
import ProfessorSubject from "./component/ProfessorSubject";
import ProfessorProfile from "./component/ProfessorProfile";
import StudentProfile from "./component/StudentProfile";
import StudentPortal from "./component/StudentPortal";
import StudentQues from "./component/StudentQues";
import Cookies from "js-cookie";
import SubjectQues from "./component/SubjectQues";
import AdminsUni from "./component/AdminsUni";
import DepartmentProfessors from "./component/DepartmentProfessors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [reSize, setResize] = useState(false);
	const [size, setSize] = useState([0, 0]);
	const currentPath = window.location.pathname.split("/");

	Cookies.set("id", "706870e9-e373-11ed-b719-105badc84798");

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
				{currentPath[1] === "professor" ||
				currentPath[1] === "student" ? (
					""
				) : (
					<SideNav
						reSize={reSize}
						size={size}
						page={currentPath[1]}
					/>
				)}
				<Nav
					handleClick={handleClick}
					resizeStyle={handleReSizechange}
					page={currentPath[1]}
				/>
				<Routes>
					<Route
						path="/university"
						element={<University />}
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
						path="university/faculties/:facultyId"
						element={<FacultyUni />}
					/>
					<Route
						path="university/admins"
						element={
							<AdminsUni
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
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
						path="/faculty/proffesors"
						element={<Proffessor />}
					/>
					<Route
						path="faculty/departments/:departmentId"
						element={
							<DepAnalysis
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="/faculty/admins"
						element={
							<FacultyAdmins
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>

					<Route
						path="/landing"
						element={<LandingPage />}
					/>

					<Route
						path="/landinguni"
						element={<LandingUni />}
					/>

					<Route
						path="department"
						element={
							<DepartmentAdmin
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="/department/professors"
						element={
							<DepartmentProfessors
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="/department/questionnaire"
						element={
							<Questions
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="department/subjects"
						element={<Subjects />}
					/>
					<Route
						path="department/subjects/:subjectId"
						element={
							<SubjectAnalysis
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="professor"
						element={
							<ProfessorHome
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="professor/subjects/:subjectId/questionnaire/:questionnaireId"
						element={
							<ProfessorSubject
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="professor/:profId"
						element={
							<ProfessorProfile
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="student"
						element={
							<StudentPortal
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="student/profile"
						element={
							<StudentProfile
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="student/questionnaires"
						element={
							<StudentQues
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
					<Route
						path="student/questionnaires/:questionnairId"
						element={
							<SubjectQues
								reSize={reSize}
								resizeStyle={handleReSizechange}
							/>
						}
					/>
				</Routes>
				<ToastContainer />
			</Router>
		</div>
	);
}

export default App;
