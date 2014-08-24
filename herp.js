// HerpDerp browser plugin
// Forked from http://www.tannr.com/herp-derp-youtube-comments/
// Runs at document end.

// Meant to be run with `this` bound to the DOMElement representing the YouTube
// comment.
function randomDerp() {
  var originalText
    , herpLength
    , wordArray
    , self = this
    , randomBit
    , i
    ;

  // Keep a copy of the original text.
  originalText = $(this).html();

  // Allow a click on the derped text to change it into its original form
  // (unfortunately).
  $(this).one('click', function () {
    $(self).html(originalText);
  });

  // This needs fixing. The length has to be proportional to amount of words in
  // the text.
  var herpLength = originalText.split(/\s+/).length;
  var wordArray = [];

  for (i = 0; i < herpLength; i++) {
    randomBit = Math.floor(Math.random()*2);

    wordArray.push(
      randomBit ? 'herp' : 'derp'
    );
  }

  // add derped class
  $(this).addClass("derped");

  // Return the derp'd text.
  return '<p>' + wordArray.join(' ') + '</p>';

}

// Define how to derpify.
function derpify() {
  // Only select un-derped elements.
  $('.comment-text, p.ctx').not('.derped').html(randomDerp);
};

// derpify for the first time.
derpify();

/*
// Repeat every once in a while.
setInterval(derpify , 100);
*/

// Derpify when any of these are clicked.
// It doesn't actually work... but whatever...
$('yt-uix-pager-button, yt-uix-pager-show-more, comment-action-showparent')
  .on('click', derpify);

