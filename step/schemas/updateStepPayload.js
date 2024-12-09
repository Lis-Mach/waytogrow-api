module.exports = {
  type: "object",
  properties: {
    order: {
      type: "number",
    },
    title: {
      type: "string",
    },
    subtitle: {
      type: "string",
    },
    description: {
      type: "string",
    },
    status: {
      type: "boolean",
    },
  },
  additionalProperties: false,
};
