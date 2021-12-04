const express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname);
  },
});

var fs=require('fs');
// var DIR = './uploads/';

// define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({ storage: storage }).array("files");

router.post('/productfiles', function (req, res, next) {
    // res.json('jkjk');
    upload(req, res, function (err) {
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      }
      let filename = req.files;
      res.json(filename);
    });
  });
// localhost:8080/file/
// router.post("/", function (req, res, next) {
//   console.log(req.body);
//   var path = "";
//   upload(req, res, async function (err) {
//     if (err) {
//       // An error occurred when uploading
//       console.log(err);
//       return res.status(422).json({
//         success: false,
//         msg: "an Error occured",
//         err,
//       });
//     }
//     // No error occured.
//     path = req.file.path;
//     var reference = req.file.filename;
//     // console.log(reference);
//     if (reference) {
//       return res.json({
//         success:true,
//         msg: 'pic uploaded',
//         docs: reference
//       });
//     }
//     return res.status(404).json({
//       success: false,
//       msg: "Error",
//     });
//   });
// });



router.post('/image',   function(req, res, next) {
  // console.log(req.body);
  // console.log(req.body.image);
  var name = req.body.name;
  var img = req.body.image;
  // var id = req.body.id;
  var realFile = Buffer.from(img,"base64");
  fs.writeFile('./uploads/' + name, realFile, function(err) {
      if(err)
         console.log(err);
   });

   res.json({
     message: 'success' 
   })
 
  });


module.exports = router;
