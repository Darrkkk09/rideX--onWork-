const mong = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


mong.connect(process.env.mongo_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const schema = new mong.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
});
module.exports = mong.model('user', schema);
