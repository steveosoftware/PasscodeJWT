const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//encryption
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) {
        return next(err);
      }
      user.password = hash;
      next();  //back to save model userSchema.pre('save')
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) {return callback(err);}

    callback(null, isMatch);
  })
}

const User = mongoose.model('User', userSchema )


module.exports = User;

