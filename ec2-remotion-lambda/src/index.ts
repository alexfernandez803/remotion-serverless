import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router as Router } from "./routes";
import config from "./config";
import { authentication } from "./libs/authentication";
import { errorHandler } from "./libs/errorhandler";

const app = express();

const port = config.port;

app.use(cors()); // Enable all cors requests for all routes
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// implement basic authentication
app.use(authentication);
app.use(errorHandler);
// parse application/json
app.use(bodyParser.json());
app.use(Router);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Hello" });
});

app.get("*", (req, res) => {
  res.status(404).send("Resource Not Found");
});

app.listen(port, () => {
  console.log(
    `Server is listening on port${port}\nYou can access via http://localhost:${port}/`
  );
});
