/**
 * HerpDerp browser plugin
 * Forked from http://www.tannr.com/herp-derp-youtube-comments/
 * Runs in the context of the comment iframe widget.
 */

// Meant to be run with `this` bound to the DOMElement representing the YouTube
// comment.
function randomDerp() {
  var originalText,
      originalHTML,
      herpLength,
      wordArray,
      self = this,
      randomBit,
      i;

  // Keep a copy of the original HTML and text.
  originalHTML = self.innerHTML;
  originalText = self.innerText;

  // Allow a click on the derped text to change it into its original form
  // (unfortunately).
  $(self).one('click', function () {
    $(self).html(originalHTML);
  });

  // This needs fixing. The length has to be proportional to amount of words in
  // the text.
  herpLength = originalText.split(/\s+/).length;
  wordArray = [];

  for (i = 0; i < herpLength; i++) {
    randomBit = ~~(Math.random() * 2);
    wordArray.push(randomBit ? 'herp' : 'derp');
  }

  // Derp the text and add derped class.
  $(self)
    .text(wordArray.join(' '))
    .addClass('derped');
}

// Define how to derpify.
function derpify() {
  // Do to reasons beyond me, we gotta wait a while until the text actually
  // appears on the page...
  setInterval(function () {
    // Only select un-derped elements.
    $('.Ct').not('.derped').each(randomDerp);
  }, 65);
}

(function () {

  derpify();

  var commentRoot = document.querySelector('.pga');

  if (commentRoot === null) {
    // We might not get a comment root node (for some reason)
    // so just return in this case.
    return;
  }

  // Create an observer that will change underp'd comments.
  var observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length < 1) {
        return;
      }

      // This observer will also notify us of derping events;
      // make sure those get ignored.
      if (mutation.target.classList.contains('derped')) {
        return;
      }

      derpify();
    });
  });

  observer.observe(commentRoot, {
    childList: true,
    subtree: true,
  });

}());
