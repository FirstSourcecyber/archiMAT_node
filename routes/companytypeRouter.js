var express = require('express');
var router = express.Router();
var {comp_type}= require('../sequelize');
const multer = require('multer');
router.get('/all', function(req, res, next) {

    comp_type.findAll({
     
      // include: [{ all: true, nested: true }],
      order: [
          ['id', 'DESC']
      ],
      // limit: 5,
  }).then(arks => {
      res.json(
          {arks,
        length: arks.length});

  });
});


router.post('/update/:id', function(req, res, next) {
  const data = req.body;
  console.log(req.params.id,)
  comp_type.update({
      name: data.name,
      image: data.images
  }, { where: { id: req.params.id } }).then(resp => {
      res.json({ resp, message: 'updated' });
  });
});

router.post('/create', function(req, res, next) {
  const data = req.body;
  comp_type.create({
      name: data.name,
      image: data.images
  }).then(resp => {
      res.json({ message: "new type added" });

  });
});


router.get('/delete/:id', function(req, res, next) {
    comp_type.destroy({ where: { id: req.params.id } }).then(resp => {
      res.json("# " + req.params.id + " deleted");
  });
});

router.post("/uploader", function(req, res) {
    // console.log(req.file.filename)
  upload(req, res, function(err) {
      var images = req.file.filename;
      res.json(images)
          // Everything went fine.
  })
})


module.exports = router;
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function(req, file, cb) {
      cb(null, './uploads')
  },
  filename: function(req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});
var upload = multer({ //multer settings
  storage: storage
}).single('images');