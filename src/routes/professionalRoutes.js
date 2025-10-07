import express from "express";
import ProfessionalController from "../controllers/professionalController.js";

const router = express.Router();

router.get("/", ProfessionalController.getAllProfessionals);
router.get("/:id", ProfessionalController.getProfessionalById);
router.post("/", ProfessionalController.createProfessional);
router.put("/:id", ProfessionalController.updateProfessional);
router.delete("/:id", ProfessionalController.deleteProfessional);

export default router;
