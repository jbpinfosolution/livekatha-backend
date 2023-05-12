const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://jbpinfo:M3xO7iOuhTUPQ4WH@cluster0.2php3vm.mongodb.net/test?retryWrites=true&w=majority').then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(" no connection")
})
