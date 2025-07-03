export default async function handler(req, res) {
  const { airport = "YSSY", type = "departures" } = req.query;

  const validTypes = ["departures", "arrivals"];
  const selectedType = validTypes.includes(type.toLowerCase())
    ? type.toLowerCase()
    : "departures";

  const url = `https://aeroapi.flightaware.com/aeroapi/airports/${airport}/flights/${selectedType}?howMany=20`;

  console.log("🔍 FETCHING FROM:", url);

  try {
    const response = await fetch(url, {
      headers: {
        "x-apikey": process.env.AEROAPI_KEY,
        Accept: "application/json",
      },
    });

    const text = await response.text();
    console.log("API raw response:", text);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "API call failed",
        details: text,
      });
    }

    const data = JSON.parse(text);
    return res.status(200).json({ flights: data.flights || [] });
  } catch (err) {
    console.error("Function error:", err);
    return res.status(500).json({
      error: "Function crashed",
      message: err.message,
    });
  }
}
