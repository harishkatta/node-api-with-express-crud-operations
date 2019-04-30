const middleware ={
     logger: (req, res, next) => {
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${new Date().toLocaleString()}`);
        next(); // if we don't call next() no action will be triggered;
    }
}
module.exports= middleware;