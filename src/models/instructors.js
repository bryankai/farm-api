const db = require('../../db')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAll(){
  return db('instructors')  // select * from instructors
}

function getOne(instructorId){
  return db('instructors').where({ id: instructorId }).first()
}

function create(name){
  return (
    db('instructors')
    .insert({ name })   // By default, receive back how many records of insertion
    .returning('*')     // Special syntax to receive back the informationa bout what I created
    .then(function([data]){   // Deconstructing the array [data] -> data  === data -> data[0]
      return data             // Unwraps the array (takes it out of the square brackets)
    })
  )
}

function update(instructorId, name){
  return (
    db('instructors')
    .update({ name })
    .where({ id: instructorId })   // With update, need to be careful to specifiy ID or else it will update all of the names.
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function remove(instructorId){
  return (
    db('instructors')
    .del()                        // Delete the inctructor
    .where({ id: instructorId })  // Specifiying what to delete
    .returning('*')               // And while deleting, return what we delete
    .then(function([data]){       //
      delete data.id
      return data
    })
  )
}

//////////////////////////////////////////////////////////////////////////////
// Nested CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllCohorts(instructorId){
  return (
    db('instructors')
    .select('instructors.id as instructors_id',
            'instructors.name as instructors_name',
            'cohorts.id as cohorts_id',
            'cohorts.name as cohorts_name')
    .join('instructors_cohorts', 'instructors_cohorts.instructors_id', 'instructors.id')
    .join('cohorts', 'cohorts.id', 'instructors_cohorts.cohorts_id')
    .where('instructors.id', instructorId)
  )
}

function addInstructorToCohort(instructorId, cohortId){
  return (
    db('instructors_cohorts').where({instructors_id: instructorId, cohorts_id: cohortId})
    .then(function([data]){
      if(!data){
        return (
          db('instructors_cohorts')
          .insert({instructors_id: instructorId, cohorts_id: cohortId})
          .returning('*')
          .then(function([data]){
            return data
          })
        )
      }
      else {
        return data
      }
    })
  )
}

function deleteInstructorFromCohort(instructorId, cohortId){
  return (
    db('instructors_cohorts')
    .del()
    .where({ instructors_id: instructorId, cohorts_id: cohortId })
    .returning('*')
    .then(function([data]){
      if(data){
        delete data.id
        return data
      }
      else {
        return { instructors_id: instructorId, cohorts_id: cohortId }
      }
    })
  )
}

function getAllStudents(instructorId){
  return (
    db('instructors')
    .select('instructors.id as instructors_id',
            'instructors.name as instructors_name',
            'cohorts.id as cohorts_id',
            'cohorts.name as cohorts_name',
            'students.id as students_id',
            'students.name as students_name')
    .join('instructors_cohorts', 'instructors_cohorts.instructors_id', 'instructors.id')
    .join('cohorts', 'cohorts.id', 'instructors_cohorts.cohorts_id')
    .join('students', 'students.cohorts_id', 'cohorts.id')
    .where('instructors.id', instructorId)
  )
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
  getAllStudents
}
