module.exports = {
  type: "object",
  properties: {
    login: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["login", "password"],
  additionalProperties: false,
};
