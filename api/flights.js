// allflights/api/flights.js

export default async function handler(req, res) {
  const { type = "arrival" } = req.query;

  try {
    const response = await fetch(
      `https://aeroapi.flightaware.com/aeroapi/airports/YSSY/flights/scheduled?type=${type}&howMany=100`,
      {
        headers: {
          "x-apikey": process.env.AEROAPI_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    // ✅ Return full flight objects — no trimming
    res.status(200).json({ flights: data.flights });
  } catch (err) {
    console.error("API fetch failed:", err);
    res.status(500).json({ error: "Server error fetching flight data." });
  }
}
