const express = require('express');
const app = express();
const morgan = require('morgan');
const usersRoutes = require('./routes/users');
const annonces_ventesRoutes = require('./routes/annonces_ventes');
const profiles = require('./routes/profile');

app.get('/', (req,res,next) => {
    res.status(200).json("users")
})

//middleware
app.use(express.json());
app.use(morgan('tiny'));

app.use("/auth", usersRoutes);
app.use("/annonces_ventes/", annonces_ventesRoutes);
app.use("/profile", profiles);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
 })
 
 
 // error handler
 
 app.use((error, req, res, next) => {
      // render the error page
 
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
 });
module.exports = app;
