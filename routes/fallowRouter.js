var express = require('express');
var router = express.Router();
var {shop,user,fallow}= require('../sequelize');





router.post('/', function(req, res, next) {
  const data = req.body;
  fallow.findOne({where:{shopId:data.shop,userId:data.user}}).then(check=>{
    if(check==null){
      fallow.create({
        shopId:data.shop,
        userId:data.user
      }).then(resp=>{
        res.json({ message: "Follow Shop Successfully" });
      })
    }else{
      fallow.destroy({where:{shopId:data.shop,userId:data.user} }).then(resp => {

        res.json({ message: "Unfollow Successfully" });
      })
    }
  })

});

router.post('/followbyscan', function(req, res, next) {
  const data = req.body;
  shop.findOne({where:{id:data.shop}}).then(shoptest=>{
if(shoptest==null){
  res.json({ message: "Wrong QR Code" });
}else{

  fallow.findOne({where:{shopId:data.shop,userId:data.user}}).then(check=>{
    if(check==null){
      fallow.create({
        shopId:data.shop,
        userId:data.user
      }).then(resp=>{
        res.json({ message: "Follow Shop Successfully" });
      })
    }else{
     

        res.json({ message: "Already Follow This Shop" });
     
    }
  })
}
  })

});





module.exports = router;
