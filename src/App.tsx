import dpsLogo from './assets/DPS.svg';
import './App.css';
import { useEffect, useState } from 'react';

// https://dummyjson.com/users

function App(): JSX.Element {
	const [users, setUsers] = useState([]);

	async function fetchData() {
		const response = await fetch('https://dummyjson.com/users');
		const userData = await response.json();
		// console.log('success', userData.users);
		return userData.users;
	}

	useEffect(() => {
		fetchData().then((users) => {
			console.log('useEffect', users);
			setUsers(users);
		});
	}, []);

	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<ul>
					{users.map((user) => (
						<li key={user.id}>
							{user.firstName} {user.lastName} {user.address.city}{' '}
							{user.birthDate}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default App;
