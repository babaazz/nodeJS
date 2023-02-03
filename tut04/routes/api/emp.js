const express = require("express");
const router = express.Router();

const empController = require("../../controllers/empController");

const ROLES_LIST = require("../../config/rolesList");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(empController.getAllEmps)
  .post(
    verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
    empController.createNewEmp
  )
  .put(
    verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
    empController.updateEmp
  )
  .delete(verifyRoles(ROLES_LIST.admin), empController.deleteEmp);

router.route("/:id").get(empController.getEmp);

module.exports = router;
