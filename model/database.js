const mongoose = require('mongoose');

const mongourl = 'mongodb://127.0.0.1/userdata';

const connect = async() => {
    try{
        await mongoose.connect(mongourl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        
        // const user = mongoose.connection;

        console.log('connection connect sucessfully');
    }catch (error){
        console.log('error connection',error.message);

    }
}

connect();