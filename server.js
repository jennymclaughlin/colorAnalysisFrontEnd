//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var https = require('https');
app.use(express.static("color-analysis"));

// Body Parser Middleware
app.use(bodyParser.json());
app.set("view options", {layout: false});  
//app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');
app.set('views', __dirname + "/public/views/pages");

var router = express.Router();
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get('/', function (req, res,next) {
    res.redirect('/'); 
   });

app.get('/getUser', function (req, res) {
    console.log(req.userid);
    // var postheaders = {
    //     'Content-Type': 'application/json',
    //     'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
    // };',
        headers: postheaders
    var optionspost = {
        host: 'https://localhost:44365/',
        path: 'api/User/' + req.userid,
        method: 'GET'
    }

    var reqPost = https.request(optionspost, function (response) {
        console.log("statusCode: ", response.statusCode);
        // uncomment it for header details
        //  console.log("headers: ", res.headers);
        response.on('data', function (d) {
            console.info('POST result:\n');
            process.stdout.write(d);
            console.info('\n\nPOST completed');
            res.send(d);
        });
    });

    // write the json data
    reqPost.write(jsonObject);
    reqPost.end();
    reqPost.on('error', function (e) {
        console.error(e);
    });

});

var server = app.listen(4000, function () {
    console.log('Server is running..');
});