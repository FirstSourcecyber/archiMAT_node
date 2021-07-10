var express = require('express');
var router = express.Router();
var {materialtype}= require('../sequelize');
const multer = require('multer');
router.get('/all', function(req, res, next) {

  materialtype.findAll({
     
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
  materialtype.update({
      type: data.name,
  }, { where: { id: req.params.id } }).then(resp => {
      res.json({ resp, message: 'updated' });
  });
});

router.post('/create', function(req, res, next) {
  const data = req.body;
  materialtype.create({
     type: data.name,
  }).then(resp => {
      res.json({ message: "new material added" });

  });
});


router.get('/delete/:id', function(req, res, next) {
    materialtype.destroy({ where: { id: req.params.id } }).then(resp => {
      res.json("# " + req.params.id + " deleted");
  });
});



module.exports = router;
