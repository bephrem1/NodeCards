const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express(); //Creates express application. This function returns an express application.

//Middleware everytime a request is made
app.use(bodyParser.urlencoded({extended : false})); //Setup body bodyParser
app.use(cookieParser()); //Provide cookie parser to the app for use
app.use('/static', express.static('public')); //Link application to the static assets folder which resides in 'public'
app.set('view engine', 'pug'); //Tells express which templating engine to use, by default looks to 'views' folder in root of project


//***YOU END MIDDLEWARE BY EITHER SAYING next() OR SENDING A RESPONSE
// app.use((req, res, next) => {
//     req.message = "This message will make it to the next middleware function";
//     const err = new Error();
//     err.status = 500;
//     next(err); //Express relies on the next function to know when to move forward ||| Passing in error object tells express there was an error
// });
//
// app.use((req, res, next) => {
//     console.log(req.message);
//     next();
// });

const mainRoutes = require('./routes/index.js'); //You can just say './routes' since file is called index but wanted to be explicit here
const cardRoutes = require('./routes/cards.js');

app.use(mainRoutes); //Pass the routes that you create, imported with require, and stored into the const routes to the app for use
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next();
});

//Error handler middleware
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});
