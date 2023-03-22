import logo from "./logo.svg";
import "./App.css";
import Departments from "./component/Departments";
import Subjects from "./component/Subjects";
import EditSubject from "./component/EditSubject";
import SideNav from "./common/SideNav";
import Nav from "./common/Nav";

function App() {
	return (
		<div className="App">
			<Nav />
			<SideNav />
			<EditSubject />
		</div>
	);
}

export default App;
