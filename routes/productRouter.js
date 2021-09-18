var express = require('express');
var router = express.Router();
var {product,user,shop,materialtype,category,subcategory,images,slider}= require('../sequelize');
const multer = require('multer');
const { Op } = require("sequelize");

// get length;
router.get('/getlength', function(req, res, next) {
    
    product.findAll({
        order: [
            ['id', 'DESC']
        ],
        
    include:[{model: category},{model: subcategory},{model: materialtype},{model:images},{model:user},{model:shop}]
        // limit: 5,
    }).then(arks => {
        res.json(
            {arks,
             length: arks.length});
  
    });
  });

  // get length;
router.get('/all', function(req, res, next) {

  product.findAll({
      
    include: [{model:user},{model:shop},{model:materialtype},{model: category},{model:subcategory},{model:images}],
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
router.get('/all/:id', function(req, res, next) {

  product.findAll({
      where:{shopId:req.params.id},
      include: [{model:user},{model:shop},{model:materialtype},{model: category},{model:subcategory},{model:images}],
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
  console.log(data);
  console.log(req.params.id,)
  product.update({
    name: data.name,
    price: data.price,
    stock: data.stock,
    desc: data.desc,
    size: data.size,
    currency: data.currency,
    productCode: data.code,
    shopId: data.shopId,
    color: data.color_id,
    materialTypeId: data.mat_typeId,
    userId: 2,
    isvirtual: data.isvirtual,
    categoryId: data.cat_id,
    subcategoryId: data.subCat_id,
    status: true,
    // image: data.images
  }, { where: { id: req.params.id } }).then(async resp => {
var data=await images.destroy({ where: { productId: req.params.id } });
    for(var i = 0; i< req.body.images1.length; i++){
        // if(data.images[i]['id'] == -1){

            images.create({
                image: req.body.images1[i]['image'],
                productId: req.params.id
              }).then(data =>{
                  console.log('added images');
              })
        //     }else{
        //         images.update({          
        //             image: data.images[i]['filename'],
        //             productId: req.params.id
        //           },{where:{id: data.images[i]['id'],}}).then(data =>{
        //               console.log('added images');
        //           })
        // }
      }
      res.json({ message: "updated" });

  });
});

router.post('/create', function(req, res, next) {
  const data = req.body;
  console.log(data);
  product.create({
      name: data.name,
      price: data.price,
      stock: data.stock,
      desc: data.desc,
      size: data.size,
      currency: data.currency,
      productCode: data.code,
      shopId: data.shopId,
      color: data.color_id,
      materialTypeId: data.mat_typeId,
      userId: 2,
      categoryId: data.cat_id,
      subcategoryId: data.subCat_id,
      isvirtual: data.isvirtual,
      status: true,
    //   image: data.images
  }).then(resp => {
      for(var i = 0; i< req.body.images1.length; i++){

        images.create({
            image: req.body.images1[i]['filename'],
            productId: resp['id']
          }).then(data =>{
              console.log('added images');
          })
      }
      res.json({ message: "new product added" });

  });
});


router.get('/delete/:id', function(req, res, next) {
  product.destroy({ where: { id: req.params.id } }).then(resp => {
      res.json("# " + req.params.id + " deleted");
  });
});

// router.get('/Imagedelete/:id', function(req, res, next) {
//     images.destroy({ where: { id: req.params.id } }).then(resp => {
//         res.json({message: "deleted"});
//     });
//   });

router.post("/uploader", function(req, res) {
    // console.log(req.file.filename)
  upload(req, res, function(err) {
      var images = req.file.filename;
      res.json(images)
          // Everything went fine.
  })
});

// sliders api

router.get('/getsliders', function(req, res, next) {

    slider.findAll({
        where:{type: 'home',},
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

  router.post('/createslider', function(req, res, next) {
    const data = req.body;
    console.log(data);
    slider.create({
        title: data.name,
        image:data.images,
        position:data.position,
        type: 'home',
      //   image: data.images
    }).then(resp => {
        res.json({ message: "created" });
    });
  });

  router.post('/updateslider/:id', function(req, res, next) {
    const data = req.body;
    console.log(data);
    console.log(req.params.id,)
    slider.update({
      title: data.name,
      image: data.images,
      position: data.position,
      type: 'home',
    }, { where: { id: req.params.id } }).then(resp => {
        res.json({ message: "updated" });
  
    });
  });
  router.get('/deleteslider/:id', function(req, res, next) {
    slider.destroy({ where: { id: req.params.id } }).then(resp => {
        res.json("# " + req.params.id + " deleted");
    });
  });

// get Mobile home slider 

router.get('/homebanners/:id', function(req, res, next) {

    slider.findAll({
        where:{type: 'home', position: req.params.id},
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
  
  //mobile api
router.get('/getallsliders', function(req, res, next) {
  slider.findAll({
    where:{type: 'home',position:1},
    order: [
      ['id', 'DESC']
    ],
    // limit: 5,
  }).then(async arks => {
    var slider2=await slider.findAll({ where:{type: 'home',position:2},order: [['id', 'DESC']],});
    var slider3=await slider.findAll({ where:{type: 'home',position:3},order: [['id', 'DESC']],});
      res.json(
          {slider1:arks,
            slider2:slider2,
            slider3:slider3,
           });

  });
});


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
