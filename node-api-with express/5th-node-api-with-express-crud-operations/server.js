const express = require('express');
const app = express();
const router = require('./routers/router');
const PORT = process.env.PORT || 9000;
const middleware = require('./middlewares/middleware');
const exphbs = require('express-handlebars');
require('./models/db');


// handlebar middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //cros origin we can give api.com, any example
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, HEAD");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(middleware.logger);

// body parser middleware
app.use(express.json()); // app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })) // for text files

//redirecting tp /employee route
app.get('/', (req,res) => {
    res.redirect('/employee');
})

app.use('/employee', router);

app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});