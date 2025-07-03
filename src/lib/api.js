export const fetchFlights = async (ident) => {
  const endpoint = ident
    ? `https://aeroapi.flightaware.com/aeroapi/flights/${ident}`
    : `https://aeroapi.flightaware.com/aeroapi/flights`;

  const res = await fetch(endpoint, {
    headers: {
      "x-apikey": import.meta.env.VITE_AEROAPI_KEY,
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching flights: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
