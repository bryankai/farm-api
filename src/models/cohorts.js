const db = require('../../db')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////
function getAll(){
  return db('cohorts')  // select * from instructors
}

function getOne(cohortId){
  return db('cohorts').where({ id: cohortId }).first()
}

function create(name){
  return (
    db('cohorts')
    .insert({ name })   // By default, receive back how many records of insertion
    .returning('*')     // Special syntax to receive back the informationa bout what I created
    .then(function([data]){   // Deconstructing the array [data] -> data  === data -> data[0]
      return data             // Unwraps the array (takes it out of the square brackets)
    })
  )
}

function update(cohortId, name){
  return (
    db('cohorts')
    .update({ name })
    .where({ id: cohortId })   // With update, need to be careful to specifiy ID or else it will update all of the names.
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function remove(cohortId){
  return (
    db('cohorts')
    .del()
    .where({ id: cohortId })
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

function getAllStudents(cohortId){
  return (
    db('cohorts')
    .join('students', 'students.cohorts_id', 'cohorts.id') // table, relationship
    .where('cohorts.id', cohortId)  // Where they are equal
  )
}

function getAllInstructors(cohortId){
  return (
    db('cohorts')
    .select('instructors.id as instructors_id',
            'instructors.name as instructors_name',
            'cohorts.id as cohorts_id',
            'cohorts.name as cohorts_name')
    .join('instructors_cohorts', 'instructors_cohorts.cohorts_id', 'cohorts.id')
    .join('instructors', 'instructors.id', 'instructors_cohorts.instructors_id')
    .where('cohorts.id', cohortId)
  )
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getAllStudents,
  getAllInstructors
}
