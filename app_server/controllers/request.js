var requests = require('../models/request.js');

module.exports.addrequest =async (requestform, callback) => {
    let record=new requests();
    record.workdetail=requestform.workdetail;
    record.serviceProviderEmail=requestform.serviceProviderEmail;
    record.serviceProviderName=requestform.serviceProviderName;
    record.bidPrice=requestform.bidPrice;
    record.estimatedTime=requestform.estimatedTime;


    if(!requestform.workdetail)
    {
        record.workdetail="";
    }

    if(!requestform.serviceProviderEmail)
    {
        record.serviceProviderEmail="";
    }
    if(!requestform.serviceProviderName)
    {
        record.serviceProviderName="";
    }
    if(!requestform.bidPrice)
    {
        record.bidPrice="";
    }
    
    if(!requestform.estimatedTime)
    {
        record.estimatedTime="";
    }
    record.save(callback);
}
module.exports.getrequests = (callback, limit) => {
    requests.find(callback).limit(limit);
}