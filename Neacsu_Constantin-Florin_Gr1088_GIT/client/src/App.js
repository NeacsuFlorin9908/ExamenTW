import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movies from './components/movies';
import CrewMembers from './components/crewMembers';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route exact path='/crewMembers' element={<CrewMembers/>} />
						<Route exact path='/' element={<Movies/>} />
					</Routes>
				</BrowserRouter>
			</header>
		</div>
	);
}

export default App;
