const mongoose = require('mongoose');
const schema = mongoose.Schema;
// Booking Details Schema

const bookingDetailsSchema = new schema({
    state:{
      type:String,
      default:"pending"
    },
    bookingType:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    serviceProviderEmail:{
        type:String
    },
    serviceProviderName:{
        type:String
    },
    customerName:{
        type:String
    },
    customerEmail :{
        type:String
    },
    description:{
        type:String
    },
    title:{
        type:String
    },
    picture:{
        type:String
    },
    urgent:{
        type:String     
    }
})

const bookingDetails= module.exports = mongoose.model('BookingDetails',bookingDetailsSchema);