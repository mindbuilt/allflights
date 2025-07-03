// /src/FlightBoard.jsx

export default function FlightBoard({ flights, type }) {
  if (!flights || flights.length === 0) {
    return <p className="text-center text-gray-400">No flight data available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-gray-700 text-sm uppercase text-left">
            <th className="px-4 py-2">Flight</th>
            <th className="px-4 py-2">{type === "arrivals" ? "Origin" : "Destination"}</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Aircraft</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.fa_flight_id} className="bg-gray-800 hover:bg-gray-700 text-sm">
              <td className="px-4 py-2 font-bold">{flight.ident || "—"}</td>
              <td className="px-4 py-2">
                {(type === "arrivals" ? flight.origin?.city : flight.destination?.city) || "—"}
              </td>
              <td className="px-4 py-2">
                {(type === "arrivals"
                  ? flight.actual_on || flight.predicted_on
                  : flight.actual_off || flight.predicted_off) || "—"}
              </td>
              <td className="px-4 py-2">{flight.aircraft_type || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
