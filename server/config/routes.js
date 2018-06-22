const Handler = require('../controllers/pets.js')

module.exports = function(app){
  app.get('/api/pets', (req, res) => Handler.pets(req, res));
  app.get('/api/pets/:id', (req, res) => Handler.pet(req, res));
  app.post('/api/pets', (req, res) => Handler.newPet(req, res));
  app.put('/api/pets/:id', (req, res) => Handler.editPet(req, res));
  app.put('/api/pets/:id/like', (req, res) => Handler.like(req, res));
  app.delete('/api/pets/:id', (req, res) => Handler.deletePet(req, res));
}
