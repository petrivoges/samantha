/*
* Browser Policies
* Browser policy customizations.
* Documentation: https://atmospherejs.com/meteor/browser-policy
*/

customBrowserPolicies = function(){
  BrowserPolicy.framing.allowAll();
  BrowserPolicy.content.disallowInlineScripts();
  BrowserPolicy.content.allowEval();
  BrowserPolicy.content.allowInlineStyles();
  BrowserPolicy.content.allowFontDataUrl();

  var trusted = [
  '*.google.com',
  '*.ytimg.com',
  '*.rawgit.com',
  'translate.google.com',
  '*.kadira.io'
  ];

  _.each(trusted, function(origin) {
    origin = "https://" + origin;
    BrowserPolicy.content.allowOriginForAll(origin);
  });
  BrowserPolicy.content.allowEval('http://meteor.local');
  BrowserPolicy.content.allowEval('https://translate.google.com');

}
