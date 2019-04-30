const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

// route for addOrEdit handlebar
router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
}); 

router.post('/', (req, res) => {
    if(req.body._id === ''){
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});


router.get('/list', (req, res) => {
    console.log('list router');
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/viewList", {
                list: docs
            });
        } else {
            console.log('error while retrieving list', err);
        }
    });  
}); 


// by id should be last in order
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/addOrEdit', {
                employee: doc,
                viewTitle: 'Update Employee'
            });
        }
    })
});
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else { 
            console.log('Error in employee delete :' + err); 
        }
    });
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if(!err){
            res.redirect('/employee/list');
        } else {
            if(err.name === 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            } else {
                console.log('error during insertiion recored', err);
            }
        }        
    })
}
function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;
