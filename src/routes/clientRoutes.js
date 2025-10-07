import express from "express";
import ClientController from "../controllers/clientController.js";

const router = express.Router();

router.get("/", ClientController.getAllClients);
router.get("/:id", ClientController.getClientById);
router.post("/", ClientController.createClient);
router.put("/:id", ClientController.updateClient);
router.delete("/:id", ClientController.deleteClient);

export default router;
