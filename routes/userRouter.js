var express = require('express');
var router = express.Router();
var {user,role}= require('../sequelize');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
const multer = require('multer');
const nodemailer = require("nodemailer");
var generator = require('generate-password');

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

        
        //token generate
        var token = jwt.sign({check: true}, 'login_auth', {
              expiresIn: '365d'
            });

         res.json({
              message: 'success',
              token: token,
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
// /* New Register. */
router.post('/register', function(req, res, next){
  console.log(req.body);
  
  var pass_word = passwordHash.generate(req.body.password);
  console.log(pass_word);

 
  user.findOne({where:{email:req.body.email}}).then(check_data=> {
    if (check_data == null){
      user.create({
        firstname:req.body.fname,
        lastname:req.body.lname,
        password:pass_word,
        email: req.body.email,
        roleId : 1,
        phoneNo:null,     
        image:null,     
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
    }
    else{
      res.json({
        message:'admin already exist'
      })

    }
  })
  
});
// profile image upload
router.post("/uploader", function(req, res) {
  console.log(req.file);
  // console.log(req.file.filename)
upload(req, res, function(err) {
    var images = req.file.filename;
    res.json(images)
        // Everything went fine.
})
});

router.post('/updateprofile', function(req, res, next) {
  console.log(req.body);
 if(req.body.Password !== ''){

   var pass_word = passwordHash.generate(req.body.Password);
   user.update({
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       password: pass_word,
       email: req.body.Email,
       image: req.body.images
   }, { where: { id: req.body.id } }).then(resp => {
      
 
     user.findOne({
           where: { id:req.body.id }
       }).then(respp => {
           res.json({
               data: respp,
               message: 'success'
           })
       });
 
   });
 }else{
  user.update({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.Email,
    image: req.body.images
}, { where: { id: req.body.id } }).then(resp => {
  
  user.findOne({
        where: { id:req.body.id }
    }).then(respp => {
        res.json({
            data: respp,
            message: 'success'
        })
    });

});
 }
});

router.post("/forgot", (req, res, next) => {
  var reqData = req.body;
  console.log(reqData);
  var pa;
  user.findOne({
      where: {
          email: reqData.email
      }
  }).then(isAccountExist => {

      var password = generator.generate({
            length: 4,
            numbers: true,
            symbols: false,
            lowercase:false,
            uppercase:false
      })
      pa = password;
      if (isAccountExist) {
          res.json({
              message: 'Email exists',
              pa,
              isAccountExist: isAccountExist
          });
          var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
              auth: {
                  user: 'imsaadi302@gmail.com',
                  pass: 'mirza.saad786'
              }
          });

          var mailOptions = {
              from: 'imsaadi302@gmail.com"<no-reply>"',
              to: reqData.email,
              subject: 'Do you want to change you password?',
              html: "<h2>Hello,</h2><br><p>It look like you request a new password<br>If that sounds right, Here is your code:<br></p>" + pa,
              // text: 'It look like you request a new password\n' + 'If that sounds right, Here is your code' + pa,

              attachments: []
          };


          transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                  console.log(error);
              } else {
                  console.log('Email sent: ' + info.response);
              }
          });

      } else {
          res.json({message: 'failure'});
      }
  });
});

// /* get profile data. */
router.get('/getprofile/:id', function(req, res, next){
  
    user.findOne({
        where:{id:req.params.id}
    }).then(res5 =>{
        console.log(res5);
        res.json({data:res5})
    })
  });

  // /*change password */
router.post('/changepassword', function(req, res, next){
    var pass_word = passwordHash.generate(req.body.password);
    user.findOne({
        where:{email:req.body.email}
    }).then(res5 =>{
        if(res5!==null){
            user.update({
                password: pass_word
            },{where:{email: req.body.email}}).then(resp =>{
            res.json({data:resp, message: 'success'})
            })
        }else{
            res.json({message: 'failure'})
        }
    })
  });

//   status active
router.get('/useractive/:id', function(req, res, next){
    console.log(req.params.id);
    user.update({
        status: true,   
    },{ where:{id: req.params.id}}).then(resp =>{
        res.json({message: 'success'})
    })
})
//   status block
router.get('/userblock/:id', function(req, res, next){
    console.log(req.params.id);
    user.update({
        status: false,   
    },{ where:{id: req.params.id}}).then(resp =>{
        res.json({message: 'success'})
    })
})


// Mobile side APIS


// get length;
router.get('/getlength', function(req, res, next) {

    user.findAll({
        where:{roleId: 3},
    }).then(arks => {
        res.json(
            {arks,
             length: arks.length});
  
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