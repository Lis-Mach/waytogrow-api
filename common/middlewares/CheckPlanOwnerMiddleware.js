const PlanModel = require("../models/plan");

module.exports = {
  has: (req, res, next) => {
    const {
      user: { userId },
      params: { planId },
    } = req;

    PlanModel.findPlan({ user_id: userId, id: planId }).then((plan) => {
      console.log(`userid to jest : ${userId}, planId to jest: ${planId}`);
     
      if (!plan) {
        return res.status(404).json({
          error: "Plan not exist for current user",
        });
      }

      next();
    });
  },
};
