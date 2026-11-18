import "dotenv/config";

// Use exact origins; never allow every Vercel project to call this API.
export const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:3000,http://localhost:8080"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map((origin) => {
    const url = new URL(origin);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("CLIENT_URL must contain HTTP or HTTPS frontend URLs");
    }
    return url.origin;
  });
