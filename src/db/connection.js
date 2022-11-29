const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://jbpinfo:kXYPAWblyfGo323q@cluster0.2php3vm.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(" no connection")
})
