const express = require("express");
const parser = require("body-parser");
const router = require("./routers/index.js");
//const auth = require("./routes/authRouter.js");
const cors = require("cors");
require("dotenv").config();
//require("./db.js");

const app = express();
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded());
app.use("/", router);
//app.use("/auth");

 const Generator = require("./class/generator.js");
 const start = async () => {
   let generators = [];
   const generateController = require("./controllers/generatorController.js");
   const generatorFound = await generateController.getAllGenerators();
   // console.log(generatorFound)
   generatorFound?.forEach((generator) => {
     generators.push(
       new Generator(
         generator.id,
         generator.generatorName,
         generator.generateCooling,
         generator.generateHeating,
         generator.coolingPin,
         generator.heatingPin
       )
     );
   });
   // */
 };
 start();
app.listen(process.env.PORT || 5001, () => {
  try {
    console.log("connnected at port " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
