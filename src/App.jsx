import React, { useEffect, useState } from "react";
import FlightBoard from "./FlightBoard";

export default function App() {
  const [viewType, setViewType] = useState("arrivals");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 NEW
  const [error, setError] = useState(false);    // 👈 NEW
  const airport = "YSSY";

  const fetchFlights = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/flights?airport=${airport}&type=${viewType}`);
      const data = await response.json();
      console.log("API raw response:", data);
      const flightData = data.arrivals || data.departures || [];
      setFlights(flightData);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError(true);
      setFlights([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 60000); // 👈 auto-refresh
    return () => clearInterval(interval);
  }, [viewType]);

  return (
    <div className="min-h-screen bg-white text-black p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">AllFlights: {airport}</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setViewType("arrivals")}
          className={`px-4 py-2 rounded ${
            viewType === "arrivals" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Arrivals
        </button>
        <button
          onClick={() => setViewType("departures")}
          className={`px-4 py-2 rounded ${
            viewType === "departures" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Departures
        </button>
      </div>

      {/* 👇 pass new props to FlightBoard */}
      <FlightBoard flights={flights} type={viewType} loading={loading} error={error} />
    </div>
  );
}
