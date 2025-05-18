const BASE = "http://localhost:5093/api"; // ⚠️ adjust to your backend port

async function get(endpoint) {
  const res = await fetch(`${BASE}/${endpoint}`);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

async function post(endpoint, data) {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

// For VG later
async function put(endpoint, data) {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export { get, post, put };
