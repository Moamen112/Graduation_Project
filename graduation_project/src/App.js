import "./App.css";
import Nav from "./common/Nav";
import SideNav from "./common/SideNav";
import Faculty from "./component/Faculty";

function App() {
	return (
		<div className="App">
			<Nav />
			<SideNav />
			<Faculty />
		</div>
	);
}

export default App;
