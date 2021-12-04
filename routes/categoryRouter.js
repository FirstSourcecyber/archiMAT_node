var express = require('express');
var router = express.Router();
var {category,product,images,shop,subcategory,user,materialtype}= require('../sequelize');
const multer = require('multer');
const { Op } = require("sequelize");
router.get('/all', function(req, res, next) {

  category.findAll({
     
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


///mobile api
router.get('/allprodbyallcat', function(req, res, next) {

  category.findAll({
      order: [
          ['id', 'DESC']
      ],
  }).then(async arks => {
  var product1=await  product.findAll({where:{[Op.not]:{shopId:null}},
      order: [
          ['id', 'DESC']
      ],
  include:[{model: category},{model: subcategory},{model: materialtype},{model:images},{model:user},{model:shop}]
 
  });
      res.json(
          {arks:arks,
            product:product1,
        length: arks.length});

  });
});

///mobile api

router.get('/allprodbycat/:id', function(req, res, next) {

  subcategory.findAll({
    where:{
     categoryId: req.params.id,
    },
 
     order: [
         ['id', 'DESC']
     ],
   }).then(async arks => {
     var product1=await  product.findAll({
       where:{categoryId:req.params.id,},
         order: [
             ['id', 'DESC']
         ],
     include:[{model: category},{model: subcategory},{model: materialtype},{model:images,where:{[Op.not]:{image:null}}},{model:user},{model:shop}]
    
     });
         res.json(
             {arks:arks,
               product:product1,
           length: arks.length});
   
     });
});

router.post('/update/:id', function(req, res, next) {
  const data = req.body;
  console.log(req.params.id,)
  category.update({
      name: data.name,
      image: data.images
  }, { where: { id: req.params.id } }).then(resp => {
      res.json({ resp, message: 'updated' });
  });
});

router.post('/create', function(req, res, next) {
  const data = req.body;
  category.create({
      name: data.name,
      image: data.images
  }).then(resp => {
      res.json({ message: "new category added" });

  });
});


router.get('/delete/:id', function(req, res, next) {
    category.destroy({ where: { id: req.params.id } }).then(resp => {
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