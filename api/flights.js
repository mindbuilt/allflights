export default async function handler(req, res) {
  const { airport = "YSSY", type = "all" } = req.query;

  const types = {
    departures: "departure",
    arrivals: "arrival",
  };

  const urlBase = "https://aeroapi.flightaware.com/aeroapi/flights/airport";
  const fetchType = type === "all" ? "departure" : types[type] || "departure";

  const query = new URLSearchParams({
    airport_code: airport,
    type: fetchType,
    howMany: "20", // adjust if you want more/less
    offset: "0",
  });

  try {
    const response = await fetch(`${urlBase}?${query.toString()}`, {
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
