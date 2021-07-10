var express = require('express');
var router = express.Router();
var {color}= require('../sequelize');
const multer = require('multer');
router.get('/all', function(req, res, next) {

  color.findAll({
     
      // include: [{ all: true, nested: true }],
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
  color.update({
      code: data.name,
  }, { where: { id: req.params.id } }).then(resp => {
      res.json({ resp, message: 'updated' });
  });
});

router.post('/create', function(req, res, next) {
  const data = req.body;
  color.create({
      code: data.name,
  }).then(resp => {
      res.json({ message: "new color added" });

  });
});


router.get('/delete/:id', function(req, res, next) {
    color.destroy({ where: { id: req.params.id } }).then(resp => {
      res.json("# " + req.params.id + " deleted");
  });
});



module.exports = router;
