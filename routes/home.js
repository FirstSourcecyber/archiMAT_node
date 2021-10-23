var express = require('express');
var router = express.Router();
var {category,product,images,color,shop,subcategory,user,materialtype,service,slider,material,company}= require('../sequelize');
const multer = require('multer');
const { Op } = require("sequelize");





router.get('/all',async function(req, res, next)  {
var allcategory=await   category.findAll({order: [['id', 'DESC']],});
var vrproduct=await product.findAll({where:{isvirtual:true,[Op.not]:{shopId:null}},include: [{model:user},{model:shop},{model:materialtype},{model: category},{model:subcategory},{model:images}],order: [['id', 'DESC']],});
 var allservice=await service.findAll({where:{[Op.not]:{shopId:null}},order: [['id', 'DESC']],include:{model:shop}});
 var allmaterial=await material.findAll({where:{[Op.not]:{shopId:null}},order: [['id', 'DESC']],include:{model:shop}});
 var slider1=await slider.findAll({ where:{type: 'home',position:1},order: [['id', 'DESC']],});
 var slider2=await slider.findAll({ where:{type: 'home',position:2},order: [['id', 'DESC']],});
 var slider3=await slider.findAll({ where:{type: 'home',position:3},order: [['id', 'DESC']],});
 var vrshop=await shop.findAll({ 
     where:{
        //  [Op.or]:{
             [Op.not]:{virtual_mall:""},
            //  [Op.not]:{virtual_showroom:""}}

            //  [Op.not]:[{virtual_mall:null},{virtual_mall:""}],
            //  [Op.not]:[{virtual_showroom:null},{virtual_showroom:''}]}
            },order: [['id', 'DESC']],
            include:[{model:company}]

          });




// category.findAll({
     
//       // include: [{ all: true, nested: true }],
//       order: [
//           ['id', 'DESC']
//       ],
//       // limit: 5,
//   }).then(arks => {
      res.json(
          {
              allcategory:allcategory,
              vrproduct:vrproduct,
              allservice:allservice,
              allmaterial:allmaterial,
              slider1:slider1,
              slider2:slider2,
              slider3:slider3,
              vrshop:vrshop,
        });

//   });
});


///mobile api
router.get('/allprodbyallcat', function(req, res, next) {

  category.findAll({
      order: [
          ['id', 'DESC']
      ],
  }).then(async arks => {
  var product1=await  product.findAll({
      order: [
          ['id', 'DESC']
      ],
  include:[{model: category},{model: subcategory},{model: color},{model: materialtype},{model:images},{model:user},{model:shop}]
 
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
     include:[{model: category},{model: subcategory},{model: color},{model: materialtype},{model:images},{model:user},{model:shop}]
    
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