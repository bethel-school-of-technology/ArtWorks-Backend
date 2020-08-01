const jwt = require('jsonwebtoken');
const AdminUser = require('../models/admin');
const bcrypt = require("bcryptjs");

var authService = {
    signUser: function(user){
        const token = jwt.sign({
            Username: user.Username,
            UserId: user._id
        }, 'secretkey',
        {
            expiresIn: '1h'
        });
        return token;
    },
    verifyUser: function(token){
        try {
            let decoded = jwt.verify(token, 'secretkey');
            return AdminUser.findById(decoded.UserId);
        } catch(err){
            console.log(err);
            return null;
        }
    },
    hashPassword: function(plainTextPassword){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },
    comparePasswords: function(plainTextPassword, hashPassword){
        return bcrypt.compareSync(plainTextPassword, hashPassword);
    }
}

module.exports = authService;