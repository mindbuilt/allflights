// /src/App.jsx

import { useState, useEffect } from "react";
import FlightBoard from "./FlightBoard";

export default function App() {
  const [flights, setFlights] = useState([]);
  const [flightType, setFlightType] = useState("arrivals");

  const fetchFlights = async () => {
    try {
      const res = await fetch(`/api/flights?airport=YSSY&type=${flightType}`);
      const data = await res.json();
      setFlights(data.flights || []);
    } catch (err) {
      console.error("Error fetching flights:", err);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [flightType]);

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">AllFlights — Sydney</h1>
        <div className="space-x-2">
          <button
            onClick={() => setFlightType("arrivals")}
            className={`px-3 py-1 rounded ${
              flightType === "arrivals" ? "bg-white text-black" : "bg-gray-800"
            }`}
          >
            Arrivals
          </button>
          <button
            onClick={() => setFlightType("departures")}
            className={`px-3 py-1 rounded ${
              flightType === "departures" ? "bg-white text-black" : "bg-gray-800"
            }`}
          >
            Departures
          </button>
        </div>
      </header>
      <FlightBoard flights={flights} type={flightType} />
    </div>
  );
}
