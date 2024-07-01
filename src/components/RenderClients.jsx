

export const RenderClients = ({ clients, city, checked }) => {
  let renderedClients = [];

  if (city === '') {
    renderedClients = clients;
  } else {
    renderedClients = clients.filter((client) => {
      return (
        client.address.city === city
      );
    });
  };

  const getAge = (birthDate) => {
    const today = new Date();
    const dateOfBirth = new Date(birthDate);
    return (today.getFullYear() - dateOfBirth.getFullYear());
  }
  
  // return class name?
  const findOldest = (checkClient) => {
    const city = checkClient.address.city;
    let oldest = 0;
    clients.forEach((client) => {
      const thisAge = getAge(client.birthDate)
      if(thisAge > oldest && client.address.city === city) {
        oldest = thisAge;
      }
    });
    if(getAge(checkClient.birthDate) >= oldest) {
      return 'customer highlight-customer'
    } else {
      return 'customer'
    }
  };

  return (
    <div className="home-card">

      {renderedClients.map((renderedClient) => (
        <div 
          className={checked === true ? findOldest(renderedClient) : 'customer'}
          key={renderedClient.id}>
          <div>
            {renderedClient.firstName} {renderedClient.lastName} {findOldest}
          </div>

          <div>
            {renderedClient.address.city} 
          </div>

          <div>
            {renderedClient.birthDate}  {getAge(renderedClient.birthDate)}
          </div>
          
        </div>
      ))}

    </div>
  )
}