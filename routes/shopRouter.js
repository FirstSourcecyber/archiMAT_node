var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var {shop,stype,service,user,company,shoptime,category,subcategory,materialtype,material, slider,product,role,fallow,images}= require('../sequelize');
const multer = require('multer');


// ADMIN SIDE API---------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// login api
router.post('/login', function(req, res, next) {
  console.log(req.body);
  var pass_word= req.body.password;
  

  user.findOne({where:{email:req.body.email}}).then(login_data=>{
     

     if(login_data !== null ){
      var hashedPassword = login_data.dataValues.password;
      var password_match = passwordHash.verify(pass_word, hashedPassword);
      if(password_match == true){

        
        // //token generate
        // var token = jwt.sign({check: true}, 'login_auth', {
        //       expiresIn: '365d'
        //     });

         res.json({
              message: 'success',
              // token: token,
              user: login_data
         })
            
      }else{
        res.json({
          message: 'failure'
        })
      }
     }
     else {
        res.json({message: 'admin not found'});
      }

  });
  
});




// get length;
router.get('/getlength', function(req, res, next) {

    shop.findAll({
        order: [
            ['id', 'DESC']
        ],
        where:{
            status:true
        },
        include:[{model: stype},{model:company,}]
        // limit: 5,
    }).then(arks => {
        res.json(
            {arks,
             length: arks.length});
    });
  });

