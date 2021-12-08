var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var mongoDB = 'mongodb+srv://AdamK:DB924th4@cluster0.sml97.mongodb.net/FoodSearch?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



var Schema = mongoose.Schema;

var User = new Schema({
    username: { 
        type: String,
        max: 30,
        required: true,
        unique: true
    },
    recipes: [{ title: String, url: String, img: String}]
});

// Export Model
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userData', User, 'userData');

