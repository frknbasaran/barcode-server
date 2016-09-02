// Simple HTTP server that renders barcode images using bwip-js.
var http   = require('http');
var bwipjs = require('bwip-js');

// Example of how to load a font into bwipjs. 
//    bwipjs.loadFont(fontname, sizemult, fontdata)
//
// To unload a font (and free up space for another):
//    bwipjs.unloadFont(fontname)
//
bwipjs.loadFont('Inconsolata', 108,
            require('fs').readFileSync('fonts/Inconsolata.otf', 'binary'));

http.createServer(function(req, res) {
    // If the url does not begin /?bcid= then 404.  Otherwise, we end up
    // returning 400 on requests like favicon.ico.
    if (req.url.indexOf('/?bcid=') != 0) {
        res.writeHead(404, { 'Content-Type':'text/plain' });
        res.end('BWIPJS: Unknown request format.', 'utf8');
    } else {
        bwipjs(req, res);
    }

}).listen(3030);