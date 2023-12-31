var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var rankRouter = require("./routes/rank");
var authRouter = require("./routes/auth");
var challengeRouter = require("./routes/challenge");
var userRouter = require("./routes/user");
var commonRouter = require("./routes/common");
var dailychallengeRouter = require("./routes/dailychallenge");
var campaignRouter = require("./routes/campaign");
var fileRouter = require("./routes/file");

const {task} = require('./middleware/corn');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", commonRouter);
app.use("/auth", authRouter);
app.use("/challenge", challengeRouter);
app.use("/dailychallenge", dailychallengeRouter);
app.use("/user", userRouter);
app.use("/campaign", campaignRouter);
app.use("/upload", fileRouter);
app.use("/rank", rankRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
