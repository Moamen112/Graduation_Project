import "./App.css";
import { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./common/Nav";
import SideNav from "./common/SideNav";
import Departments from "./component/Departments";
import EditSubject from "./component/EditSubject";
import Faculty from "./component/Faculty";
import Proffessor from "./component/Proffessor";
import Subjects from "./component/Subjects";
import SubjectQues from "./component/SubjectQues";
import Admins from "./component/Admins";
import Questions from "./component/Questions";
import University from "./component/University";
import FacultyUni from "./component/FacultyUni";
import DepartmentAdmin from "./component/DepartmentAdmin";
import LandingUni from "./component/LandingUni";

function App() {
	const [reSize, setResize] = useState(false);
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	console.log(size);

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
				/>
				<Nav
					handleClick={handleClick}
					resizeStyle={handleReSizechange}
				/>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<Proffessor
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
