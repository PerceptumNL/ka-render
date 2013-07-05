// Render Khan exercise contained in the URL specified in the 2nd argument, ie:
// phantomjs render.js http://127.0.0.1:8000/exercises/absolute_value.html

function findBaseName(url) {
    var fileName = url.substring(url.lastIndexOf('/') + 1);
    var dot = fileName.lastIndexOf('.');
    return dot == -1 ? fileName : fileName.substring(0, dot);
}

var page = require('webpage').create();
var system = require('system');
var url = system.args[1];
var basename = findBaseName(url);
var filename = basename + ".html";

page.onConsoleMessage = function(msg) {
    if (msg == "RENDER") {
        console.log("Render " + basename + ".html")
        page.render("tmp/" + basename + '.png');
        phantom.exit();
    } else {
        console.log(msg);
    }
};

page.open(url, function (s) {
    console.log("Load url: " + url)
    page.evaluate(function() {
        var self = this;
        console.log("Evaluating page...")
        setTimeout(function() {
            var $ = window.$;
            var Khan = window.Khan;
            console.log("Problem Loaded")
            try {
                $("#hint").click()
                $("#hint").click()
                $("#hint").click()
                $("#hint").click()
                $("#hint").click()
                $("#hint").click()
                $("#hint").click()
                $("#hint").click()
                console.log("RENDER");
            } catch(e) {
                console.log("RENDER")
                console.log("ERROR: " + e)
                //phantom.exit();
            }
        }, 20000);
    })
});
