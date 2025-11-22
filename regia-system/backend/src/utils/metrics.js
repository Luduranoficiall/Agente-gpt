import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Tempo de resposta HTTP em ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [50, 100, 200, 300, 500, 1000],
});

export default function metricsMiddleware(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    httpRequestDuration.observe(
      {
        method: req.method,
        route: req.originalUrl,
        status_code: res.statusCode,
      },
      Date.now() - start
    );
  });
  next();
}

/* Endpoint Prometheus */
export function metricsRoute(app) {
  app.get("/metrics", async (_, res) => {
    res.set("Content-Type", client.register.contentType);
    res.send(await client.register.metrics());
  });
}
