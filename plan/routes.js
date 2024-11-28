//Created delete plan endpoint accessible for users.

const router=require("express").Router();

//controller imports 
const PlanController=require('./controllers/planController');
const StepController = require("../step/controllers/stepController");

//Middleware imports
const IsAuthenticatedMiddleware=require('./../common/middlewares/IsAuthenticatedMiddleware');
const SchemaValidationMiddleware=require('./../common/middlewares/SchemaValidationMiddleware');
const CheckPermissionMiddleware=require('./../common/middlewares/CheckPermissionMiddleware');

//JSON schema imports for payload veryf
const createPlanPayload=require('./schemas/createPlanPayload');
const updatePlanPayload=require('./schemas/updatePlanPayload');
const createStepPayload=require('../step/schemas/createStepPayload.js');
const updateStepPayload=require('../step/schemas/updateStepPayload.js');
const {roles}= require('../config');
const CheckPlanOwnerMiddleware = require("../common/middlewares/CheckPlanOwnerMiddleware.js");
const plan = require("../common/models/plan.js");



router.get(
    "/",
    [
    IsAuthenticatedMiddleware.check, 
    CheckPermissionMiddleware.has(roles.USER)
    ],
    PlanController.getAllPlans
);

router.get(
    "/:planId",
    [
    IsAuthenticatedMiddleware.check, 
    CheckPermissionMiddleware.has(roles.USER),
    CheckPlanOwnerMiddleware.has
    ],
    PlanController.getPlanById
);

router.post(
    "/",
    [IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.USER),
        SchemaValidationMiddleware.verify(createPlanPayload),
    ],
    PlanController.createPlan
);

router.put(
    "/:planId",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.USER),
        SchemaValidationMiddleware.verify(updatePlanPayload),
        CheckPlanOwnerMiddleware.has
    ],
    PlanController.updatePlan
);

router.delete(
    "/:planId",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.USER),
        CheckPlanOwnerMiddleware.has
    ],
    PlanController.deletePlan

);

router.get(
    "/:planId/step",
    [
    IsAuthenticatedMiddleware.check, 
    CheckPermissionMiddleware.has(roles.USER),
    CheckPlanOwnerMiddleware.has
    ],
    StepController.getAllSteps
);

router.get(
    "/:planId/step/:stepId",
    [
    IsAuthenticatedMiddleware.check, 
    CheckPermissionMiddleware.has(roles.USER),
    CheckPlanOwnerMiddleware.has
    ],
    StepController.getStepById
);

router.delete(
    "/:planId/step/:stepId",
    [
    IsAuthenticatedMiddleware.check, 
    CheckPermissionMiddleware.has(roles.USER),
    CheckPlanOwnerMiddleware.has
    ],
    StepController.deteleStep
);

router.post(
    "/:planId/step",
    [IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.USER),
        SchemaValidationMiddleware.verify(createStepPayload),
    ],
    StepController.createStep
);

router.put(
    "/:planId/step/:stepId",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.USER),
        SchemaValidationMiddleware.verify(updateStepPayload),
        CheckPlanOwnerMiddleware.has
    ],
    StepController.updateStep
);

module.exports=router;