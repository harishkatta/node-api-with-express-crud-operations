const express = require('express');
const app = express();
const path = require('path');
const PORT= process.env.PORT || 9001;
const members = require('./Members.js');
const middleware = require('./middleware/middleware.js');

 // ###############  1st one ####################### //
 
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
//     // res.send('<h1>hello world !! </h1>');
// })

// ###############  2nd one ####################### //
//set staic folder
// in public folder it will defaulty load index.html file if has any files we can use localhost:9000/about.html
app.use(express.static(path.join(__dirname, 'public')));


// get all members with route level middleware
// app.get('/api/members', middleware.logger, (req, res) => res.json(members));

// init middleware overall application level foreach & every route it will hit
app.use(middleware.logger);


// get all members
app.get('/api/members',(req, res) => res.json(members));


// get member by id
app.get('/api/members/:id', (req, res) => {
    // req.params.is is a string
    if (members.some(member => member.id === parseInt(req.params.id))){
        res.send(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        // we can concat multiple methods
        res.status(400).json({ msg: `No member with this ${req.params.id}`});
    }   
});

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})