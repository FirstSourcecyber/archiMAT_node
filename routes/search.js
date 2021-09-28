var express = require('express');
var router = express.Router();
var {category,product,images,shop,subcategory,user,materialtype,service,company,material}= require('../sequelize');
const multer = require('multer');
const { Op } = require("sequelize");


router.get('/all',async function(req, res, next)  {
var vrproduct=await product.findAll({where:{isvirtual:true},include: [{model:user},{model:shop},{model:materialtype},{model: category},{model:subcategory},{model:images,where:{[Op.not]:{}}}],order: [['id', 'DESC']],});
 var allservice=await service.findAll({order: [['id', 'DESC']],include:{model:shop}});
 var allmaterial=await material.findAll({order: [['id', 'DESC']],include:{model:shop}});
 var vrshop=await shop.findAll({where:{ [Op.not]:{virtual_mall:""},},order: [['id', 'DESC']],include:[{model:company}]});
      res.json(
        { data: {
              product:vrproduct,
              service:allservice,
              material:allmaterial,
              shop:vrshop,
        }});

//   });
});


module.exports = router;
