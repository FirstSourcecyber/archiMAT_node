
var express = require('express');
var router = express.Router();
var fs = require("fs");
router.post('/image',   function(req, res, next) {
    console.log(req.body);
    console.log(req.body.image);
    var name = req.body.name;
    var img = req.body.image;
    var id = req.body.id;
    var realFile = Buffer.from(img,"base64");
    fs.writeFile('./uploads/' + name, realFile, function(err) {
        if(err)
           console.log(err);
     });
     res.json({
       message: 'success' 
     })
    });