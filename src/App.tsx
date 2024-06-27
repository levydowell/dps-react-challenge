import dpsLogo from './assets/DPS.svg';
import { useEffect, useState } from 'react';
import { RenderClients } from './components/RenderClients';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// https://dummyjson.com/users

function App(): JSX.Element {
	const [customers, setCustomers] = useState([]);

	async function fetchData() {
		const response = await fetch('https://dummyjson.com/users');
		const customerData = await response.json();
		// console.log('success', userData.users);
		return customerData.users;
	}

	useEffect(() => {
		fetchData().then((customerData) => {
			console.log('useEffect', customerData);
			setCustomers(customerData);
		});
	}, []);

	return (
		<div className="border rounded">
			<div className="input-fields">
				<input size={5} className="input" />
				<select className="input"></select>
				<label>
					Highlight oldest per city: <input type="checkbox" />
				</label>
			</div>

			<RenderClients clients={customers} />
		</div>
	);
}

export default App;
