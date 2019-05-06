const express = require('express');
var jwt = require('jsonwebtoken');

// format of token
// Authorization: Bearer <access_token>
const middleware = {
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];       
         
        if (typeof bearerHeader !== 'undefined') {
           
            const token = bearerHeader.split(' '); // ['Bearer', 'access_code'];
           
            req.token = token[1]; // we are assigning this token to req object, 
            // so that whatever router uses this middleware access this token
           
            next(); // calling next middleware
        } else {
            res.status(403).json({status: 403, error: 'forbidden'}) 
        }       
    }
    
}
module.exports = middleware;

