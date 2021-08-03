const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    institution: {
        type: String,
        required:true
    },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        degree: {
            type: String,
        },
        field: {
            type: String,
        },
        grade:{
            type: String
        },
        activities: {
            type: String,
        },
        start:{
            type:Number
        },
        end:{
            type:Number
        },
        Description:{
            type:String
        }
    
    }, { timestamps: true }
    
    
);

module.exports = new mongoose.model('Education', EducationSchema);