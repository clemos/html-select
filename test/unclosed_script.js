var select = require('../');
var test = require('tape');
var tokenize = require('html-tokenize');
var through = require('through2');
var fs = require('fs');

test('unclosed_script', function (t) {
    t.plan(1);
    var s = select();
    s.select('script', function (e) {
        var s = e.createStream();
        s.pipe(s);
    });


    var input = [];
    var output = [];

    fs.createReadStream(__dirname + '/unclosed_script/index.html')
        .pipe(tokenize())
        .on('data', function(chunk){
            input.push(chunk);
        })
        .on('end',function(){
            console.log('end tokenize');
        })
        .pipe(s)
        .on('data', function(chunk){
            output.push(chunk);
        })
        .on('end', function(){
            t.deepEqual(input,output);
        });

    s.resume();
});
