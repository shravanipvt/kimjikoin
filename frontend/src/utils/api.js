const API_BASE = import.meta.env.VITE_API_BASE || '';

async function post(path, body) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || 'API error');
  }
  const data = await res.json();
  return data;
}

export default { post };
