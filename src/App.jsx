// /src/App.jsx

import React, { useEffect, useState } from "react";
import FlightBoard from "./components/FlightBoard";

function App() {
  const [flightType, setFlightType] = useState("arrivals"); // or "departures"
  const [flights, setFlights] = useState([]);
  const airport = "YSSY"; // Sydney for now

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await fetch(`/api/flights?airport=${airport}&type=${flightType}`);
        const data = await res.json();
        setFlights(data.flights || []);
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      }
    };

    fetchFlights();
  }, [flightType]);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold text-center">AllFlights – {airport}</h1>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setFlightType("arrivals")}
          className={`px-4 py-2 rounded-l ${flightType === "arrivals" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Arrivals
        </button>
        <button
          onClick={() => setFlightType("departures")}
          className={`px-4 py-2 rounded-r ${flightType === "departures" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Departures
        </button>
      </div>

      <FlightBoard flights={flights} type={flightType} />
    </div>
  );
}

export default App;
