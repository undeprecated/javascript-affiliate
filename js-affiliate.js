/**
 *  js-affiliate.js v0.0.1
 *
 *  https://www.undeprecated.com/
 *  (c) 2020 Nick Curry, Undeprecated, LLC
 *  Released under the MIT license.
 */

var JsAffiliate = function(configs) {
  /**
   * Return URL of the current page including query string.
   * @return {String} URL
   */
  function getCurrentPage() {
    return window.location.href;
  }

  /**
   * Simple help to loop over something.
   *
   * @type {iterator} iterator  - Array to loop over.
   * @type {function} handler   - A function to execute on each.
   * @type {Array} args         - Array of extra arguments to pass in.
   */
  function foreach(iterator, handler, args) {
    iterator = iterator || [];
    if (args == null) {
      args = [];
    }

    for (var i = 0; i < iterator.length; i++) {
      handler(iterator[i], ...args);
    }
  }

  /**
   *
   */
  function matches(match_this, to_that) {
    if (match_this === "*") {
      return true;
    }
    if (to_that instanceof RegExp) {
      return to_that.test(match_this);
    }
    if (typeof to_that === "string") {
      var re = RegExp(to_that, "i");
      return re.test(match_this);
    }
  }

  /**
   *
   */
  function addAffiliate(config) {
    var selector = config.selector;
    var findText = config.findText;
    var linkTo = config.linkTo;
    var a = config.a || null;
    var url = config.url || "*";
    var position = config.position || "end";
    var occurrences = config.occurrences || 1;
    var currentPage = getCurrentPage();
    var occurrences_applied = 0;

    if (occurrences === 0) {
      return;
    }

    if (matches(url, currentPage)) {
      var nodes = [];
      try {
        nodes = document.querySelectorAll(selector);
      } catch (e) {
        console.error("invalid query selector `" + selector + "`");
      }

      if (nodes) {
        occurrences_applied = 0;

        for (var i = nodes.length; i--; ) {
          var start = position === "start" ? nodes.length - i - 1 : i;
          var node = nodes[start];
          var a_tag = a || '<a href="' + linkTo + '">' + findText + "</a>";
          var swapped = textToLink(node, findText, a);

          if (swapped && occurrences) {
            occurrences_applied = occurrences_applied + 1;
          }

          if (occurrences_applied === occurrences) {
            return;
          }
        }
      }
    }
  }

  /**
   *
   * @param  {HTML Element} reference     Element to search in
   * @param  {string} text                Text to search in Element
   * @param  {string} link                Text to swap in
   * @return {boolean}           True if found, false if not
   */
  function textToLink(reference, text, link) {
    var replacement = reference.innerText.replace(text, link);

    reference.innerHTML = replacement;

    return reference.innerText !== replacement;
  }

  foreach(configs, addAffiliate);
};