router.get('/all/:id', function(req, res, next) {
  console.log(req.params.id);
  shop.findAll({
      where:{companyId:req.params.id,status: true},
      include: [{model:user},{model:stype},{model:company},{model: shoptime},{model: slider}],
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


router.post('/shopdetail', function(req, res, next) {
  console.log(req.body);
    shop.findOne({
        where:{id:req.body.shop},
        include: [{model:user},{model:stype},{model:company},{model:shoptime}],
        order: [
            ['id', 'DESC']
        ],
        // limit: 5,
    }).then(async arks => {
      
      product.findAll({where:{shopId:req.body.shop},include: [{model:user},{model:shop},{model:materialtype},{model: category},{model:subcategory},{model:images}],order: [['id', 'DESC']],
        // limit: 5,
    }).then(async product=>{
      // var fallow2=await fallow.findAll({where:{shopId:req.body.shop}});
      var shopservice=await service.findAll({where:{shopId:req.body.shop},order: [['id', 'DESC']]});
      var shopmaterial=await material.findAll({where:{shopId:req.body.shop},order: [['id', 'DESC']]});
      var fallow1=await fallow.findOne({where:{shopId:req.body.shop,userId:req.body.user}});
      var data=await slider.findAll({
        where:{shopId:req.body.shop},
        order: [
            ['id', 'DESC']
        ],
        // limit: 5,
    });
  // console.log(product);
          res.json(
              {
                shop:arks,
                product:product,
                material:shopmaterial,
                service:shopservice,
                // fallow:fallow2.length,
                youfallow:fallow1!=null?true:false,
                slider:data
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
      lat: data.lat,
      lng: data.lng,
      website: data.website,
      address: data.address,
      virtual_mall: data.vmall_link,
      virtual_showroom: data.vshowroom_link,
      shopTypeId: data.type,
    //   userId: data.userId,
      image: data.images,
      fb: data.fb,
      twitter: data.twitter,
      companyId: data.compId,
      status: true,
  }, { where: { id: req.params.id } }).then(async resp => {
    for(var i = 0; i< data.hour_timing.length; i++){

        await shoptime.update({
                day: data.hour_timing[i]['day'],
                opentime: data.hour_timing[i]['open'],
                closetime: data.hour_timing[i]['close'],
                shopId: resp.id
            },{where:{id: data.hour_timing[i]['id']}}).then(data =>{
                console.log('shop timing updates');
            })
        }
        // res.json({ message: "new shop added" });
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
      lat: data.lat,
      lng: data.lng,
      website: data.website,
      address: data.address,
      virtual_mall: data.vmall_link,
      virtual_showroom: data.vshowroom_link,
      shopTypeId: data.type,
    //   userId: data.userId,
      image: data.images,
      fb: data.fb,
      twitter: data.twitter,
      companyId: data.compId,
      status: true,
  }).then( async resp=> {
      for(var i = 0; i< data.hour_timing.length; i++){

      await shoptime.create({
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
  shop.update(
      { status: false},
      { where: { id: req.params.id } }).then(resp => {
          product.update(
              {status: false},
            {where:{ shopId :req.params.id}}).then(data1 =>{

              res.json("# " + req.params.id + " deleted");
          })
  });
});

// shop sliders

// sliders api

router.get('/getshopsliders/:id', function(req, res, next) {
    console.log(req.params.id)
    slider.findAll({
        where:{ shopId: req.params.id,},
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

  router.post('/createshopslider', function(req, res, next) {
    const data = req.body;
    console.log(data);
    slider.create({
        title: data.name,
        image:data.images,
        type: 'shop',
        shopId: data.shopId,
      //   image: data.images
    }).then(resp => {
        res.json({ message: "created" });
    });
  });

  router.post('/updateshopslider/:id', function(req, res, next) {
    const data = req.body;
    console.log(data);
    console.log(req.params.id,)
    slider.update({
      title: data.name,
      image: data.images,
    }, { where: { id: req.params.id } }).then(resp => {
        res.json({ message: "updated" });
  
    });
  });
  router.get('/deleteshopslider/:id', function(req, res, next) {
    slider.destroy({ where: { id: req.params.id }  }).then(resp => {
        res.json("# " + req.params.id + " deleted");
    });
  });

  // shop users api

router.get('/all/allshopusers/:id', function(req, res, next) {
    user.findAll({
        where:[{shopId: req.params.id}],
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

  router.post('/all/createuser', function(req, res, next) {
      console.log(req.body);
    var pass_word = passwordHash.generate(req.body.pass);
    console.log(pass_word);
  
   
    user.findOne({where:{email:req.body.email}}).then(check_data=> {
      if (check_data == null){
        user.findOne({where:{username:req.body.username}}).then(check_data1 => {
            if(check_data1 == null){
                user.create({
                    firstname:req.body.fname,
                    lastname:req.body.lname,
                    password:pass_word,
                    email: req.body.email,
                    roleId : req.body.roleId,
                    shopId : req.body.shopId,
                    phoneNo : req.body.phone,
                    image:req.body.images,    
                    username: req.body.username,
                    gender: req.body.gender,
                    dateofbirth: req.body.dob, 
                    mob_token:null,     
                    status:1,     
                  }).then(resp=>{
                    // var token = jwt.sign({check: true}, 'login_auth', {
                    //   expiresIn: '2d'
                    // });
                  res.json({
                    message:'success',
                    // token:token,
                    user:resp
                  })
                  });
            }else{
                res.json({
                    message:'Username already exist'
                  })
            }
        });
       
      }
      else{
        res.json({
          message:'User email already exist'
        })
  
      }
    })
    
  });

  router.post('/all/updateuser/:id', function(req, res, next) {
      console.log(req.body);
    if(req.body.pass !== ''){
      
          
        var pass_word = passwordHash.generate(req.body.pass);
        user.update({
            firstname: req.body.fname,
            lastname: req.body.lname,
            password: pass_word,
            email: req.body.email,
            shopId : req.body.shopId,
            phoneNo : req.body.phone,
            roleId : req.body.roleId,
            image: req.body.images,
            username: req.body.username,
            gender: req.body.gender,
            dateofbirth: req.body.dob,
        }, { where: { id: req.body.id } }).then(resp => {
           
      
          user.findOne({
                where: { id:req.body.id }
            }).then(respp => {
                res.json({
                    data: respp,
                    message: 'updated'
                })
            });
      
        });
      }else{
       user.update({
        firstname: req.body.fname,
        lastname: req.body.lname,
        email: req.body.email,
        phoneNo: req.body.phone,
        shopId : req.body.shopId,
        roleId : req.body.roleId,
        image: req.body.images,
        username: req.body.username,
        gender: req.body.gender,
        dateofbirth: req.body.dob,
     }, { where: { id: req.body.id } }).then(resp => {
       
       user.findOne({
             where: { id:req.body.id }
         }).then(respp => {
             res.json({
                 data: respp,
                 message: 'updated'
             })
         });
     
     });
      }
  });
  router.get('/all/deleteuser/:id', function(req, res, next) {
    user.destroy({ where: { id: req.params.id }  }).then(resp => {
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
