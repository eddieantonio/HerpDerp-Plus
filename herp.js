/**
 * HerpDerp browser plugin
 * Forked from http://www.tannr.com/herp-derp-youtube-comments/
 * Runs in the context of the comment iframe widget.
 */

// Meant to be run with `this` bound to the DOMElement representing the YouTube
// comment.
function randomDerp() {
  var originalText,
      herpLength,
      wordArray,
      self = this,
      randomBit,
      i;

  // Keep a copy of the original text.
  originalText = $(this).html();

  // Allow a click on the derped text to change it into its original form
  // (unfortunately).
  $(this).one('click', function () {
    $(self).html(originalText);
  });

  // This needs fixing. The length has to be proportional to amount of words in
  // the text.
  herpLength = originalText.split(/\s+/).length;
  wordArray = [];

  for (i = 0; i < herpLength; i++) {
    randomBit = ~~(Math.random() * 2);
    wordArray.push(randomBit ? 'herp' : 'derp');
  }

  // Add derped class.
  $(this).addClass("derped");

  // Return the derp'd text.
  return '<p>' + wordArray.join(' ') + '</p>';

}

// Define how to derpify.
function derpify() {
  // Only select un-derped elements.
  $('.Ct').not('.derped').html(randomDerp);
}

if (parent === top) {

  // derpify for the first time.
  derpify();

  var commentBox = document.querySelector('.pga');
  var observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length < 1) {
        return;
      }

      // Regardless of what was added, derp it!
      derpify();
    });
  });

  observer.observe(commentBox, {
    childList: true,
    subtree: true,
  });

}
