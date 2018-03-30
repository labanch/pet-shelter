const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const parser = require('body-parser');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
var router = express.Router();
const session = require('express-session');

app.use(express.static(__dirname + '/pet-shelter/dist'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/api', router);

mongoose.connect('mongodb://localhost/pet-shelter');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
// ========= Pet Schema =========
const { Schema } = mongoose;
const PetSchema = new mongoose.Schema({
    id: Number,
    name: {
      type: String,
      unique: true,
      minlength: 3,
      validate: {
        validator: function( value ) {
          return value.length;
        },
        message: "Name must be atleast 3 characters"
      }
    },
    type: {
      type: String,
      minlength: 3,
      validate: {
        validator: function( value ) {
          return value.length;
        },
        message: "Type must be atleast 3 characters"
      }
    },
    description: {
      type: String,
      minlength: 3,
      validate: {
        validator: function( value ) {
          return value.length;
        },
        message: "Description must be atleast 3 characters"
      }
    },
    skills: [],
    likes: Number
})

const Pet = mongoose.model('Pet', PetSchema);
PetSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });

// - - - - = = = = Controllers = = = = - - - -
const petController = {
    index: function(req, res){
      Pet.find({}).populate('_user').populate('pet._user').exec(function(err, pets) {
        if (!err) {
          res.json(pets)
        } else {
          console.log(err)
        };
      });
    },

    create: function(req, res){
        // console.log('Request body:', req.body);

        Pet.findOne({ name: req.body.name }).exec()
            .then(pet => {
                // console.log('looking for pet', pet)
                    if(pet) {
                      console.log("Pet already exists!");
                    }
                    else {
                      console.log('created a new pet on db', req.body)
                      Pet.create(req.body)
                        .then(pet => res.json(pet))
                        .catch(console.log);
                    }
            })
            .catch(err => res.json(err));

    },

    show: function(req, res){
        Pet.findById(req.params.id, function(err, pet){
            if(err){
                res.json(err)
            }
            else{
                console.log(pet);
                res.json(pet);
            }
        })
    },

    update: function(req, res){
        console.log("Updating! ", req.body);
        Pet.update({_id: req.body._id}, req.body, function(err, pet){
             if(err){
                res.json(err);
            }
            else{
                res.json(pet);
                }
            }
        );
    },

    delete: function(req, res){
        console.log('id:', req.params.id)
        Pet.remove({_id:req.params.id}, function(err, pets){
            if(err){
                res.json(err)
            }
            else{
                res.json("Deleted 1 pet!")
            }
        })
    }

};

// - - - - = = = = Routes = = = = - - - -
router.route('/pets').post(petController.create).get(petController.index);
router.route('/pets/:id').post(petController.update).get(petController.show);
router.route('/pets/:id').delete(petController.delete);

app.all("**", (request, response) => { response.sendFile(path.resolve("./public/dist/index.html")) });


// - - - - = = = = Server Listener = = = = - - - -
const port = 8000;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));
