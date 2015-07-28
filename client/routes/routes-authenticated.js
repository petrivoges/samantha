/*
* Routes: Authenticated
* Routes that are only visible to authenticated users.
*/

Router.route('index', {
  path: '/',
  template: 'index',
  subscriptions: function(){
    return [
      Meteor.subscribe('examplePublication'),
      Meteor.subscribe('listSam')
    ];
  },
  after: function () {
    jQuery.getScript( 'https://cdn.rawgit.com/vidalab/isender/master/isender.js');
  },
  onBeforeAction: function(){
    // Code to run before route goes here.
    this.next();
  }
});
