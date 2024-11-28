const router=require("express").Router();

//Controller import
const AuthorizationController=require('./controllers/AuthorizationController');

//Middleware imoprt
const SchemaValidationMiddleware=require('../common/middlewares/SchemaValidationMiddleware');

//JSON Schema Import for Payload veryfication
const registerPayload=require('./schemas/registerPayload');
const loginPayload=require('./schemas/loginPayload');

router.post(
    "/signup",
    [
        SchemaValidationMiddleware.verify(registerPayload)
    ],
AuthorizationController.register
    
);

router.post(
    "/login",
    [SchemaValidationMiddleware.verify(loginPayload)],
    AuthorizationController.login
);

module.exports=router;