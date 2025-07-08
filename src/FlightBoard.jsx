import React from "react";
import { DateTime } from "luxon";

export default function FlightBoard({ flights = [], type, loading, error }) {
  const getCity = (flight) =>
    type === "arrivals"
      ? flight.origin?.city || flight.origin?.code_iata || "—"
      : flight.destination?.city || flight.destination?.code_iata || "—";

  const formatTime = (isoTime) =>
    isoTime
      ? DateTime.fromISO(isoTime, { zone: "utc" })
          .setZone("Australia/Sydney")
          .toFormat("HH:mm")
      : "—";

  const getScheduledTime = (flight) =>
    type === "arrivals"
      ? formatTime(flight.scheduled_in)
      : formatTime(flight.scheduled_out);

  const getEstimatedTime = (flight) =>
    type === "arrivals"
      ? formatTime(flight.estimated_in)
      : formatTime(flight.estimated_out);

  const getGate = (flight) =>
    type === "arrivals" ? flight.gate_in : flight.gate_out;

  const getTerminal = (flight) =>
    type === "arrivals" ? flight.terminal_in : flight.terminal_out;

  const getStatusBadge = (flight) => {
    if (flight.cancelled) return <span className="text-red-500">Cancelled</span>;
    if (flight.diverted) return <span className="text-yellow-500">Diverted</span>;
    return <span className="text-green-500">{flight.status || "—"}</span>;
  };

  const getAirlineLogo = (iata) => {
    return iata
      ? `https://content.airhex.com/content/logos/airlines_${iata}_200_200_s.png`
      : null;
  };

  return (
    <div className="bg-gray-900 text-white font-mono p-4">
      {loading && <p>Loading flights…</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && flights.length === 0 && <p>No flights found.</p>}
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-gray-400">
            <th>✈️ Flight</th>
            <th>From / To</th>
            <th>Scheduled</th>
            <th>Estimated</th>
            <th>Status</th>
            <th>Aircraft</th>
            <th>Gate</th>
            <th>Terminal</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => {
            const logo = getAirlineLogo(flight.operator_iata);
            const rowStyle = flight.cancelled
              ? "opacity-40 line-through"
              : flight.diverted
              ? "bg-yellow-900"
              : "";

            return (
              <tr key={flight.fa_flight_id} className={`text-sm ${rowStyle}`}>
                <td className="flex items-center gap-2">
                  {logo && (
                    <img
                      src={logo}
                      alt={flight.operator_iata}
                      width={20}
                      className="inline-block"
                    />
                  )}
                  {flight.operator_iata}
                  {flight.flight_number}
                </td>
                <td>{getCity(flight)}</td>
                <td>{getScheduledTime(flight)}</td>
                <td>{getEstimatedTime(flight)}</td>
                <td>{getStatusBadge(flight)}</td>
                <td>{flight.aircraft_type || "—"} / {flight.registration || "—"}</td>
                <td>{getGate(flight) || "—"}</td>
                <td>{getTerminal(flight) || "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
