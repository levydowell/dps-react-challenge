import { useEffect, useState } from 'react';
import { RenderClients } from './components/RenderClients';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Create Customer interface type for data recieved from API.
export interface Customer {
	id: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	address: {
		city: string;
	};
}

/**
 *
 * @returns JSX React component
 */
const App: React.FC = (): JSX.Element => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [nameSearch, setNameSearch] = useState<string>('');
	const [city, setCity] = useState<string>('');
	const [isChecked, setIsChecked] = useState<boolean>(false);

	/**
	 * fetches data from dummyson.com/users
	 * @returns Promise with data of type Customer
	 */
	async function fetchData(): Promise<Customer[]> {
		const response = await fetch('https://dummyjson.com/users');
		const customerData = await response.json();
		return customerData.users;
	}

	//updates customer state upon changes
	useEffect(() => {
		fetchData().then((customerData: Customer[]) => {
			setCustomers(customerData);
		});
	}, []);

	//Event handler to update nameSearch state from user entry.
	const handleNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNameSearch(event.target.value);
	};

	//Event handler to update city State from select city dropdown
	const handleCitySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCity(event.target.value);
	};

	//Event handler to update isChecked state with boolean value
	const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(event.target.checked);
	};

	/**
	 * Function to find all unique cities for city dropdown input
	 * @param customers an array of type Customer containing customer data
	 * @returns array of strings representing all unique cities
	 */
	const allCities = (customers: Customer[]): string[] => {
		const cities: string[] = [];
		customers.forEach((customer) => {
			if (!cities.includes(customer.address.city)) {
				cities.push(customer.address.city);
			}
		});
		return cities;
	};

	const uniqueCities = allCities(customers);

	//Creates shallow of array that matches nameSearch for name filtering input
	const filterNames = customers.filter((customer) => {
		return (
			customer.firstName
				.toLowerCase()
				.startsWith(nameSearch.toLowerCase()) ||
			customer.lastName.toLowerCase().startsWith(nameSearch.toLowerCase())
		);
	});

	return (
		<div className="outside-border">
			<div className="input-fields">
				<label className="labels">
					<h5>Name</h5>
					<input
						className="input"
						value={nameSearch}
						onChange={handleNameSearch}
					/>
				</label>

				<label className="labels">
					<h5>City</h5>
					<select
						className="input"
						value={city}
						onChange={handleCitySearch}
					>
						<option value={''}></option>
						{uniqueCities.map((thisCity, index) => (
							<option key={index}>{thisCity}</option>
						))}
					</select>
				</label>
				<label className="checkbox-label">
					<h5>Highlight oldest per city</h5>
					<input
						className="input checkbox"
						type="checkbox"
						checked={isChecked}
						onChange={handleCheck}
					/>
				</label>
			</div>
			{/* React component that handles rendering logic */}
			<RenderClients
				clients={nameSearch === '' ? customers : filterNames}
				city={city}
				checked={isChecked}
			/>
		</div>
	);
};

export default App;
