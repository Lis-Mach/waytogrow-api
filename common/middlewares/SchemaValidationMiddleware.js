
const Ajv=require('ajv').default, AJV_OPTS={allErrors: true};


module.exports = {

 verify: (schema) => {
    if(!schema){
        throw new Error('Schema is not  provided');
    }

    return (req, res, next) => {
        const {body}=req;
        const ajv=new Ajv(AJV_OPTS);//// options can be passed, e.g. {allErrors: true}

        const validate=ajv.compile(schema);// schema to odwolanie do eksportowanych modulow z 
        //plikow z folderow schemas
        //np updateUserPayload.js
       // Compiles the schema provided in argument and validates the data for the
   //compiled schema, and returns errors if any
        const isValid=validate(body);

if(isValid) {
    return next();
}

return res.status(400).json({
    error: {
        message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`,
    },
});

    }
 },
};