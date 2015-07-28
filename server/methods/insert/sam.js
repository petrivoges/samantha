/*
Sam
Collection of methods for inserting documents into the Sam collection.
*/
Meteor.methods({
  addToSamList: function(sam) {
    var samExists;
    check(sam, {
      email: String,
      message: String,
      url: String,
      userId: String,
      date: String,
      time: String,
      requested: Number
    });
    samExists = Sam.findOne({
      "email": sam.email,
      "message": sam.message
    });
    if (samExists) {
      throw new Meteor.Error("sam-exists", "It looks like you've already sent this message to this email address. Thanks!");
    } else {
      return Sam.insert(sam, function(error) {
        if (error) {
          return console.log(error);
        }
      });
    }
  }
});
