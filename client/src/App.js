import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InsertValues from './InsertValues';
import OtherPage from './OtherPage';

function App() {
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<Link to='/'>Home</Link>
					<Link to='/other-page'>Other page</Link>
				</header>
				<div>
					<Route exact path='/' component={InsertValues} />
					<Route path='/other-page' component={OtherPage} />
				</div>
			</div>
		</Router>
	);
}

export default App;
