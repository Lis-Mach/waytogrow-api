//Created another admin endpoint that can be used to change role of any other user

const { roles } = require("../../config");

module.exports = {
  type: "object",
  properties: {
    role: {
      type: "string",
      enum: Object.values(roles),
    },
  },
  additionalProperties: false, //Setting the additionalProperties schema to false means no additional properties will be allowed.
};
