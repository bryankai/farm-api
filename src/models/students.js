const db = require('../../db')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAll(){
  return db('students')  // select * from instructors
}

function getOne(studentId){
  return db('students').where({ id: studentId }).first()
}

function create(cohorts_id, name){
  return (
    db('students')
    .insert({ cohorts_id, name })   // By default, receive back how many records of insertion
    .returning('*')     // Special syntax to receive back the informationa bout what I created
    .then(function([data]){   // Deconstructing the array [data] -> data  === data -> data[0]
      return data             // Unwraps the array (takes it out of the square brackets)
    })
  )
}

function update(studentId, name){
  return (
    db('students')
    .update({ name })
    .where({ id: studentId })   // With update, need to be careful to specifiy ID or else it will update all of the names.
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function remove(studentId){
  return (
    db('students')
    .del()
    .where({ id: studentId })
    .returning('*')
    .then(function([data]){
      delete data.id
      return data
    })
  )
}

//////////////////////////////////////////////////////////////////////////////
// Nested CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllInstructors(studentId){
  return (
    db('students')
    .select('instructors.id as instructors_id',
            'instructors.name as instructors_name',
            'cohorts.id as cohorts_id',
            'cohorts.name as cohorts_name')
    .join('cohorts', 'cohorts.id', 'students.cohorts_id')
    .join('instructors_cohorts', 'instructors_cohorts.cohorts_id', 'cohorts.id')
    .join('instructors', 'instructors.id', 'instructors_cohorts.instructors_id')
    .where('students.id', studentId)
  )
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getAllInstructors
}
