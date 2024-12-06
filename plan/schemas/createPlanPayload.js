//Created another plan endpoint

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
    }
  },
  additionalProperties: true,
};
