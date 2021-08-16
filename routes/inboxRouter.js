var express = require('express');
var router = express.Router();
var {shop,user,inbox}= require('../sequelize');
var adminn = require("firebase-admin");

var serviceAccount = require("../archimat-fa54f-firebase-adminsdk-hxgvz-782bfbd205.json");
adminn.initializeApp({
    credential: adminn.credential.cert(serviceAccount),
  });
  
  // Get a database reference to our blog
  var db = adminn.firestore();




router.post('/checkInbox', function(req, res, next) {
  const data = req.body;
  inbox.findOne({where:{shopId:data.shop,userId:data.user}}).then(check=>{
    if(check==null){
      
      inbox.create({
        shopId:data.shop,
        message:data.message,
        userId:data.user
      }).then(resp=>{
        res.json({ message: "success" });
      })
    }else{
   
        inbox.update({
        
            message:data.message
           
          },{where:{ shopId:data.shop,userId:data.user}}).then(resp=>{
            res.json({ message: "success" });
          })
        res.json({ message: "success" });
     
    }
  })

});

router.get('/user/:id', function(req, res, next) {
  // const data = req.body;
  console.log(req.params.id,)
  inbox.findAll( { where: { userId: req.params.id },include:[{model:user},{model:shop}] }).then(resp => {
      res.json({inbox: resp, message: 'success' });
  });
});

router.get('/shop/:id', function(req, res, next) {

  console.log(req.params.id,)
  inbox.findAll( { where: { shopId: req.params.id },include:[{model:user},{model:shop}] }).then(resp => {
      res.json({inbox: resp, message: 'success' });
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




module.exports = router;
