import "./App.css";
import Nav from "./common/Nav";
import SideNav from "./common/SideNav";
import Faculty from "./component/Faculty";
import Proffessor from "./component/Proffessor";

function App() {
	return (
		<div className="App">
			<Nav />
			<SideNav />
			<Proffessor />
		</div>
	);
}

export default App;
