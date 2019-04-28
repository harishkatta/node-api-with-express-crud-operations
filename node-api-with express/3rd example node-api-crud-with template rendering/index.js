const express = require('express');
const app = express();
const path = require('path');
const PORT= process.env.PORT || 9000;
const middleware = require('./middleware/middleware.js');
const router = require('./router/api/members-api');
const exphbs = require('express-handlebars');
const members = require('./Members-data');
// require('./models/db');
// let bodyParser = require('body-parser');

//set staic folder
// in public folder it will defaulty load index.html file if it has any files we can load them by localhost:9000/about.html
// app.use(express.static(path.join(__dirname, 'public')));

// handlebar middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// route for home handlebar
app.get('/', (req, res) => res.render('home', {
    title: 'Hello welcome to template engines',
    members
}));



// init middleware overall application level foreach & every route it will hit
app.use(middleware.logger);

// body parser middleware
app.use(express.json()); // app.use(bodyParser.json());
app.use(express.urlencoded({extended : false})) // for text files

//members api router
app.use('/api/members', router);
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})