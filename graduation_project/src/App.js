import "./App.css";
import Departments from "./component/Departments";
import Subjects from "./component/Subjects";
import EditSubject from "./component/EditSubject";
import SideNav from "./common/SideNav";
import Nav from "./common/Nav";
import StudentProfile from "./component/StudentProfile";
import StudentPortal from "./component/StudentPortal";
import StudentQues from "./component/StudentQues";

function App() {
	return (
		<div className="App">
			<Nav />
			<StudentProfile />
		</div>
	);
}

export default App;
