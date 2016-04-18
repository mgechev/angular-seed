import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as http from "http";
// import * as cookieParser from "cookie-parser"; // does not work yet
import * as chalk from "chalk";
// var protect = require("./routes/protected");
// var login = require("./routes/login");

let appConfig = { staticRoot: "" };
let app = express();
let env = process.env.env || "dev";
console.log(chalk.yellow("ENVIRONMENT - " + env));

if (env !== "prod") {
  appConfig.staticRoot = path.join(__dirname, "../dev");
} else {
  appConfig.staticRoot = path.join(__dirname, "../prod");
}
console.log(chalk.yellow("ROOT - " + appConfig.staticRoot));

app.disable("x-powered-by");

if (env === "dev") {
  app.use("/", express.static(appConfig.staticRoot));
  app.use("/dist/dev", express.static(appConfig.staticRoot));
  app.use("/node_modules", express.static(path.join(__dirname, "../../node_modules")));
} else {
    app.use(express.static(appConfig.staticRoot));
}

app.use(logger("dev"));
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
// app.use("/api", protect);
// app.use("/login", login);

// error handlers
app.use(<express.ErrorRequestHandler> function(err, req, res, next) {
    console.log("Error status is: ", err.status);
    console.log("Error message", err.message || err.msg);

    if (err.status === 200) {
        res.status(500);
    } else {
        res.status(err.status || 500);
    }

    res.send(err);
});

let port = process.env.PORT || "3000";
app.set("port", port);
let server = http.createServer(app);
console.log(chalk.yellow("PORT - " + port));
server.listen(port);

// module.exports = app;
