// -------------------- EM ADMIN MODEL --------------------

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Admin: {
        type: Boolean,
        default: true
    },
    Deleted: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('AdminUser', adminSchema);