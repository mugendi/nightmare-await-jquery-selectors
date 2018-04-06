let Nightmare = require('nightmare');

require('.');

let nightmare = Nightmare();

nightmare
    .goto('https://github.com/mugendi/nightmare-await-jquery-selectors')
    //NOTE: You can even pass an array of selectors
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