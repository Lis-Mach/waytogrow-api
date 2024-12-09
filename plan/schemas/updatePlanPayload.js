//changed title of plan in Plan CRUD enpoints

module.exports = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    image: {
      type: "string",
    },
  },

  additionalProperties: true,
};
