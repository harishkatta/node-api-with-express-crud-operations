const mongoose = require('mongoose');
var membersSchema = new mangoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: Boolean
    }
})
mongoose.model('Member', membersSchema);