const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
//will be true if the environment is in production
const isProduction = environment === 'production';
//Initialize the Express application:
const app = express();
//morgan middleware for logging information about requests and responses:
app.use(morgan('dev'));
//Adding the cookie-parser middleware for parsing cookies
app.use(cookieParser());
//changed express.json middleware to bodyParser for aws
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
// helmet helps set a variety of headers to better secure the app
app.use(helmet({
    contentSecurityPolicy: false
}));

// Sets the _csrf token and creates req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

//has to be used after the other middlewares
app.use(routes);

//------------------ERROR HANDLERS------------------------------------------

//Resource Not Found Error-Handler
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

//Sequelize Error-Handler
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

//Error Formatter Error-Handler
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
