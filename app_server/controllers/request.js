var requests = require('../models/request.js');

module.exports.addrequest = (requestform, callback) => {
    requests.create(requestform, callback);
}
module.exports.getrequests = (callback, limit) => {
    requests.find(callback).limit(limit);
}