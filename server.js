var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
var https = require('https');
var cors = require('cors');
// Body Parser Middleware
app.use(bodyParser.json()); 
var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
    // 'http://www.myproductionurl.com'
  ];

  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }
  //here is the magic
  app.use(cors(corsOptions));
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

 app.post('/login', function(req, res){
    var optionsget = {
        host : 'dv6iu1iltl.execute-api.us-east-2.amazonaws.com', // here only the domain name    // (no http/https !)
        
        path : '/Prod/api/S3Bucket/login?userName='+ req.body.username+'&userPassword='+req.body.userpassword, // the rest of the url with parameters if needed
        method : 'GET' // do GET
    };
    console.info('Options prepared:');
    console.info(optionsget);
    console.info('Do the GET call');

    var reqGet = https.request(optionsget, function(response) {
        console.log("statusCode: ", response.statusCode);
        // uncomment it for header details
    //  console.log("headers: ", res.headers);   
    
    response.on('data', function(d) {
            console.info('GET result:\n');
            process.stdout.write(d);
            console.info('\n\nCall completed');
            res.send(d);
        });
    
    });
    
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
 });

 app.post('/getUser', function (req, res){
    var optionsget = {
        host : 'dv6iu1iltl.execute-api.us-east-2.amazonaws.com', // here only the domain name    // (no http/https !)        
        path : '/Prod/api/S3Bucket/user/'+req.body.id, // the rest of the url with parameters if needed
        method : 'GET' // do GET
    };
    console.info('Options prepared:');
    console.info(optionsget);
    console.info('Do the GET call');

    var reqGet = https.request(optionsget, function(response) {
        console.log("statusCode: ", response.statusCode);
        // uncomment it for header details
    //  console.log("headers: ", res.headers);   
    
    response.on('data', function(d) {
            console.info('GET result:\n');
            process.stdout.write(d);
            console.info('\n\nCall completed');
            res.send(d);
        });
    
    });
    
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
 });

 app.post('/saveimage', function(req,res){
    jsonObject = JSON.stringify({
        "filebase64" : req.body.filebase64,
        "userId" : req.body.userId
    });
    var postheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization'
    };

    // var optionspost = {
    //     host : 'dv6iu1iltl.execute-api.us-east-2.amazonaws.com', // here only the domain name    // (no http/https !)
    //     path : '//Prod/api/S3Bucket',
    //     method : 'POST',
    //     headers : postheaders
    // };
    var optionspost = {
        host : 'localhost:58788/', // here only the domain name    // (no http/https !)
        path : '/api/S3Bucket',
        method : 'POST',
        headers : postheaders
    };
    console.info('Options prepared:');
    console.info(optionspost);
    console.info('Do the POST call');
     
    // do the POST call
    var reqPost = https.request(optionspost, function(response) {
        console.log("statusCode: ", response.statusCode);
        // uncomment it for header details
      console.log("headers: ", res.headers);
     
    response.on('data', function(d) {
            console.info('POST result:\n');
            process.stdout.write(d);
            console.info('\n\nPOST completed');
            res.send(d);
        });
    });
     
    // write the json data
    reqPost.write(jsonObject);
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });
 })

app.post('/SubscribeEmails', function(req, res){

    jsonObject = JSON.stringify({
        "subscribeEmail" : req.body.subscribeEmail     
    });
    // prepare the header
    var postheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
    };
    // the post options
var optionspost = {
    host : 'eriderapi.apphb.com',
    path : '/api/web',
    method : 'POST',
    headers : postheaders

};
 
console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');
 
// do the POST call
var reqPost = https.request(optionspost, function(response) {
    console.log("statusCode: ", response.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);
 
response.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
        res.send(d);
    });
});
 
// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});
});
var server = app.listen(4000, function () {
    console.log('Server is running..');
});