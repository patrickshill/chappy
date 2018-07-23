const models = require("../models/models");

// Create pet document w/Unique validation
function createUser(req,res) {
    models.Users.create(req.body)
        .then(data=>res.json(data))
        .catch(errs=>res.json(errs));
}

// Read all user documents
function getAllUsers(req,res) {
    models.Users.find({})
        .then(data=>res.json(data))
        .catch(errs=>res.json(errs));
}

// Read one user document
function getUser(req,res) {
    models.Users.findById(req.params.id)
        .then(data=>res.json(data))
        .catch(errs=>res.json(errs));
}

// Update document
function updateUser(req,res) {
    models.Users.findOneAndUpdate({_id:req.params.id},req.body, {runValidators:true, context: 'query'})
        .then(data=>res.json(data))
        .catch(errs=>res.json(errs));
}

// Delete document
function removeUser(req,res) {
    models.Users.findByIdAndRemove({_id:req.params.id})
    .then(data=>res.json(data))
    .catch(errs=>res.json(errs));
}

module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUser: getUser,
    updateUser: updateUser,
    removeUser: removeUser
}