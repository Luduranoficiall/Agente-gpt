export async function api(path, method="GET", body=null) {
  const opts = { method, headers: { "Content-Type": "application/json" } };
  if(body) opts.body = JSON.stringify(body);

  const res = await fetch("http://localhost:8080" + path, opts);
  return res.json();
}
