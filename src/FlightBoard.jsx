import React from "react";

export default function FlightBoard({ flights = [], type }) {
  if (!flights.length) return <div className="text-center p-4">No {type} data available.</div>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Flight</th>
            <th className="px-4 py-2 text-left">{type === "arrivals" ? "From" : "To"}</th>
            <th className="px-4 py-2 text-left">Scheduled</th>
            <th className="px-4 py-2 text-left">Actual</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.fa_flight_id} className="border-t border-gray-200">
              <td className="px-4 py-2">{flight.ident}</td>
              <td className="px-4 py-2">
                {type === "arrivals"
                  ? flight.origin?.code_iata || flight.origin?.code || "N/A"
                  : flight.destination?.code_iata || flight.destination?.code || "N/A"}
              </td>
              <td className="px-4 py-2">
                {flight.scheduled_in || flight.scheduled_out || "—"}
              </td>
              <td className="px-4 py-2">
                {flight.actual_in || flight.actual_out || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
