import { useEffect, useState } from "react";

export default function FlightBoard() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/flights")
      .then((res) => res.json())
      .then((data) => {
        setFlights(data.flights || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-white">Loading flights...</div>;

  if (flights.length === 0) return <div className="p-4 text-white">No flights found.</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {flights.map((flight, i) => (
        <div
          key={i}
          className="bg-black text-green-500 p-4 rounded-lg shadow-md font-mono border border-green-700"
        >
          <div className="text-lg font-bold mb-1">✈️ {flight.ident}</div>
          <div>
            <strong>From:</strong>{" "}
            {flight.origin?.code_icao || flight.origin?.code || "?"} — {flight.origin?.city || "Unknown"}
          </div>
          <div>
            <strong>To:</strong>{" "}
            {flight.destination?.code_icao || "?"} — {flight.destination?.city || "Unknown"}
          </div>
          <div>
            <strong>Aircraft:</strong> {flight.aircraft_type || "N/A"}
          </div>
          <div>
            <strong>Tail:</strong> {flight.registration || "N/A"}
          </div>
          <div className="text-sm opacity-50 mt-1">
            Off: {flight.actual_off?.slice(0, 16).replace("T", " ")}<br />
            On: {flight.actual_on?.slice(0, 16).replace("T", " ")}
          </div>
        </div>
      ))}
    </div>
  );
}
