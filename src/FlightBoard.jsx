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
    return <div className="text-center p-4 text-yellow-300 font-mono">Loading flights...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500 font-mono">Error loading flight data.</div>;
  }

  if (!flights.length) {
    return (
      <div className="text-center p-4 text-yellow-400 font-mono">
        No {type} data available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4 bg-black text-yellow-300 font-mono rounded-md shadow-xl border border-yellow-600 p-2">
      <table className="min-w-full text-sm md:text-base">
        <thead className="uppercase text-yellow-500 text-xs tracking-widest">
          <tr>
            <SplitFlapHeader>Flight</SplitFlapHeader>
            <SplitFlapHeader>{type === "arrivals" ? "From" : "To"}</SplitFlapHeader>
            <SplitFlapHeader>Scheduled</SplitFlapHeader>
            <SplitFlapHeader>Estimated</SplitFlapHeader>
            <SplitFlapHeader>Actual</SplitFlapHeader>
            <SplitFlapHeader>Terminal</SplitFlapHeader>
            <SplitFlapHeader>Gate</SplitFlapHeader>
            <SplitFlapHeader>Status</SplitFlapHeader>
            <SplitFlapHeader>Airline</SplitFlapHeader>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.fa_flight_id || flight.ident} className="border-t border-yellow-700">
              <SplitFlapCell>{flight.ident}</SplitFlapCell>
              <SplitFlapCell>{getCity(flight)}</SplitFlapCell>
              <SplitFlapCell>{getScheduledTime(flight)}</SplitFlapCell>
              <SplitFlapCell>{getEstimatedTime(flight)}</SplitFlapCell>
              <SplitFlapCell>{getActualTime(flight)}</SplitFlapCell>
              <SplitFlapCell>{getTerminal(flight)}</SplitFlapCell>
              <SplitFlapCell>{getGate(flight)}</SplitFlapCell>
              <SplitFlapCell>{getStatus(flight)}</SplitFlapCell>
              <SplitFlapCell>{getAirline(flight)}</SplitFlapCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SplitFlapCell({ children }) {
  return (
    <td className="px-2 py-1 text-center border border-yellow-700 bg-black rounded-sm shadow-inner tracking-wide">
      {children || "—"}
    </td>
  );
}

function SplitFlapHeader({ children }) {
  return (
    <th className="px-2 py-2 text-left border-b border-yellow-500 bg-black">
      {children}
    </th>
  );
}
