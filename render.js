// Needs to have python SimpleHTTPServer running at http://127.0.0.1:8000
//
// http://127.0.0.1:8000/test/index.html#absolute_value.html
// 
// Saves the a PNG screenshot in absolute_value.png, or 
// absolute_value-1b302c93249f99f0de4f2432a7ac4eae012b5820.png
// if commit hex value is passed as 2nd argument

var page = require('webpage').create();
var system = require('system');
var filename = system.args[1];
var basename = filename.split(".html")[0]
page.onConsoleMessage = function (msg) {
    if (msg == "RENDER") {
        console.log("Render " + filename)
        page.render(basename + '.png');
        phantom.exit();
    }
    else {
        console.log("b: " + msg);
    }
};
page.open('http://127.0.0.1:8000/exercises/' + filename, function (s) {
    console.log("Loaded " + filename + ": " + s)
    page.evaluate(function () {
        setTimeout(function() {
            var $ = window.$;
            var Khan = window.Khan;
            $(document).one("problemLoaded", function() {
                try {
                    console.log("Problem Loaded")
                    $("#hint").click()
                    $("#hint").click()
                    $("#hint").click()
                    $("#hint").click()
                    $("#hint").click()
                    $("#hint").click()
                    $("#hint").click()
                    $("#hint").click()
                    console.log("RENDER")
                } catch(e) {
                    console.log("ERROR: " + e)
                    console.log("RENDER")
                }
            });
        }, 100)
    })
    setTimeout(function() {
        console.log("RENDER")
    }, 20000)
});
