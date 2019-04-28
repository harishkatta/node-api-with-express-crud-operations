const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MembersDB', {useNewUrlParser: true}, (err) => {
    if(!err){
        console.log('mongo db connection succesfull');
    }
});