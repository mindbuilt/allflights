import React, { useState, useEffect } from "react";
import FlightBoard from "./FlightBoard";

const App = () => {
  const [flights, setFlights] = useState([]);
  const [flightType, setFlightType] = useState("arrivals"); // or "departures"
  const [loading, setLoading] = useState(true);
  const AIRPORT_CODE = "YSSY"; // Sydney

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/flights?airport=${AIRPORT_CODE}&type=${flightType}`);
        const data = await res.json();
        setFlights(data.flights || []);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [flightType]);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">🛫 AllFlights Sydney</h1>
        <div className="mt-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${
              flightType === "arrivals" ? "bg-white text-black" : "bg-gray-700"
            }`}
            onClick={() => setFlightType("arrivals")}
          >
            Arrivals
          </button>
          <button
            className={`px-4 py-2 rounded ${
              flightType === "departures" ? "bg-white text-black" : "bg-gray-700"
            }`}
            onClick={() => setFlightType("departures")}
          >
            Departures
          </button>
        </div>
      </header>

      {loading ? (
        <div className="text-center text-gray-400">Loading {flightType}...</div>
      ) : (
        <FlightBoard flights={flights} type={flightType} />
      )}
    </div>
  );
};

export default App;
