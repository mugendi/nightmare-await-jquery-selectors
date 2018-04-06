# Because we could use smarter selectors!

[NightMare](https://github.com/segmentio/nightmare) is awesome! Right?

One of the challenges I encountered running advanced tests is with the very useful ```.wait()``` method. You will almost always use this method but the selectors available to you do not enable you to wait for complex selectors like ```'span:contains("Issues")'```.

If you have ever had that problem, then here is a solution for you.

## Under the hood
To make this work, I use the same selector engine used by JQuery ([Sizzle](https://github.com/jquery/sizzle)) so you can use any advanced CSS3 selectors and pseudo-selectors with your aptly named **.awaitSelectors()** method. 

Oh, and I added a little *sugar* so you can do things like adding multiple selectors.

## Example

```javascript

let Nightmare = require('nightmare');

//require this before ninitializing Nightmare
require('nightmare-await-jquery-selectors');

let nightmare = Nightmare();

nightmare
    .goto('https://github.com/mugendi/nightmare-await-jquery-selectors')
    //NOTE: You can even pass an array of selectors!
    .awaitSelectors( ['span:contains("Issues")', '#js-repo-pjax-container li.commits > a'], true, 100 )
    .evaluate(function(){
        return document.querySelector('body').innerHTML
    })
    .end()
    .then(function (body) {
        console.log(body)
    })
    .catch(function (err) {
        console.error(err);
    })

```

## API

### ```.awaitSelectors(selectors [,matchAll, pollInterval])```

- **selectors :** (required) a *string* or array of CSS3 selectors.
- **matchAll :**  (optional, default=false) if set to true, then all selectors entered in array must be matched. If false, then nightmare waits till any of the selectors entered is matched.
- **pollInterval :** (optional, default=1000ms) entered in milliseconds. It determines how long to wait between checks for the matching selectors.
