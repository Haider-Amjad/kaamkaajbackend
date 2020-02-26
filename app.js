var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

// routes
var routeServiceCategory = require('./app_server/routes/route.serviceCategory.js');
var routeServiceProvider = require('./app_server/routes/route.serviceProvider.js');
var routeAdmin = require('./app_server/routes/route.admin.js');
var routeCustomer = require('./app_server/routes/route.customer.js');
var routeRatingAndFeedback = require('./app_server/routes/route.ratingAndFeedback.js');
var routeBookingDetails = require('./app_server/routes/route.bookingDetails.js');
var routeConversation = require('./app_server/routes/route.conversation.js');
var routerequest =require('./app_server/routes/route.request.js');

var routeMessage = require('./app_server/routes/route.message.js');

var routeShared = require('./app_server/routes/route.shared.js');

var routeBookingSetting = require('./app_server/routes/route.bookingSetting.js');



var cors = require('cors')

var app = express();
app.use(cors())

// app.use(express.static(__dirname+'/client'));

// Set up mongoose connection
let dev_db_url = 'mongodb+srv://kaamkaaj:sp16bcs071@kaamkaaj-fsenj.mongodb.net/kaamkaaj?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('MongoDB connected…'))
.catch(err => console.log(err));

// upd
// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes call
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to KAAM-KAAJ Backend"
})
});

app.use('/admin', routeAdmin);
 app.use('/bookingdetails', routeBookingDetails);
 app.use('/conversation', routeConversation);
app.use('/customer', routeCustomer);
app.use('/request',routerequest)
app.use('/message', routeMessage);
app.use('/ratingandfeedback', routeRatingAndFeedback);
app.use('/serviceCategory', routeServiceCategory);
app.use('/serviceprovider', routeServiceProvider);
app.use('/shared', routeShared);

app.use('/bookingsetting',routeBookingSetting);
// app.use('/fixture',routeFixture);
// app.use('/complaint',routeComplaint);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// cloudinary parameters
cloudinary.config({
    cloud_name: 'dbmp0bj2w',
    api_key: '633199991493231',
    api_secret: 'JEl0r7j-BWticwGUfanSzMTtH2E' 
  });


module.exports = app;
