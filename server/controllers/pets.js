const Pet = require('../models/pet.js').pet;
const Name = require('../models/pet.js').name;

module.exports = {
  pets: pets,
  pet: pet,
  newPet: newPet,
  editPet: editPet,
  deletePet: deletePet,
  like: like,
}

function pets(req, res) {
  Pet.find({}).sort({type: 1})
    .then(data => res.json({pets: data}))
    .catch(err => res.json({error: err}))
}

function pet(req, res){
  Pet.findOne({_id:req.params.id}, function(err, result){
    if(err){
      console.log('err in finding pet', err)
    }
    console.log('successfully retrieving one pet')
    res.json({pet: result})
  })
}

function newPet(req, res) {
  Pet.find({name: req.body.name})
    .then(data => {
      console.log(data)
      if(data.length){
        console.log('name taken')
        res.json({error: ['name taken']})
      } else {
        Pet.create(req.body)
          .then(data => res.json({pet: data}))
          .catch(err => {
            let error = [];
            for(var key in err.errors){
              error.push(err.errors[key].message)
              console.log('err in creating pet', err.errors[key].message)
            }
            res.json({error: error});
          })
      }
    })
  // Name.create(req.body)
  //   .then(data=> {
  //     console.log('name created')
  //     console.log('name generated')
  //     Pet.create(req.body)
  //       .then(data => res.json({pet: data}))
  //       .catch(err => {
  //         let error = [];
  //         for(var key in err.errors){
  //           error.push(err.errors[key].message)
  //           console.log('err in creating pet', err.errors[key].message)
  //         }
  //         res.json({error: error});
  //       })
  //   })
  //   .catch(err => {
  //     console.log('err!!!!!!', err)
  //     let error = [];
  //     for(var key in err.errors){
  //       error.push(err.errors[key].message)
  //       console.log('err in creating pet name', err.errors[key].message)
  //     }
  //     res.json({error: error});
  //   })
}

function editPet(req, res){
  Pet.find({name: {$ne : req.body.ogName}})
    .then(data => {
      console.log(data)
      let array = [];
      for(let d of data){
        array.push(d.name)
      }
      console.log('#####', array)
      let unique = true;
      for(let i of array){
        if (i == req.body.name) {
          unique = false;
        }
      }
      if(!unique){
        res.json({error:['name taken']})
      }
      if(unique){
        console.log('new name is unique')
        Pet.findByIdAndUpdate(req.params.id, {$set:{name: req.body.name, type: req.body.type, description: req.body.description, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3,}}, {new:true, runValidators: true}, function(err, result){
          if(err){
            let error = [];
            for(var key in err.errors){
              error.push(err.errors[key].message)
              console.log('err in creating pet', err.errors[key].message)
            }
            res.json({error: error});
          } else {
            console.log('successfully updated pet', result)
            res.json({pet: result})
          }
        })
      }
    })
    .catch(err => {
      console.log('error')
    })

      // if (req.body.name in array) {
      //   console.log('new name is unique')
      //   Pet.findByIdAndUpdate(req.params.id, {$set:{name: req.body.name, type: req.body.type, description: req.body.description, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3,}}, {new:true, runValidators: true}, function(err, result){
      //     if(err){
      //       let error = [];
      //       for(var key in err.errors){
      //         error.push(err.errors[key].message)
      //         console.log('err in creating pet', err.errors[key].message)
      //       }
      //       res.json({error: error});
      //     } else {
      //       console.log('successfully updated pet', result)
      //       res.json({pet: result})
      //     }
      //   })
      // } else {
      //   res.json({error:["name is taken"]})
      // }


      // if(data.length){
      //   res.json({error:['name taken']})
      // } else {

        // Pet.find({name: req.body.name})
        //   .then(data => {
        //
        //   })

    //     Pet.findByIdAndUpdate(req.params.id, {$set:{name: req.body.name, type: req.body.type, description: req.body.description, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3,}}, {new:true, runValidators: true}, function(err, result){
    //       if(err){
    //         let error = [];
    //         for(var key in err.errors){
    //           error.push(err.errors[key].message)
    //           console.log('err in creating pet', err.errors[key].message)
    //         }
    //         res.json({error: error});
    //       } else {
    //         console.log('successfully updated pet', result)
    //         res.json({pet: result})
    //       }
    //     })
    //   }
    // })


  // Pet.findByIdAndUpdate(req.params.id, {$set:{name: req.body.name, type: req.body.type, description: req.body.description, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3,}}, {new:true, runValidators: true}, function(err, result){
  //   if(err){
  //     let error = [];
  //     for(var key in err.errors){
  //       error.push(err.errors[key].message)
  //       console.log('err in creating pet', err.errors[key].message)
  //     }
  //     res.json({error: error});
  //   } else {
  //     console.log('successfully updated pet', result)
  //     res.json({pet: result})
  //   }
  // })
}

function like(req, res){
  // to run validation of subdoc, I should update on the subdoc schema first with validation, and then push into author
  Pet.findOneAndUpdate({_id:req.params.id}, {$inc: {likes: 1}}, {new:true})
    .then(data => console.log('liked pet', data))
    .then(data => res.json({pet: data}))
    .catch(err => console.log('error!', err))
}

function deletePet(req, res){
  Pet.findByIdAndRemove(req.params.id, function(err, result){
    if(err){
      console.log('err in deleting pet', err)
      res.json(err)
    }
    console.log('successfully deleted pet', result)
    res.json(result)
  })
}
