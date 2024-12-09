//Added the ability to filter users by query and delete a user by admin,
//change user role to Admin (only by ADMIN)

const router = require("express").Router();

//Middleware imports
const IsAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("./../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("./../common/middlewares/CheckPermissionMiddleware");

//Controller imports
const userController = require("./controllers/userController");

//JSON Schema Imports for payload veryf.
const changeRolePayload = require("./schemas/changeRolePayload");
const changeUserPayload = require("./schemas/updateUserPayload");

const { roles } = require("../config");
const updateUserPayload = require("./schemas/updateUserPayload");

router.get(
  "/",
  [
    IsAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateUserPayload),
  ],
  userController.findUser
);

router.put(
  "/",
  [
    IsAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateUserPayload),
  ],
  userController.updateUser
);

router.get(
  "/all",
  [
    // IsAuthenticatedMiddleware.check,
    // CheckPermissionMiddleware.has(roles.ADMIN)
  ],
  userController.getAllUsers
);

router.patch(
  "/change-role/:userId",
  [
    IsAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(changeRolePayload),
  ],
  userController.changeRole
);

router.delete(
  "/:userId",
  [IsAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  userController.deleteUser
);

module.exports = router;
