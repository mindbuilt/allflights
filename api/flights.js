// api/flights.js

export default async function handler(req, res) {
  const { type = "arrival" } = req.query;

  const base = "https://aeroapi.flightaware.com/aeroapi/flights/search";
  const query =
    type === "arrival"
      ? "destination YSSY AND estimated_in > now"
      : "origin YSSY AND estimated_out > now";

  const url = `${base}?query=${encodeURIComponent(query)}&max_pages=1`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-apikey": process.env.AEROAPI_KEY,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.status(200).json({ flights: data.flights });
  } catch (err) {
    console.error("API fetch failed:", err);
    res.status(500).json({ error: "Server error fetching flight data." });
  }
}
