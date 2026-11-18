import assert from "node:assert/strict";
import { after, before, test } from "node:test";

// Configure before importing the app, as a hosting platform does at startup.
process.env.CLIENT_URL = "http://localhost:3000,http://localhost:8080, https://jtro-test.vercel.app/,https://jobs.example.com/";
const { default: app } = await import("../app.js");

let server;
let baseUrl;

before(async () => {
  server = await new Promise((resolve) => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
});

for (const origin of [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://jtro-test.vercel.app",
  "https://jobs.example.com",
]) {
  test(`allows signup preflight and validation response from ${origin}`, async () => {
    const preflight = await fetch(`${baseUrl}/api/v1/register`, {
      method: "OPTIONS",
      headers: {
        Origin: origin,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
      },
    });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get("access-control-allow-origin"), origin);
    assert.equal(preflight.headers.get("access-control-allow-credentials"), "true");

    // Missing fields exercise the actual route without creating a database user.
    const response = await fetch(`${baseUrl}/api/v1/register`, {
      method: "POST",
      headers: { Origin: origin, "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com" }),
    });
    assert.equal(response.status, 400);
    assert.equal(response.headers.get("access-control-allow-origin"), origin);
    assert.deepEqual(await response.json(), { message: "All fields are required" });
  });
}

test("does not grant CORS access to untrusted origins", async () => {
  const response = await fetch(`${baseUrl}/api/v1/register`, {
    method: "OPTIONS",
    headers: { Origin: "https://untrusted.example", "Access-Control-Request-Method": "POST" },
  });
  assert.equal(response.headers.get("access-control-allow-origin"), null);
});
