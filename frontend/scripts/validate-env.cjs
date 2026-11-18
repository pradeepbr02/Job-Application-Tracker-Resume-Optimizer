// Load the same .env files and overrides as the CRA production build.
process.env.NODE_ENV = "production";
require("react-scripts/config/env");

const value = process.env.REACT_APP_API_URL?.trim();
try {
  const url = new URL(value);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username || url.password || url.search || url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error("Expected an API origin");
  }
} catch {
  console.error(
    "Set REACT_APP_API_URL to your backend origin before building, " +
    "for example https://jtro-backend.onrender.com (without /api/v1)."
  );
  process.exit(1);
}
