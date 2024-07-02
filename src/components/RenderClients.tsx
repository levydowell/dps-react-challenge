import { Customer } from '../App';

//Create RenderClientsProps interface type for props passed to RenderClients
interface RenderClientsProps {
	clients: Customer[];
	city: string;
	checked: boolean;
}

//React component for rendering the all or filtered clients
export const RenderClients: React.FC<RenderClientsProps> = ({
	clients,
	city,
	checked,
}) => {
	let renderedClients = [];
	console.log(clients);

	//Check for city value from prop. If one exists, filter by clients in that city.
	if (city === '') {
		renderedClients = clients;
	} else {
		renderedClients = clients.filter((client) => {
			return client.address.city === city;
		});
	}

	/**
	 * Get age in years from a provided birthDate
	 * @param birthDate the date to get age of type string
	 * @returns Calculated age
	 */
	const getAge = (birthDate: string) => {
		const today = new Date();
		const dateOfBirth = new Date(birthDate);
		return today.getFullYear() - dateOfBirth.getFullYear();
	};

	/**
	 * Find oldest customer by city for highlighting feature
	 * @param checkClient object of type Customer to determine if oldest age.
	 * @returns The className to be assigned to the customer to toggle highlighting
	 */
	const findOldest = (checkClient: Customer) => {
		const city = checkClient.address.city;
		let oldest = 0;
		clients.forEach((client) => {
			const thisAge = getAge(client.birthDate);
			if (thisAge > oldest && client.address.city === city) {
				oldest = thisAge;
			}
		});
		if (getAge(checkClient.birthDate) >= oldest) {
			return 'customer highlight-customer';
		} else {
			return 'customer';
		}
	};

	return (
		<div className="home-card">
			<div className="customer-header">
				<h5 className="field">Name</h5>
				<h5 className="field">City</h5>
				<h5 className="field">Birthday</h5>
			</div>
			<hr></hr>
			{/* Map out all clients to be rendered, utilizing findOldest() if highlight checkbox is checked. */}
			{renderedClients.map((renderedClient) => (
				<div
					className={
						checked === true
							? findOldest(renderedClient)
							: 'customer'
					}
					key={renderedClient.id}
				>
					<div className="field">
						<h5>
							{renderedClient.firstName} {renderedClient.lastName}
						</h5>
					</div>

					<div className="field">
						<h5>{renderedClient.address.city}</h5>
					</div>

					<div className="field">
						<h5>{renderedClient.birthDate}</h5>
					</div>
				</div>
			))}
		</div>
	);
};
