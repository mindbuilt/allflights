import React from "react";

export default function FlightBoard({ flights = [], type, loading, error }) {
  const getCity = (flight) =>
    type === "arrivals"
      ? flight.origin?.city || flight.origin?.code_iata || "—"
      : flight.destination?.city || flight.destination?.code_iata || "—";

  const getScheduledTime = (flight) =>
    type === "arrivals"
      ? flight.scheduled_in?.substring(11, 16) || "—"
      : flight.scheduled_out?.substring(11, 16) || "—";

  const getEstimatedTime = (flight) =>
    type === "arrivals"
      ? flight.estimated_in?.substring(11, 16) || "—"
      : flight.estimated_out?.substring(11, 16) || "—";

  const getActualTime = (flight) =>
    type === "arrivals"
      ? flight.actual_in?.substring(11, 16) || "—"
      : flight.actual_out?.substring(11, 16) || "—";

  const getTerminal = (flight) =>
    type === "arrivals"
      ? flight.terminal_destination || "—"
      : flight.terminal_origin || "—";

  const getGate = (flight) =>
    type === "arrivals"
      ? flight.gate_destination || "—"
      : flight.gate_origin || "—";

  const getStatus = (flight) => flight.status || "—";

  const getAirline = (flight) => flight.operator_iata || flight.operator || "—";

  if (loading) {
    return <div className="text-center p-4 text-gray-600">Loading flights...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Error loading flight data.</div>;
  }

  if (!flights.length) {
    return <div className="text-center p-4 text-gray-600">No {type} data available.</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-separate border-spacing-y-1 text-sm md:text-base font-mono">
        <thead className="bg-black text-white uppercase text-xs tracking-widest">
          <tr>
            <th className="px-4 py-2 text-left">Flight</th>
            <th className="px-4 py-2 text-left">{type === "arrivals" ? "From" : "To"}</th>
            <th className="px-4 py-2 text-left">Scheduled</th>
            <th className="px-4 py-2 text-left">Estimated</th>
            <th className="px-4 py-2 text-left">Actual</th>
            <th className="px-4 py-2 text-left">Terminal</th>
            <th className="px-4 py-2 text-left">Gate</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Airline</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.fa_flight_id || flight.ident} className="bg-white even:bg-gray-100">
              <td className="px-4 py-2">{flight.ident}</td>
              <td className="px-4 py-2">{getCity(flight)}</td>
              <td className="px-4 py-2">{getScheduledTime(flight)}</td>
              <td className="px-4 py-2">{getEstimatedTime(flight)}</td>
              <td className="px-4 py-2">{getActualTime(flight)}</td>
              <td className="px-4 py-2">{getTerminal(flight)}</td>
              <td className="px-4 py-2">{getGate(flight)}</td>
              <td className="px-4 py-2">{getStatus(flight)}</td>
              <td className="px-4 py-2">{getAirline(flight)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
