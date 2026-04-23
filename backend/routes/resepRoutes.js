const express = require("express");
const router = express.Router();

const resepController = require("../controllers/resepController");

router.get("/resepUMKM", resepController.getAllResep);
router.post("/resepUMKM", resepController.createResep);
router.delete("/resepUMKM/:id", resepController.deleteResep);

module.exports = router;
