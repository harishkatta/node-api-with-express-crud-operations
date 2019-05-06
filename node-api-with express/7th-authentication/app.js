const express = require('express');
var jwt = require('jsonwebtoken');
const app = express();
const middleware = require('./middleware');


app.get('/api', (req, res) => {
    res.send({msg: 'welcome to JWT concept'});
});

app.post('/api/post', middleware.verifyToken, (req, res) => {
    // it has to  macth token & secret key
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({ msg: 'message posted', authData });
        }

    });
});

app.post('/api/login', (req, res) => {
    // mock user this user data has to access from req.body
    let user = {
        id:1,
        name:'harish',
        email: 'harish.kattas@gmail.com'
    };

    jwt.sign({ user: user}, 'secretKey', (err, token) => {
        // res.json({token:token});
        res.json({ token}); // in ES6
    });
});

app.listen(9000 ,(req, res) => {
    console.log('port listen at 9000');
})
