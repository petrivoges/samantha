var Future = Npm.require('fibers/future');

Meteor.methods({
  validateEmailAddress: function(address) {
    console.log(address);
    var validateEmail;
    check(address, String);
    validateEmail = new Future();
    HTTP.call("GET", "https://api.kickbox.io/v1/verify", {
      params: {
        email: address,
        apikey: "75ea3cf451e614053df832719031df523f8a7dca64d4e29cebf47706822a3a90"
      }
    }, function(error, response) {
      if (error) {
        return validateEmail["return"](error);
      } else {
        if (response.data.result === "invalid" || response.data.result === "unknown") {
          return validateEmail["return"]({
            error: "Sorry, your email was returned as invalid. Please try another address."
          });
        } else {
          return validateEmail["return"](true);
        }
      }
    });
    return validateEmail.wait();
  }
});
