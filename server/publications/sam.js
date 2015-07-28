Meteor.publish('listSam', function(){
  var userId = this.userId;
  return Sam.find({"userId": userId});
});
