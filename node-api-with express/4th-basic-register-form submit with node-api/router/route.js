const express = require('express');
const router = express.Router();
const members = require('../members-data');
const uuid = require('uuid');


router.get('/', (req, res) => {
    res.status(200).send(members);
});

router.post('/form-submit/', (req, res) => {
    console.log(req.body);
    let newMember = req.body;
    if (newMember.Name && newMember.Email && newMember.Mobile && newMember.City) {
        members.push({
            id: uuid.v4(),
            name: newMember.Name,
            email: newMember.Email,
            mobile: newMember.Mobile,
            city: newMember.City,
            status: 'active'
        });
        res.status(200).send('new user added successfully');        
    } else {
        res.status(400).json({msg: 'please enter valid name & email'})
    }
});

module.exports = router;