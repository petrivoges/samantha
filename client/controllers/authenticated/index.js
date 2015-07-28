Template.index.rendered = function() {
  return $('#request-beta-invite').validate({
    rules: {
      emailAddress: {
        email: true,
        required: true
      }
    },
    messages: {
      emailAddress: {
        email: "Please use a valid email address.",
        required: "An email address is required to send a Samantha."
      }
    },
    submitHandler: function() {
      var sam;
      var src = $("#toSpeech").val();
      var d = new Date();
      var replaced = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=en&q='+src.replace(/ /g, '+');
      sam = {
        email: $('[name="emailAddress"]').val().toLowerCase(),
        userId: Meteor.userId(),
        url: replaced,
        message: src,
        date: d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear(),
        time: d.getHours()+':'+d.getMinutes(),
        requested: (new Date()).getTime()
      };
      return Meteor.call('validateEmailAddress', sam.email, function(error, response) {
        if (error) {
          return Bert.alert(error.reason);
        } else {
          if (response.error) {
            return Bert.alert(response.error);
          } else {
            Meteor.call('addToSamList', sam, function(error, response) {
              if (error) {
                return Bert.alert(error.reason);
              }
              //  else {
              //   return Bert.alert("Sam added to user");
              // }
            });
            var body = Blaze.toHTMLWithData(Template.sendThis, {
              	name: Meteor.user().username,
	 	url: sam.url,
		message: sam.message,
		email: sam.email
            });
            return Meteor.call('sendEmail', sam, body, function(error, response) {
              if (error) {
                return Bert.alert(error.reason);
              } else {
                return Bert.alert("Your Samantha says has been send!");
              }
            });
          }
        }
      });
    }
  });
};

Template.index.events({
  'submit form': function(e) {
    return e.preventDefault();
  }
});
