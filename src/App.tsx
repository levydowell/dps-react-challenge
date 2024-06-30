import { useEffect, useState } from 'react';
import { RenderClients } from './components/RenderClients';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// https://dummyjson.com/users

function App(): JSX.Element {
	const [customers, setCustomers] = useState([]);
	const [nameSearch, setNameSearch] = useState('');
	const [city, setCity] = useState([]);

	async function fetchData() {
		const response = await fetch('https://dummyjson.com/users');
		const customerData = await response.json();
		return customerData.users;
	}

	useEffect(() => {
		fetchData().then((customerData) => {
			setCustomers(customerData);
		});
	}, []);

	const handleNameSearch = (event) => {
		setNameSearch(event.target.value);
	};

	const handleCitySearch = (event) => {
		setCity(event.target.value);
	};

	const filterNames = customers.filter((customer) => {
		return (
			customer.firstName
				.toLowerCase()
				.startsWith(nameSearch.toLowerCase()) ||
			customer.lastName.toLowerCase().startsWith(nameSearch.toLowerCase())
		);
	});

	return (
		<div className="border rounded">
			<div className="input-fields">
				<label>
					Name
					<input
						className="input"
						value={nameSearch}
						onChange={handleNameSearch}
					/>
				</label>

				<label>
					City
					<select
						className="input"
						value={city}
						onChange={handleCitySearch}
					>
						<option value={''}></option>
						{customers.map((customer) => (
							<option key={customer.id}>
								{customer.address.city}
							</option>
						))}
					</select>
				</label>

				<label>
					Highlight oldest per city: <input type="checkbox" />
				</label>
			</div>

			<RenderClients
				clients={nameSearch === '' ? customers : filterNames}
				city={city}
			/>
		</div>
	);
}

export default App;
