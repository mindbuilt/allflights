import { useEffect, useState } from "react";

export default function FlightBoard() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("all"); // "departures", "arrivals", or "all"
  const airport = "YSSY"; // Static for now — later user-selectable

  useEffect(() => {
    setLoading(true);
    fetch(`/api/flights?airport=${airport}&type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setFlights(data.flights || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [type]);

  const formatTime = (utc) => {
    if (!utc) return "–";
    return new Date(utc).toLocaleString("en-AU", {
      timeZone: "Australia/Sydney",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

const displayLocation = (airport) => {
  if (!airport) return "–";
  const code = airport.code_iata || airport.code_icao;
  const city = airport.city || "Unknown";
  return code ? `${code} — ${city}` : city;

  };

  return (
    <div className="p-4">
      <div className="text-white text-2xl font-bold mb-4">Flights for Sydney (YSSY)</div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setType("all")}
          className={`px-4 py-1 rounded ${
            type === "all" ? "bg-green-600 text-white" : "bg-green-900 text-green-300"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setType("departures")}
          className={`px-4 py-1 rounded ${
            type === "departures" ? "bg-green-600 text-white" : "bg-green-900 text-green-300"
          }`}
        >
          Departures
        </button>
        <button
          onClick={() => setType("arrivals")}
          className={`px-4 py-1 rounded ${
            type === "arrivals" ? "bg-green-600 text-white" : "bg-green-900 text-green-300"
          }`}
        >
          Arrivals
        </button>
      </div>

      {loading ? (
        <div className="text-white">Loading flights...</div>
      ) : flights.length === 0 ? (
        <div className="text-white">No flights found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flights.map((flight, i) => (
            <div
              key={i}
              className="bg-black text-green-500 p-4 rounded-lg shadow-md font-mono border border-green-700"
            >
              <div className="text-lg font-bold mb-1">✈️ {flight.ident}</div>
             {type === "arrivals" ? (
  <div>
    <strong>From:</strong> {displayLocation(flight.origin)}
  </div>
) : type === "departures" ? (
  <div>
    <strong>To:</strong> {displayLocation(flight.destination)}
  </div>
) : (
  <>
    <div>
      <strong>From:</strong> {displayLocation(flight.origin)}
    </div>
    <div>
      <strong>To:</strong> {displayLocation(flight.destination)}
    </div>
  </>
)}
              <div>
                <strong>Aircraft:</strong> {flight.aircraft_type || "N/A"}
              </div>
              <div>
                <strong>Tail:</strong> {flight.registration || "N/A"}
              </div>
              <div className="text-sm opacity-60 mt-1">
                Off: {formatTime(flight.actual_off)}<br />
                On: {formatTime(flight.actual_on)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
