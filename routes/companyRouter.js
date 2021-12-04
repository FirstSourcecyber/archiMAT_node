var express = require('express');
var router = express.Router();
var {company,user,comp_type,shop,product}= require('../sequelize');
const multer = require('multer');

router.get('/all', function(req, res, next) {

  company.findAll({
      where:{status: true},
      include: [comp_type],
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
  company.update({
    title: data.name,
    email: data.email,
    phone: data.phone,
    desc: data.desc,
    link: data.link,
    experience_years: data.expyears,
    compTypeId: data.type,
    // userId: 2,
    image: data.images,
    status: true
  }, { where: { id: req.params.id } }).then(resp => {
      res.json({ resp, message: 'updated' });
  });
});

router.post('/create', function(req, res, next) {
  const data = req.body;
  console.log(data);
  company.create({
      title: data.name,
      email: data.email,
      phone: data.phone,
      desc: data.desc,
      link: data.link,
      experience_years: data.expyears,
      compTypeId: data.type,
    //   userId: 2,
      image: data.images,
      status: true
  }).then(resp => {
      res.json({ message: "new company added" });
  });
});


router.get('/delete/:id', function(req, res, next) {
  company.update(
      {status:false},
      { where: { id: req.params.id } }).then(resp => {
        shop.findAll(
            {status:true},
            { where:{companyId: req.params.id}
        }).then(resp1 =>{
            console.log('response23')
            console.log(resp1[0].id);
            var shopid = resp1[0].id;
            shop.update({status:false},{where:{companyId: req.params.id}}).then(data2 =>{
                product.update({status:false},{where:{shopId: shopid}}).then(data4 =>{
                    res.json("# " + req.params.id + " deleted");

                })
            })
        })
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
