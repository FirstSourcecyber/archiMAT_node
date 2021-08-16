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
        res.json({ message: "Fallow Successfully" });
      })
    }else{
      fallow.destroy({where:{shopId:data.shop,userId:data.user} }).then(resp => {

        res.json({ message: "Unfallow Successfully" });
      })
    }
  })

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
