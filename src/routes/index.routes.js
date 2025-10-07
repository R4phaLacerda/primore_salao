import express from "express";

import clientRoutes from "./clientRoutes.js";
import professionalRoutes from "./professionalRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import productRoutes from "./productRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/clients", clientRoutes);
router.use("/professionals", professionalRoutes);
router.use("/services", serviceRoutes);
router.use("/products", productRoutes);
router.use("/appointments", appointmentRoutes);
router.use(authMiddleware);

export default router;
