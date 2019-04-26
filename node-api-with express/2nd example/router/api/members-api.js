const express = require('express');
const router = express.Router();
const members = require('../../Members-data.js');
const uuid = require('uuid');

// get all members
router.get('/', (req, res) => res.json(members));

// get member by id
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    // req.params.is is a string
    if (found) {
        res.send(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        // we can concat multiple methods
        res.status(400).json({ msg: `No member with this ${req.params.id}` });
    }
});

// to add member in order to add data from body we have to use 
// body parser, but in v4.0 express verson we can use express.json() in app.use
router.post('/', (req, res) => {
    const newMember= {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email){
        res.status(400).json({msg: 'please include a name and email'});
    } else {
        members.push(newMember);
        res.status(200).json(members);
    }
});

// to update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    // req.params.is is a string
    if (found) {  
        const uptMember = req.body;      
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = uptMember.name ? req.body.name: member.name;
                member.email = uptMember.email ? req.body.email: member.email;
                res.status(200).json({msg: 'member updated', member});
            }
        })
    } else {
        // we can concat multiple methods
        res.status(400).json({ msg: `No member with this ${req.params.id}` });
    }
});

// to delete member
router.delete('/:id', (req, res) => {
    let deletedId = parseInt(req.params.id);
    let index = members.findIndex((member) => member.id === deletedId);
    if (index !== -1) {
        members.splice(index, 1);
        res.status(200).json({sucess: 'member deleted succesfully', members: members});
    } else {
        res.status(404).json({ "Error:": "No member found with this Id" });
    }
});

module.exports = router;
