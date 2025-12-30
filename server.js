import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://shop-frontend-pearl.vercel.app"
];
app.use("/api/stock-history", stockHistoryRoutes);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
