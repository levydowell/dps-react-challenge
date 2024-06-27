

export const RenderClients = ({ clients }) => {
  return (
    <div className="home-card">
    <ul>
      {clients.map((client) => (
        <li key={client.id}>
          {client.firstName} {client.lastName} {client.address.city}{' '}
          {client.birthDate}
        </li>
      ))}
    </ul>
  </div>
  )
}