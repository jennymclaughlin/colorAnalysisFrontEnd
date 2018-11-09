//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();
var https = require('https');
var mongo = require('mongodb')
var mongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    // var myobj = { name: "Company Inc", address: "Highway 37" };
    //dbo.collection("customers").insertOne(myobj, function(err, res) {
    //  if (err) throw err;
    //  console.log("1 document inserted");
    // db.close();
    //});
});

// Body Parser Middleware
app.use(bodyParser.json());

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


app.post('/SubscribeEmails', function (req, res) {

    jsonObject = JSON.stringify({
        "subscribeEmail": req.body.subscribeEmail
    });
    // prepare the header
    var postheaders = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
    };
    // the post options
    var optionspost = {
        host: 'eriderapi.apphb.com',
        path: '/api/web',
        method: 'POST',
        headers: postheaders
    }
    console.info('Options prepared:');
    console.info(optionspost);
    console.info('Do the POST call');

    // do the POST call
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