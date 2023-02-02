const express = require("express");
const router = express.Router();

const empController = require("../../controllers/empController");

router
  .route("/")
  .get(empController.getAllEmps)
  .post(empController.createNewEmp)
  .put(empController.updateEmp)
  .delete(empController.deleteEmp);

router.route("/:id").get(empController.getEmp);

module.exports = router;
