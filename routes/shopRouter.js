var express = require('express');
var router = express.Router();
var {shop,stype,product,user,company,shoptime,materialtype,color,category,subcategory}= require('../sequelize');
// var {shop,stype,sociallink,user,company,shoptime}= require('../sequelize');
const multer = require('multer');



// get length;
router.get('/getlength', function(req, res, next) {

    shop.findAll({
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

  shop.findAll({
      where:{companyId:req.params.id},
      include: [{model:user},{model:stype},{model:company}],
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


router.get('/:id', function(req, res, next) {

  shop.findOne({
      where:{id:req.params.id},
      include: [{model:user},{model:stype},{model:company}],
      order: [
          ['id', 'DESC']
      ],
      // limit: 5,
  }).then(arks => {
    product.findAll({
      where:{shopId:req.params.id},
      include: [{model:user},{model:shop},{model:materialtype},{model: color},{model: category},{model:subcategory}],
      order: [
          ['id', 'DESC']
      ],
      // limit: 5,
  }).then(product=>{
console.log(product);
        res.json(
            {
              shop:arks,
              product:product
          });
      })

  });
});


router.post('/update/:id', function(req, res, next) {
  const data = req.body;
  console.log(req.params.id,)
  shop.update({
    name: data.name,
      email: data.email,
      phone: data.phone,
      desc: data.desc,
      city: data.city,
      website: data.website,
      address: data.address,
      virtual_mall: data.vmall_link,
      virtual_showroom: data.vshowroom_link,
      shopTypeId: data.type,
      userId: data.userId,
      image: data.images,
      fb: data.fb,
      twitter: data.twitter,
      companyId: data.compId,
      status: true,
  }, { where: { id: req.params.id } }).then(resp => {
      res.json({ resp, message: 'updated' });
  });
});

router.post('/create', function(req, res, next) {
  const data = req.body;
  console.log(data);
  shop.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      desc: data.desc,
      city: data.city,
      website: data.website,
      address: data.address,
      virtual_mall: data.vmall_link,
      virtual_showroom: data.vshowroom_link,
      shopTypeId: data.type,
      userId: data.userId,
      image: data.images,
      fb: data.fb,
      twitter: data.twitter,
      companyId: data.compId,
      status: true,
  }).then( async resp=> {
      for(var i = 0; i< data.hour_timing.length; i++){

      await  shoptime.create({
              day: data.hour_timing[i]['day'],
              opentime: data.hour_timing[i]['open'],
              closetime: data.hour_timing[i]['close'],
              shopId: resp.id
          }).then(data =>{
              console.log('shop timing added');
          })
      }
      res.json({ message: "new shop added" });

  });
});


router.get('/delete/:id', function(req, res, next) {
  shop.destroy({ where: { id: req.params.id } }).then(resp => {
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
