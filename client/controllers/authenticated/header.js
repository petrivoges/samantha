/*
*  Controller: Header
*  Template: /client/includes/_header.html
*/

/*
* Created
*/

Template.header.onCreated(function(){
  // Code to run when template is created goes here.
});

/*
* Rendered
*/

Template.header.onRendered(function() {
if(Meteor.isCordova){
  Meteor.startup(function () {
    $('#openBtn').on('click', function(event) {
      var src = $("#toSpeech").val();
      var replaced = src.replace(/ /g, '+');
      var url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=en&q='+replaced;
      // Modal.show('soundsLike', {replaced: replaced});
      var myMedia = new Media(url);
      myMedia.play();
    });
  });
}else{
  // Code to run when template is rendered goes here.
  (function (global) {
      function iterate(items, fn, cb) {
        var len = items.length;
        var current = 0;
        //closure fuction to iterate over the items async
        var process = function () {
          //var currentItem
          if (current === len) {
            cb && cb();
            return;
          }
          var item = items[current++];
          setTimeout(function () {
            fn(item, process);
          }, 20);
        };
        process();
      }

      var sayIt;

      function createSayIt() {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-pointer-lock');
        iframe.setAttribute('class', 'hidden-iframe')
        document.body.appendChild(iframe);
        var v = iframe.contentWindow;
        v.eval("function sayIt(query, language, cb) { var audio = new Audio(); audio.src = 'https://translate.google.com/translate_tts?ie=utf-8&tl=' + language + '&q=' + encodeURIComponent(query); cb && audio.addEventListener('ended', cb);  audio.play();}");
        sayIt = v.sayIt;
      }

      var speaker = {
        lang: 'en',
        maxWordsPerPhrase: 20,
        _breakPhrase: function (str, len) {
          var chunks = str.split(/\s+/),
          i = 0,
          n = chunks.length,
          oChunks = [];
          while (i < n) {
            oChunks.push(chunks.slice(i, i += len).join(' '));
          }
          return oChunks;
        },
        talk: function (phrase, done) {
          var me = this;
          me.onTalkStart && me.onTalkStart();
          var processedPhrases = me._breakPhrase((phrase || '').trim(), me.maxWordsPerPhrase);
          console.log(processedPhrases);
          iterate(processedPhrases || [], function (phrase, cb) {
            console.log('saying', phrase, cb);
            sayIt(phrase, me.lang, cb);
          }, function () {
            me.onTalkComplete && me.onTalkComplete();
            done && done();
          });
        }
      };

      global.text2Speech = {
        getSpeaker: function (lang, maxWordsPerPhrase) {
          var spkr = Object.create(speaker);
          spkr.lang = lang || 'en';
          // TODO: do a proper checking
          // this won't prevent a non number to be assigned here
          if (maxWordsPerPhrase) {
            spkr.maxWordsPerPhrase = maxWordsPerPhrase;
          }
          if (!sayIt) {
            createSayIt();
          }
          return speaker;
        }
      };

    }(jQuery));


    $().ready(function(){
      var text_max = 100;
      var text = 'Sounds like - '
      $('#openBtn').html(text + (text_max - $('#toSpeech').val().length) + ' possible characters available');

      $('#toSpeech').keyup(function() {
        var text_length = $('#toSpeech').val().length;
        var text_remaining = text_max - text_length;

        if(text_remaining == 1){
          $('#openBtn').html(text + text_remaining + ' possible character available');
        }else{
          $('#openBtn').html(text + text_remaining + ' possible characters available');
        }
      });

      if($('#toSpeech').val().length > 0){
        var spkr = jQuery.text2Speech.getSpeaker('en', 32);
        var btn = $('#openBtn');

        spkr.onTalkStart = function () {
          btn.toggleClass('busy', true);
        };
        spkr.onTalkComplete = function () {
          btn.toggleClass('busy', false);
        };
        btn.on('click', function (e) {
          spkr.talk($('#toSpeech').val());
        });
      }else{
        $('#toSpeech').focus();
      }

    });
  }
});

/*
* Helpers
*/

Template.header.helpers({
  example: function(){
    // Code to run for helper function.
  }
});

/*
* Events
*/

Template.header.events({
  'click .logout': function(){
    Meteor.logout(function(error){
      if(error){
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Succesfully logged out!', 'success');
      }
    });
  },
  'click .history': function(e){
    var spkr = jQuery.text2Speech.getSpeaker('en', 32);
    spkr.talk($(this).val());
    // $('#toSpeech').val($(this).html());
    // $('#openBtn').click();
  }
});
