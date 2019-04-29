const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 9000;
const router = require('./router/route');

//body-parse middleware
app.use(express.json()); // app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })) // for text files

app.use('/users/', router);
app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});