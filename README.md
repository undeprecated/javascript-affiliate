# js-affiliate

A simple pure JavaScript library you can use to easily manage affiliate links on your website.

### Installation

```html
<body>
  <script type="text/javascript" src="js-affiliate.js"></script>
  <script type="application/javascript">
    JsAffiliate([
      {
        url: "*",
        selector: "article p",
        findText: "cPanel",
        linkTo: "https://www.cpanel.com"
      }
    ]);
  </script>
</body>
```

## Usage

Include the library on your website. This will make a global variable called `JsAffiliate` on the window scope. By default, JsAffiliate will replace the last occurrence of your selector with a link.

    JsAffiliate([...options]);

`JsAffiliate` accepts an array of the following options.

### Options

#### url

The pages you want this code to execute on.

    url: '*' // all pages
    url: 'htts://www.example.com/product' // only pages that begin with this string
    url: 'product' // any pages with the word product in it
    url: /product/i // any pages with the word product in it

This can be a URL, regular expression, or '\*' for all pages. If it's a URL, we check i

#### selector

A CSS selector to target. This will be the HTML element that contains the text you want to search for.

    selector: "body p"

This will search all `p` tags inside the `body`.

#### findText

The text inside the matching `selector` you want to replace.

    findText: "cPanel"

**NOTE: If your text exists multiple times in the selector, only the first match will get replaced.**

#### linkTo

A URL you want `findText` to point to.

    linkTo: "https://www.cpanel.com"

#### a

Instead of `linkTo` you can define an HTML `<a>` tag to use instead.

    a: '<a href="https://www.cpanel.com" target="_blank">Buy cPanel Now!</a>'

Use this if you want to open the link in a new tab or change the anchor text.

#### position

Defaults to searching at the end of your document.

    position: "end" // default

valid values are `start` or `end`

If you want to find text at the beginning of your document the set the `start`.

#### occurrences

Max number of times `findText` will be replaced with `linkTo` or `a`.

    occurrences: 1 // default

Use `-1` for all occurrences.

## Examples

On `/products` pages, select paragraph tags and replace the first occurrence of `Amazon` with a link to `https://www.amazon.com`.

```javasscript
JsAffiliate([
  {
    url: "/products",
    selector: "body p",
    findText: "Amazon",
    linkTo: "https://www.amazon.com",
    position: "first",
    occurrences: 1
  }
]);
```

Replace every occurrence of `Amazon` inside a span tag inside a p tag and replace it with a link to `https://www.amazon.com`.

```javasscript
JsAffiliate([
  {
    url: "*",
    selector: "body p span",
    findText: "Amazon",
    linkTo: "https://www.amazon.com",
    occurrences: -1
  }
]);
```

## Author

[https://www.undeprecated.com](https://www.undeprecated.com)
