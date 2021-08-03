const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
    skills: {
        type: Array,
        required:true
    },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        
    
    }, { timestamps: true }
    
    
);

module.exports = new mongoose.model('Skills', SkillsSchema);