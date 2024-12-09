//created/deleted step endpoint accessible for user

const StepModel = require("../../common/models/step");

module.exports = {
  getAllSteps: (req, res) => {
    const {
      params: { planId },
    } = req;

    StepModel.findAllSteps({ plan_id: planId })
      .then((steps) => {
        return res.status(200).json({
          status: true,
          data: steps,
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false,
          error: errorr,
        });
      });
  },

  getStepById: (req, res) => {
    const {
      params: { planId, stepId },
    } = req;

    StepModel.findStep({ plan_id: planId, id: stepId })
      .then((step) => {
        return res.status(200).json({
          status: true,
          data: step,
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false,
          error: errorr,
        });
      });
  },

  createStep: (req, res) => {
    const {
      body,
      params: { planId },
    } = req;

    body.plan_id = planId;

    console.log(body);
    StepModel.createStep(body)
      .then((step) => {
        return res.status(200).json({
          status: true,
          data: step,
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false,
          error: errorr,
        });
      });
  },

  updateStep: (req, res) => {
    const {
      params: { planId, stepId },
      body: payload,
    } = req;

    //If payload is empty, we return error. Step is not updated.
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, step can not be updated",
        },
      });
    }

    StepModel.updateStep({ plan_id: planId, id: stepId }, payload)
      .then(() => {
        return StepModel.findStep({ id: stepId });
      })
      .then((step) => {
        res.status(200).json({
          status: true,
          data: step,
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false,
          error: errorr,
        });
      });
  },

  deteleStep: (req, res) => {
    const {
      params: { planId, stepId },
    } = req;

    StepModel.deleteStep({ plan_id: planId, id: stepId })
      .then(() => {
        return res.status(200).json({
          status: true,
          data: {
            message: "Step was deleated successfully",
          },
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false,
          error: errorr,
        });
      });
  },
};
