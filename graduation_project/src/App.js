import logo from "./logo.svg";
import "./App.css";
import Departments from "./component/Departments";
import SideNav from "./common/SideNav";

function App() {
	return (
		<div className="App">
			<SideNav />
			<Departments />
		</div>
	);
}

export default App;
