var express = require('express');
var router = express.Router();

var request = require('../controllers/request.js');
 var functions = require('../controllers/functions.js');

 
//Add requests
router.post('/add_request', function (req, res) {
    var requestform = req.body;
    console.log(req.body.bidPrice)
    request.addrequest(requestform, function (err, request) 
    {
        if (err) 
        {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } 
        else 
        {
            var result = request.toObject();
            result.status = true;
            return res.json(result);
            
        }
    });
});

// All Requets
router.get('/get_request', function (req, res) {
    request.getrequests(function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});

module.exports = router;