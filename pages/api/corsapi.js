// pages/api/corsapi.js
export default function handler(req, res) {
  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins for local development
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type"
    );
    res.status(200).end();
    return;
  }

  // Set CORS headers for other requests
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins for local development
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );

  // Your API route logic here
  res.status(200).json({ message: "Hello World" });
}
