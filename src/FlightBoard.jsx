import flights from "./flights";

function FlightBoard() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed text-yellow-400 text-left">
        <thead>
          <tr className="uppercase text-sm border-b border-yellow-600">
            <th className="w-1/6 py-2">Flight</th>
            <th className="w-1/6 py-2">Airline</th>
            <th className="w-1/6 py-2">From</th>
            <th className="w-1/6 py-2">To</th>
            <th className="w-1/6 py-2">Time</th>
            <th className="w-1/6 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index} className="border-b border-yellow-800">
              <td className="py-2">{flight.flight}</td>
              <td className="py-2">{flight.airline}</td>
              <td className="py-2">{flight.from}</td>
              <td className="py-2">{flight.to}</td>
              <td className="py-2">{flight.time}</td>
              <td className="py-2">{flight.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightBoard;
