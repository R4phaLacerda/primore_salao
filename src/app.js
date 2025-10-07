import express from "express";
import clientRoutes from "./routes/clientRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/clients", clientRoutes);
app.use("/api/professionals", professionalRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/appointments", appointmentRoutes);

export default app;


