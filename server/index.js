const express = require("express");
const bodyParser = require("body-parser");
const mc = require(`${__dirname}/controllers/messages_controller`);
const session = require("express-session");
require("dotenv").config();

//MIDDLEWARES
//
const createInitialSession = require(`${__dirname}/middlewares/session.js`); //REQUIRE SESSION
const filter = require(`${__dirname}/middlewares/filter.js`);

const app = express();

app.use(bodyParser.json());
// app.use(express.static(`${__dirname}/../public/build`));
app.use(express.static(`${__dirname}/build`));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: { maxAge: 10000 }
  })
);

//CALL SESSION:Add middleware to app that captures req, res,&next.then calls createInitialSession with req, res &next as arguments.
app.use((req, res, next) => {
  createInitialSession(req, res, next);
});

//Check if the method of the request is POST/PUT.If it is POST / PUT, call filter with req, res &next as arguments. OR ELSE just invoke next.
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    filter(req, res, next);
  } else {
    next();
  }
});

const messagesBaseUrl = "/api/messages";
//ENDPOINTS FOR MESSAGES:
app.post(messagesBaseUrl, mc.create);
app.get(messagesBaseUrl, mc.read);
app.put(`${messagesBaseUrl}`, mc.update);
app.delete(`${messagesBaseUrl}`, mc.delete);

app.get(`${messagesBaseUrl}/history`, mc.history);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
