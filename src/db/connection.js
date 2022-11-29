const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/videodata').then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(" no connection")
})
