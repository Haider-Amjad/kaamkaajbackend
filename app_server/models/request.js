const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Request Schema

const requestSchema = new schema({
    
    booking_id:{
        type:String
        
      },
      workdetail:{
        type:String
    },
    serviceProviderEmail:{
        type:String
    },
    serviceProviderName:{
        type:String
    },
    state:{
        type:String,
        default:"pending"
      }, 
    bidPrice:{
        type:String
    },
    estimatedTime:{
        type:String
    }
})


const request= module.exports = mongoose.model('Request',requestSchema);
