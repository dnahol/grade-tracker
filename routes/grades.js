'use strict';

var express = require('express');
var router = express.Router();

var Grade = require('../models/grade');



// /api/cars
router.get('/', (req, res) => {
  Grade.findAll(function(err, grades) {
    if(err) return res.status(400).send(err);
    res.send(grades);
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Grade.findById(id, (err, grade) => {
    if(err || !grade) {
      return res.status(400).send(err || 'Grade not found.');
    }
    res.send(grade);
  });
});

router.delete('/:id', (req, res) => {
  var id = req.params.id;
  Grade.deleteById(id, (err, grade) => {
  //we didn't remove any grades

  res.send('Grade deleted.');
  });
});




// POST /api ars
router.post('/', (req,res) => {
  Grade.create(req.body, err => {
    if(err) return res.status(400).send(err);
    res.send();
  })
});

module.exports = router;
