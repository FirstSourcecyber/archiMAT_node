var express = require('express');
var router = express.Router();
var {product,user,shop,materialtype,color,category,subcategory}= require('../sequelize');
const multer = require('multer');


router.get('/all/:id', function(req, res, next) {

  product.findAll({
      where:{shopId:req.params.id},
      include: [{model:user},{model:shop},{model:materialtype},{model: color},{model: category},{model:subcategory}],
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
  product.update({
    name: data.name,
    price: data.price,
    stock: data.stock,
    desc: data.desc,
    size: data.size,
    productCode: data.code,
    shopId: data.shopId,
    colorId: data.color_id,
    materialTypeId: data.mat_typeId,
    userId: 1,
    categoryId: data.cat_id,
    subcategoryId: data.subCat_id,
    status: true,
    image: data.images
  }, { where: { id: req.params.id } }).then(resp => {
      res.json({ resp, message: 'updated' });
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
      productCode: data.code,
      shopId: data.shopId,
      colorId: data.color_id,
      materialTypeId: data.mat_typeId,
      userId: 1,
      categoryId: data.cat_id,
      subcategoryId: data.subCat_id,
      status: true,
      image: data.images
  }).then(resp => {
    //   for(var i = 0; i< data.array.length; i++){

    //       sociallink.create({
    //           link: data.array[i]['socialLink'],
    //           productId: resp.id
    //       }).then(data =>{
    //           console.log('social Links adds');
    //       })
    //   }
      res.json({ message: "new product added" });

  });
});


router.get('/delete/:id', function(req, res, next) {
  product.destroy({ where: { id: req.params.id } }).then(resp => {
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
