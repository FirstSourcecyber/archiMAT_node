var express = require('express');
var router = express.Router();
var {category,product,images,shop,subcategory,user,materialtype,service,company,material}= require('../sequelize');
const multer = require('multer');
const { Op } = require("sequelize");


router.get('/all',async function(req, res, next)  {
var vrproduct=await product.findAll({where:{[Op.not]:{shopId:null}},include: [{model:user},{model:shop},{model:materialtype},{model: category},{model:subcategory},{model:images,where:{[Op.not]:{image:null}}}],order: [['id', 'DESC']],});
 var allservice=await service.findAll({where:{[Op.not]:{shopId:null}},order: [['id', 'DESC']],include:{model:shop}});
 var allmaterial=await material.findAll({where:{[Op.not]:{shopId:null}},order: [['id', 'DESC']],include:{model:shop}});
 var vrshop=await shop.findAll({order: [['id', 'DESC']],include:[{model:company}]});
 var data1={
      product:vrproduct,
      service:allservice,
      material:allmaterial,
      shop:vrshop,
}
      res.json(
        { data1 });

//   });
});


module.exports = router;
