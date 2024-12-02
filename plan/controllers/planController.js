//  created/deleted plan endpoint accessible for user
const path = require('path');
const PlanModel = require("../../common/models/plan");

module.exports = {
  getAllPlans: (req, res) => {
    const {
    user: { userId },
    } = req;

    PlanModel.findAllPlans({user_id: userId })   
      .then((plans) => {
        return res.status(200).json({
          status: true,
          data: plans,
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false, 
          error: errorr,
        });
      });
  },

  getPlanById: (req, res) => {
    const {
      user: { userId },
      params: { planId },
    } = req;

    PlanModel.findPlan({ user_id: userId, id : planId })
      .then((plan) => {
        return res.status(200).json({
          status: true,
          data: plan,
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false,
          error: errorr,
        });
      });
  },

  createPlan: (req, res) => {
    const { body } = req;

    PlanModel.createPlan(body)
      .then((plan) => {
        return res.status(200).json({
          status: true,
          data: plan,
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false,
          error: errorr,
        });
      });
  },

  updatePlan: (req, res) => {
    const {
      params: { planId },
      user: { userId },
      body: payload,
    } = req;

    //If payload is empty, we return error. Plan is not updated.

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, plan can not be updated",
        },
      });
    }

    PlanModel.updatePlan({ id: planId, user_id: userId }, payload)
      .then(() => {
        return PlanModel.findPlan({ id: planId });
      })
      .then((plan) => {
        res.status(200).json({
          status: true,
          data: plan,
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false,
          error: errorr,
        });
      });
  },

  updatePlanImage: (req, res) => {
    const {
      params: { planId },
      user: { userId },
      file : { path } ,
    } = req;

    PlanModel.updatePlan({ id: planId, user_id: userId }, {image: path})
      .then(() => {
        return PlanModel.findPlan({ id: planId });
      })
      .then((plan) => {
        res.status(200).json({
          status: true,
          data: plan,
        });
      })
      .catch((errorr) => {
        return res.status(500).json({
          status: false,
          error: errorr,
        });
      });
  },

  getPlanImage: (req, res) => {
    const {
      params: { planId },
      user: { userId }
    } = req;

    PlanModel.findPlan({ id: planId })
      .then((plan) => {
        const filePath = plan.image;
        res.status(200).download(filePath);
      })
      .catch((errorr) => {
        return res.status(404).json({
          status: false,
          error: errorr,
        });
      });
  },

  deletePlan: (req, res) => {
    const {
     params:  { planId },
     user: { userId }
    } = req;

    PlanModel.deletePlan({ id: planId, user_id: userId})
      .then(() => {
        return res.status(200).json({
          status: true,
          data: {
            message: "Plan was deleated successfully",
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
