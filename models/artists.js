// -------------------- EM ARTIST MODEL --------------------

const mongoose = require('mongoose');

const artistsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Portfolio: {
        type: String
    },
    Photo: {
        type: String,
        required: true
    },
    Deleted: {
        type: Boolean,
        default: false
    },
    New: {
        type: Boolean,
        default: true
    },
    Accepted: {
        type: Boolean
    },
    Votes: {
        type: Number,
        default: 0
    } 
});



module.exports = mongoose.model('ArtWorks', artistsSchema);

