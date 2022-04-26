const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
const  passport=require('passport');
const routerApiV1 = require('./v1');
const routerApiV2 = require('./v2');
var versionRoutes = require('express-routes-versioning')();

require("dotenv/config");

app.use(cors());
app.options("*", cors());
app.use(express.json())
app.use(bodyParser.json());
//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(
   bodyParser.urlencoded({
   extended: true,
   })
   );
   // passport
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
     "Access-Control-Allow-Methods",
     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
   );
   res.header(
     "Access-Control-Allow-Headers",
     "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
   );
   next();
 });

 //middleware routes-versioning
app.use(function(req, res, next)
    {
       req.version = req.headers['accept-version'];
       console.log(req.version);
       next();
    });

    //version path defined

    app.use('/api', versionRoutes({  
       "1.0.0": respondV1,
       "2.0.0": respondV2
    }));

    function respondV1(req, res, next)
     {   
        app.use('/api',routerApiV1);
        next();
     }
    function respondV2(req, res, next)
    {
       app.use('/api',routerApiV2);
       next();
    }


// catch 404 and forward to error handler




module.exports = app;


//Server
app.listen(3000, () => {
    console.log("server is running http://localhost:3000");
  });
  