//Change properties for user table

//no change on login - unique value
//no change on id - autoincremented value
//no change on role value - only ADMIN is able to change the role and we use anothter schema for that
//- see on file acc below link
// /Users/laczek/Desktop/waytogrow/waytogrow-api/user/schemas/changeRolePayload.js

const { roles } = require("../../config");

module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    surname: {
      type: "string",
    },

    email: {
      type: "string",
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    },
  },
  additionalProperties: true, //Setting the additionalProperties schema to false means no additional properties will be allowed.
};
