import express from "express";
import AppointmentController from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", AppointmentController.getAllAppointments);
router.get("/:id", AppointmentController.getAppointmentById);
router.post("/", AppointmentController.createAppointment);
router.put("/:id", AppointmentController.updateAppointment);
router.delete("/:id", AppointmentController.deleteAppointment);

export default router;
