
const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
url:{
    type:String,
    required:true,
    unique:true
},
title:{
    type: String,
    required:true
},
description:{
    type: String,
    required:true
},
tags:{
    type: String,
    required:true
},
thumbnailUrl:{
    type: String,
    required:true
}
})

const Videos = new  mongoose.model('Videos', videoSchema)

module.exports =  Videos