Template.samList.onRendered(function() {
  console.log(this.data.replaced);
});
Template.samList.helpers({
  list: function() {
    return Sam.find({
      userId: Meteor.userId()
    },{sort: {requested: -1}});
  }
});
