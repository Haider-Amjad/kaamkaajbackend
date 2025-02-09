const serviceProvider=require('../models/serviceProvider.js');
const functions =require('../controllers/functions.js');
// const bookingDetails =require('../controllers/bookingDetails.js');
const ratingAndFeedback =require('../controllers/ratingAndFeedback.js');
const haversine = require('haversine');

// Get ServiceProvider
module.exports.getServiceProvider = (callback) => {
	serviceProvider.find(callback);
}

// Check email exists
module.exports.checkServiceProviderEmail = (email,callback) => {
	serviceProvider.findOne({email:email},callback);
}

// Get serviceProvider By ID
module.exports.getServiceProviderById = (id ,callback) =>  {
	serviceProvider.findById(id, callback);
}

// Get serviceProvider By category
module.exports.getServiceProviderByCategory = (category ,callback) =>  {
    serviceProvider.
    find({ category: {$regex: category , $options: 'i'}}).
    where('state').equals('approved').
    exec(callback);
}

// Get serviceProvider By email
module.exports.getServiceProviderByEmail = (email ,callback) =>  {
    serviceProvider.
    findOne({email: {$regex: email , $options: 'i'}}).
    where('state').equals('approved').
    exec(callback);
}


// Get serviceProvider By name
module.exports.getServiceProviderByName = (name ,callback) =>  {
    serviceProvider.
    find({name: {$regex: '.*' + name + '.*', $options: 'i'}}).
    where('state').equals('approved').
    exec(callback);
}

// Login
module.exports.login = (email,password,res) => {
    let record=new serviceProvider();
    serviceProvider.findOne({email:email}).
    where('state').equals('approved').
    exec(function(err,result)
        {
            if (err)
            {
                return res.status(500).json({Message:"Error in Connecting to DB",status:false});
            }

            else if(result)
            {
            		console.log(result.password);
            		if(record.comparePassword(password,result.password))
            			{
                	var result1 = result.toObject();
                	result1.status = true;
                	return res.json(result1);
            			}
            		else
            		{
                	return res.status(500).json({Message:"Wrong Password",status:false});
            		}

            }
            else
        {
            return res.status(500).json({Message:"Wrong Email",status:false});
        }

        });
}

// Get serviceProvider By address
module.exports.getServiceProviderByAddress = (keyword ,callback) =>  {
    serviceProvider.
    find({address: {$regex: '.*' + keyword + '.*', $options: 'i'}}).
    where('state').equals('approved').
    exec(callback);
}

// Get serviceProvider By location
module.exports.getServiceProviderByLocation = (lat,long,maxDistance ,callback) =>  {
    serviceProvider.
    find({
        location: {
           $nearSphere: {
              $geometry: {
                 type : "Point",
                 coordinates : [ long, lat ]
              },
              $maxDistance: maxDistance
           }
        }
      }).
    where('state').equals('approved').
    exec(callback);
}

// Add serviceProvider
module.exports.addServiceProvider = async (serviceProviderform, callback) => {
    let record=new serviceProvider();
    record.name=serviceProviderform.name;
    record.contact=serviceProviderform.contact;
    record.address=serviceProviderform.address;
    record.location={long:serviceProviderform.long,
                     lat:serviceProviderform.lat};
    record.category=serviceProviderform.category;
    record.contact=serviceProviderform.contact;
    record.email=serviceProviderform.email;
    record.password=record.hashPassword(serviceProviderform.password);

    if(serviceProviderform.picture_profile)
    {
        try
        {
            imgUrl=await functions.uploadPicture(serviceProviderform.picture_profile);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }

        record.picture_profile=imgUrl.url;
       
    }
    else
    {
        record.picture_profile="";
    }
    
    if(serviceProviderform.picture_cover)
    {
        try
        {
            imgUrl=await functions.uploadPicture(serviceProviderform.picture_cover);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }

        record.picture_cover=imgUrl.url;
       
    }
    else
    {
        record.picture_cover="";
    }
    
    if(serviceProviderform.picture_1)
    {
        try
        {
            imgUrl=await functions.uploadPicture(serviceProviderform.picture_1);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }

        record.picture_1=imgUrl.url;

    }
    else
    {
        record.picture_1="";
    }

    if(serviceProviderform.picture_2)
    {
        try
        {
            imgUrl=await functions.uploadPicture(serviceProviderform.picture_2);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }

        record.picture_2=imgUrl.url;

    }
    else
    {
        record.picture_2="";
    }

    if(serviceProviderform.picture_3)
    {
        try
        {
            imgUrl=await functions.uploadPicture(serviceProviderform.picture_3);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }

        record.picture_3=imgUrl.url;

    }
    else
    {
        record.picture_3="";
    }

    if(serviceProviderform.picture_4)
    {
        try
        {
            imgUrl=await functions.uploadPicture(serviceProviderform.picture_4);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }

        record.picture_4=imgUrl.url;
    }
    else
    {
        record.picture_4="";
    }

    if(serviceProviderform.picture_5)
    {
        try
        {
            imgUrl=await functions.uploadPicture(serviceProviderform.picture_5);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }

        record.picture_5=imgUrl.url;
    }
    else
    {
        record.picture_5="";
    }
    if(!serviceProviderform.token)
    {
        record.token="";
    }

    record.save(callback);
}

// Update serviceProvider
module.exports.updateServiceProvider = async (email, serviceProviderform, options, callback) => {
    var query = {email: email};
    let record=new serviceProvider();
    // if(serviceProviderform.lat&&serviceProviderform.long)
    // {
    //     serviceProviderform.location={lat:serviceProviderform.lat,long:serviceProviderform.long}
    // }
    if(serviceProviderform.password)
    {
        serviceProviderform.password=record.hashPassword(serviceProviderform.password);
    }
    if(serviceProviderform.picture_profile)
    {
        try
        {
            imgUrl=await functions.uploadPicture(serviceProviderform.picture_profile);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }

        serviceProviderform.picture_profile=imgUrl.url;
    }
    
    if(serviceProviderform.picture_cover)
    {
        try
        {
            imgUrl=await functions.uploadPicture(serviceProviderform.picture_cover);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }

        serviceProviderform.picture_cover=imgUrl.url;
       
    }
    serviceProvider.findOneAndUpdate(query, serviceProviderform,options,callback);

}

// Delete serviceProvider
module.exports.removeServiceProvider = (id, callback) => {
    var query = {_id: id};
    serviceProvider.remove(query, callback);
}


