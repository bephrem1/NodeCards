const express = require('express');
const router = express.Router(); //Make express router

//Route
router.get('/', (req, res) => {
    const name = req.cookies.username;
    if(name){
      res.render('index', {name: name});
    } else {
      res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if(name){
      res.redirect('/');
    } else {
      res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username); //Sends cookie to the browser after we submit the for to save session data
    res.redirect('/'); //Render hello view with a name attribute from form in request body passed to view template
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});



module.exports = router; //Add router to exportes along with all the methods we defined for it in this file
