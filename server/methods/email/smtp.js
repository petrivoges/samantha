/*
Invites
Collection of methods for updating documents in the Invites collection.
*/
Meteor.methods({
  sendEmail: function(sam,html) {
    console.log('sending email');
    var token;
    check(sam, {
      email: String,
      message: String,
      url: String,
      userId: String,
      date: String,
      time: String,
      requested: Number
    });
    check(html, String);
    token = Random.hexString(10);
    // return Invites.update(sam.id, {
    //   $set: {
    //     token: token,
    //     dateInvited: (new Date()).getTime(),
    //     invited: true,
    //     accountCreated: false
    //   }
    // }, function(error) {
    //   if (error) {
    //     return console.log(error);
    //   } else {
        return Email.send({
          to: sam.email,
          from: "Samantha <sayitbest@samantha.com>",
          subject: "Samantha say it best",
          html: html
          // html: Handlebars.templates['send-samantha']({
          //   token: token,
          //   url: sam.message,
          //   urlWithToken: sam.message + ("/" + token)
          // })
        });
    //   }
    // });
  }
});
