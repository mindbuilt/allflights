// src/api.js

export const fetchFlights = async (type = "arrival") => {
  const res = await fetch(`/api/flights?type=${type}`);

  if (!res.ok) {
    throw new Error(`Error fetching flights: ${res.status}`);
  }

  const data = await res.json();
  return data.flights; // array of full flight objects
};
