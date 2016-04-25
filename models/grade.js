'use strict';

var db = require('../config/db');
var uuid = require('uuid');

db.run('CREATE TABLE IF NOT EXISTS grades (id text, assignment text, score integer, total integer, letter text)');

exports.create = function(grade, cb) {
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO grades VALUES (?, ?, ?, ?, ?)");
    var letter = letterGrade(grade.score, grade.total);
    console.log('letter:', letter );

    stmt.run(uuid()	, grade.assignment, grade.score, grade.total, letter);

    stmt.finalize(function(err) {

      cb(err);

    });
  });
};

exports.findAll = function(cb) {
  db.all('SELECT * FROM grades', cb);
};

exports.findById = function(id, callback) {
  if(!id) return callback('id required.');

  this.findAll((err, grades) => {
    if(err) return callback(err);
    var grade = grades.filter(grade => grade.id === id)[0];
    return callback(null, grade);
  });
}


exports.deleteById = function(id, callback) {
  if(!id) return callback('id required.');
  var statement = `DELETE FROM GRADES WHERE ID = ${id}`;
  db.all(statement);
  return;
  // this.findAll((err, grades) => {
  //   var len = grades.length;
  //
  //   if(err) return callback(err);
  //   var grade = grades.filter(grade => grade.id === id)[0];
  //   grades = grades.filter(grade => grade.id !== id)[0];
  //   //Delete grade from sql database
  //
  //   return callback(null, grade);
  // });

}



function letterGrade(score, total) {
  var score = parseInt(score);
  var total = parseInt(total);
  var raw = score/total * 100;

  if(raw >= 90) {
    return 'A';
  } else if(raw >= 80) {
    return 'B';
  } else if(raw >= 70) {
    return 'C';
  } else if(raw >= 60) {
    return 'B';
  } else if(raw < 60) {
    return 'F';
  } else {
    return 'No Grade Yet';
  }
};
