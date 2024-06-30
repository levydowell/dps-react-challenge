

export const RenderClients = ({ clients, city }) => {
  console.log('cities', city);
  let renderedClients = [];

  if (city.length === 0) {
    renderedClients = clients;
  } else {
    renderedClients = clients.filter((client) => {
      return (
        client.address.city === city
      );
    });
  };

  return (
    <div className="home-card">

      {renderedClients.map((renderedClient) => (
        <div className='customer' key={renderedClient.id}>
          <div>
            {renderedClient.firstName} {renderedClient.lastName} 
          </div>

          <div>
            {renderedClient.address.city} 
          </div>

          <div>
            {renderedClient.birthDate}
          </div>
          
        </div>
      ))}

    </div>
  )
}