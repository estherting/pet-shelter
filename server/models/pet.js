const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pet');

var NameSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Name is required"], minlength: [3, "Name must be at least 3 characters"]}
})

var PetSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Name is required"], minlength: [3, "Name must be at least 3 characters"]},
  type: {type: String, required: [true, "Type is required"], minlength: [3, "Type must be at least 3 characters"]},
  description: {type: String, required: [true, "Description is required"], minlength: [3, "Description must be at least 3 characters"]},
  skill1: {type: String},
  skill2: {type: String},
  skill3: {type: String},
  likes: {type: Number, default: 0},
  ogName: {type: String, default: ""}
}, {timestamps: true})


NameSchema.path('name').validate({
    isAsync:true,
    validator:function(value,respond){
        this.model("Name").count({name:value}, function(err,count){
            respond(!count)
        })
    },
    message:"Please choose a unique pet name!"
})


module.exports = {
  name: mongoose.model("Name", NameSchema),
  pet: mongoose.model("Pet", PetSchema)

}
