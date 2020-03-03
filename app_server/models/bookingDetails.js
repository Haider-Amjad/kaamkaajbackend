const mongoose = require('mongoose');
const schema = mongoose.Schema;
// Booking Details Schema

const bookingDetailsSchema = new schema({
    bookingstate:{
      type:String,
      default:"pending"
    },
    bookingType:{
        type:String
    },
    bookingdate:{
        type:String
    },
    bookingtime:{
        type:String
    },
    bookingserviceProviderEmail:{
        type:String
    },
    bookingserviceProviderName:{
        type:String
    },
    customerName:{
        type:String
    },
    customerEmail :{
        type:String
    },
    bookingdescription:{
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