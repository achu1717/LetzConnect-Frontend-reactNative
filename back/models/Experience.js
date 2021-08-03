const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required:true
    },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        from:{
            type:Number,
            required: true
        },
        to:{
            type:Number,
            required: true
        },
        Description:{
            type:String
        },
        currentlyWork:{
            type:Boolean
        }
    
    }, { timestamps: true }
    
    
);

module.exports = new mongoose.model('Experience', ExperienceSchema);