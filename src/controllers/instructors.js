const model = require('../models/instructors')

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
  model.getOne(parseInt(req.params.instructorId))
  .then(function(data){
    if(data) {
      return res.status(200).send({ data })
    }
    else {
      throw { status: 404, message: 'Instructor Not Found' }
    }
  })
  .catch(next)
}

function create(req, res, next){
  if(!req.body.name){
    return next({ status: 400, message:'Bad Request'})
  }

  model.create(req.body.name)
  .then(function(data){
    res.status(201).send({ data })
  })
  .catch(next)
}

function update(req, res, next){
  if(!req.body.name){
    return next({ status: 400, message:'Bad Request'})
  }

  model.update(parseInt(req.params.instructorId), req.body.name)
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

function remove(req, res, next){
  model.remove(parseInt(req.params.instructorId))
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Nested CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllCohorts(req, res, next){
  model.getAllCohorts(parseInt(req.params.instructorId))
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

function addInstructorToCohort(req, res, next){
  model.addInstructorToCohort(parseInt(req.params.instructorId), parseInt(req.params.cohortId))
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

function deleteInstructorFromCohort(req, res, next){
  model.deleteInstructorFromCohort(parseInt(req.params.instructorId), parseInt(req.params.cohortId))
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

function getAllStudents(req, res, next){
  model.getAllStudents(parseInt(req.params.instructorId))
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

function checkIfInstructorExists(req,res,next){
  model.getOne(req.params.instructorId)
  .then(function(data){
    if(!data) next({ status: 404, message: 'Instructor Not Found' })
    next()
  })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getAllCohorts,
  addInstructorToCohort,
  deleteInstructorFromCohort,
  getAllStudents,
  checkIfInstructorExists
}
