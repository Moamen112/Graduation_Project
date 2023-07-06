import "./App.css";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	redirect,
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
import Unauthorized from "./component/Unauthorized";
import Cookies from "js-cookie";
import SubjectQues from "./component/SubjectQues";
import AdminsUni from "./component/AdminsUni";
import NotFoundPage from "./component/NotFoundPage";
import DepartmentProfessors from "./component/DepartmentProfessors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLogin from "./component/MainLogin";
import Login from "./component/Login";
import DepartmentAdminRedirect from "./component/DepartmentAdminRedirect";
import { AuthProvider, AuthContext } from "./Context/authProvider";
import Auth from "./component/Auth";

function App() {
	const [reSize, setResize] = useState(false);
	const [size, setSize] = useState([0, 0]);

	const [currentPath, setCurrentPath] = useState(
		window.location.pathname.split("/"),
	);
	useEffect(() => {
		const checkLocation = () => {
			setCurrentPath(window.location.pathname.split("/"));
			// Check the current URL path and perform actions based on it

			// Additional logic goes here
		};

		// Add event listener for the popstate event
		window.addEventListener("popstate", checkLocation);

		// Initial check when the page loads
		checkLocation();
	}, [window.location.pathname]);
	const { auth, setAuth, handleLogin } = useContext(AuthContext);

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

	useEffect(() => {
		// Check if authentication data exists in cookies
		const token = Cookies.get("token");
		const userId = Cookies.get("userId");
		const role = Cookies.get("role");

		if (token && userId && role) {
			handleLogin(role, token, userId);
		}
	}, []);

	const handleReSizechange = reSize ? { width: "95%", marginLeft: "5%" } : {};
	return (
		<div className="App">
			<Router>
				{currentPath[1] === "faculty" ||
				currentPath[1] === "department" ||
				currentPath[1] === "university" ? (
					<SideNav
						reSize={reSize}
						size={size}
						page={currentPath[1]}
					/>
				) : (
					""
				)}
				{currentPath[1] === "faculty" ||
				currentPath[1] === "department" ||
				currentPath[1] === "university" ||
				currentPath[1] === "professor" ||
				currentPath[1] === "student" ? (
					<Nav
						handleClick={handleClick}
						resizeStyle={handleReSizechange}
						page={currentPath[1]}
					/>
				) : (
					""
				)}
				<AuthProvider>
					<Routes>
						<Route
							path="/unauthorized"
							element={<Unauthorized />}
						/>
						<Route
							element={
								<Auth allowedRoles={["University Admin"]} />
							}>
							<Route
								path="university"
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
						</Route>
						<Route
							element={<Auth allowedRoles={["Faculty Admin"]} />}>
							<Route
								path="/faculty"
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
						</Route>
						<Route
							path="/landing"
							element={<LandingPage />}
						/>
						<Route
							path="/landinguni"
							element={<LandingUni />}
						/>
						<Route
							element={
								<Auth allowedRoles={["Department Admin"]} />
							}>
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
						</Route>
						<Route element={<Auth allowedRoles={["Professor"]} />}>
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
						</Route>
						<Route element={<Auth allowedRoles={["Student"]} />}>
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
						</Route>
						<Route
							path="/"
							element={
								<MainLogin
									reSize={reSize}
									resizeStyle={handleReSizechange}
								/>
							}
						/>{" "}
						<Route
							path="login/:role"
							element={
								<Login
									reSize={reSize}
									resizeStyle={handleReSizechange}
								/>
							}
						/>
						<Route
							path="*"
							element={<NotFoundPage />}
						/>
					</Routes>
				</AuthProvider>
				<ToastContainer />
			</Router>
		</div>
	);
}

export default App;
