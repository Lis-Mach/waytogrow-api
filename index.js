//api:
const Express = require("express");
const app = Express(); //app is an instance of express.
const morgan = require("morgan");
const cors = require("cors");
const port = 8080;

//Express Routess import
const AuthorizationRoutes=require('./authorization/routes');
const UserRoutes=require('./user/routes');
const PlanRoutes=require('./plan/routes');

app.use(morgan("tiny")); //To setup your middleware,
//you can invoke app.use(<specific_middleware_layer_here>) for every middleware layer that you want to add
app.use(cors());
app.use(Express.json());//set up Express to create an app and configure it to parse requests with JSON payloads.


//data base:
const { Sequelize } = require("sequelize");
const UserModel = require("./common/models/user"); //sequelize model imports
const StepModel = require("./common/models/step");
const PlanModel = require("./common/models/plan");

const sequelize = new Sequelize("WayToGrow", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    //defined globally for the sequelize instance, when it is created:
    freezeTableName: true,//to fulfill sql requirement -> table name should be should be singular
    timestamps: false,//creation and updation date for record not needed in this app
  },
});

 // initialising the Model on sequelize
UserModel.initialise(sequelize);
StepModel.initialise(sequelize);
PlanModel.initialise(sequelize);

try {
  sequelize.authenticate(); //test if the connection is ok
  console.log("Connection has been established successfully.");

  // Attaching the Authentication and User Routes to the app.
  app.use("/",AuthorizationRoutes);
  app.use("/user", UserRoutes);
  app.use("/plan", PlanRoutes);
  
  app.listen(port, () => {
    //app starts a express server and listens on port
    console.log(`App listening on port ${port}`);
  });

} catch (error) {
  console.error("Unable to connect to the database:", error);
};
