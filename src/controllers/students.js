const model = require('../models/students')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAll(req, res, next){
  model.getAll()
  .then(function(data){
    res.status(200).send({data})
  })
  .catch(next) //error handling
}

function getOne(req, res, next){
  model.getOne(parseInt(req.params.studentId))
  .then(function(data){
    if(data) {
      return res.status(200).send({ data })
    }
    else {
      throw { status: 404, message: 'Student Not Found' }
    }
  })
  .catch(next)
}

function create(req, res, next){
  if(!req.body.name){
    return next({ status: 400, message:'Bad Request'})
  }
  model.create(req.body.cohorts_id, req.body.name)
  .then(function(data){
    res.status(201).send({ data })
  })
  .catch(next)
}

function update(req, res, next){
  if(!req.body.name){
    return next({ status: 400, message:'Bad Request'})
  }

  model.update(parseInt(req.params.studentId), req.body.name)
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

function remove(req, res, next){
  model.remove(parseInt(req.params.studentId))
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Nested CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllInstructors(req, res, next){
  model.getAllInstructors(parseInt(req.params.studentId))
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

function checkIfStudentExists(req, res, next){
  model.getOne(parseInt(req.params.studentId))
  .then(function(data){
    if(!data) next({ status: 404, message: 'Student Not Found' })
    next()
  })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getAllInstructors,
  checkIfStudentExists
}
