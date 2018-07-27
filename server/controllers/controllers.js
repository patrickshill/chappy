const models = require("../models/models");

// Create user document w/Unique validation && registration
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

// User login validation
function loginUser(req,res) {
    console.log("yo")
    models.Users.findOne({email: req.body.email})
    .then(data=>{
        console.log(data);
        if(data == null) {
            res.json({
                errors: {
                    message: "borked"
                }
            });
        } else {
            //Validate password
            if(data.password != req.body.password) {
                res.json({
                    errors: {
                        message: "invalid password"
                    }
                });
            } else {
                res.json(data);
            }
        }
    })
    .catch(errs=>res.json(errs));
}

// Add friend/dm_channel/channel to User
function addAnything(req,res){
    console.log(req.body)
    if ('F_id' in req.body){
        models.Users.findByIdAndUpdate(req.body.id, {$push: {friendsList: req.body.F_id}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
    if ('M_id' in req.body){
        models.Users.findByIdAndUpdate(req.body.id, {$push: {dm_channels: req.body.M_id}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
}

// Remove friend/dm_channel/channel to User
function removeAnything(req,res){
    if ('F_id' in req.body){
        models.Users.findByIdAndUpdate({_id: req.body.id}, {$pull: {friendsList: {_id: req.body.F_id}}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
    if ('DM_id' in req.body){
        models.Users.findByIdAndUpdate({_id: req.body.id}, {$pull: {dm_channels: {_id: req.body.DM_id}}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
    if ('C_id' in req.body){
        models.Users.findByIdAndUpdate({_id: req.body.id}, {$pull: {channels: {_id: req.body.C_id}}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
}

// Delete document
function removeUser(req,res) {
    models.Users.findByIdAndRemove({_id: req.params.id})
    .then(data=>res.json(data))
    .catch(errs=>res.json(errs));
}

// Create Channel with default user and general chat names.
function createChannel(req,res) {
    models.Users.findById(req.body.U_id)
    .then(data => {
        return data;
    })
    .then(data => {
        var text_default = new models.TextChannels();
            text_default.channelName = 'General';
            text_default.save();

        var voice_default = new models.VoiceChannels();
            voice_default.channelName = 'General Voice Chat';
            voice_default.save();
        var new_channel = new models.Channels();
        new_channel.channelName = req.body.channelName;
        new_channel.users.push(data["_id"]);
        new_channel.textChannels.push(text_default._id);
        new_channel.voiceChannels.push(voice_default._id);
        new_channel.save();
        return new_channel;
    })
    .then(data => {
        models.Users.findByIdAndUpdate(req.body.U_id, {$push: {channels: data["_id"]}})
        .then(data=>res.json(data))
        .catch(errs=>res.json(errs))
    })
    .catch(errs => res.json(errs));
}

// Get Channel Groups
function getChannelGroups(req, res){
    models.Channels.find({})
    .then(data => res.json(data))
    .catch(errs => res.json(errs));
}

// Get One Channel Group
function getOneChannel(req,res) {
    models.Channels.findById(req.params.id)
    .then(data => res.json(data))
    .catch(errs => res.json(errs));
}

// Update Channel Group (add users/subchannels)
function updateChannel(req,res) {
    if ('user' in req.body){
        // models.Channels.findByIdAndUpdate(req.body.id, {$push: {users: req.body._id }})
        // .then(data => res.json(data))
        // .catch(errs => res.json(errs));
        console.log('unfinished add user')
    }
    if ('textChannel' in req.body){
        models.TextChannels.create({channelName: req.body.textChannel})
        .then(text => {
            models.Channels.findByIdAndUpdate(req.body.id, {$push: {textChannels: text._id}})
            .then(data => {
                res.json(data);
            })
            .catch(errs => res.json(errs));
        })
        .catch(errs => res.json(errs));
        return this;
    }
    if ('voiceChannel' in req.body){
        // models.Channels.findByIdAndUpdate(req.body.id, {$push: {voiceChannels: req.body._id }})
        // .then(data => res.json(data))
        // .catch(errs => res.json(errs));
        console.log('unfinished add voice')
    }
    if ('channelName' in req.body){
        // models.Channels.findByIdAndUpdate(req.body.id, req.body)
        // .then(data => res.json(data))
        // .catch(errs => res.json(errs));
        console.log('unfinished change channelname')
    }
    else {
        console.log(req.body)
        console.log("You did not format your input properly.")
    }
}

// Remove users or channels from Channel Group
function removeFromChannels(req,res){
    if ('Uid' in req.body){
        models.Channels.findByIdAndUpdate(req.params.id, {$pull: {users: {_id: req.body.Uid} }})
        .then(data => res.json(data))
        .catch(errs => res.json(errs));
    }
    if ('Tid' in req.body){
        models.Channels.findByIdAndUpdate(req.params.id, {$pull: {textChannels: {_id: req.body.Tid} }})
        .then(data => res.json(data))
        .catch(errs => res.json(errs));
    }
    if ('Vid' in req.body){
        models.Channels.findByIdAndUpdate(req.params.id, {$pull: {voiceChannels: {_id: req.body.Vid} }})
        .then(data => res.json(data))
        .catch(errs => res.json(errs));
    }
    else {
        console.log("You did not format your input properly.")
    }
}

// Delete Channel Group
function deleteChannel(req,res) {
    models.Channels.findByIdAndRemove(req.params.id)
    .then(data=>res.json(data))
    .catch(errs=>res.json(errs));
}

// Create Text Channel
function createTextChannel(req,res) {
    models.TextChannels.create(req.body)
    .then(data => res.json(data))
    .catch(errs => res.json(errs));
}

// Find all Text Channels
function getTextChannels(req,res) {
    models.TextChannels.find({}).sort({channelName: 'ascending'})
    .then(data => res.json(data))
    .catch(errs => res.json(errs));
}

// Get One Channel
function getOneText(req,res) {
    models.TextChannels.findById(req.params.id)
    .then(data => res.json(data))
    .catch(errs => res.json(errs));
}

// Update Text Channel (add or delete message, or update name or port)
function updateTextChannel(req,res) {
    if ('content' in req.body){
        models.TextChannels.findById(req.body.T_id)
        .then(data=>{
            data.messages.push(req.body);
            return data.save();
        })
        .then(data=>res.json(data))
        .catch(errs=>res.json(errs));
    }
    if ('M_id' in req.body){
        models.TextChannels.findByIdAndUpdate({_id: req.body.T_id}, {$pull: {messages: {_id: req.body.M_id}}})
        .then(data => res.json(data))
        .catch(errs => res.json(errs));
    }
    else{
        models.TextChannels.findById({_id: req.body.T_id})
        .then(data => {
            data.channelName = req.body.channelName;
            data.save();
            res.json(data)})
        .catch(errs => res.json(errs));
    }
}

// Create Voice Channel
function createVoiceChannel(req,res) {
    models.VoiceChannels.create(req.body)
    .then(data => res.json(data))
    .catch(errs => res.json(errs));
}

// Find all Voice Channels
function getVoiceChannels(req,res) {
    models.VoiceChannels.find({}).sort({channelName: 'ascending'})
    .then(data => res.json(data))
    .catch(errs => res.json(errs));
}

// Get One Channel
function getOneVoice(req,res) {
    models.VoiceChannels.findById(req.params.id)
    .then(data => res.json(data))
    .catch(errs => res.json(errs));
}

// Update Voice Channel (add or remove user, or update name or port)
function updateVoiceChannel(req,res) {
    if ('content' in req.body){

        models.Users.findById(req.body.U_id)
        .then(user => {
            models.Messages.create(req.body)
            .then(data => {
                data.userName = user.username;
                data.userAvater = user.avatar;
                if (req.body.attachments.length > 1){
                    data.attachments.push(req.body.attachments)
                }
                data.save();
                return data;
            })
            .then(message => {
                models.VoiceChannels.findByIdAndUpdate({_id: req.params.id})
                .then(data => {
                    data.messages.push(message);
                    data.save();
                    res.json(data);
                })
                .catch(errs => res.json(errs));
            })
        })
        .catch(errs=>res.json(errs))
        
    }
    if ('U_id' in req.body){
        models.VoiceChannels.findByIdAndUpdate({_id: req.params.id}, {$pull: {connectedUsers: {_id: req.body.U_id}}})
        .then(data => res.json(data))
        .catch(errs => res.json(errs));
    }
    else{
        models.TextChannels.findById({_id: req.params.id})
        .then(data => {
            data.channelName = req.body.channelName;
            data.save();
            res.json(data)})
        .catch(errs => res.json(errs));
    }
}


module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    getUser: getUser,
    updateUser: updateUser,
    addAnything: addAnything,
    removeAnything: removeAnything,
    removeUser: removeUser,

    createChannel: createChannel,
    getChannelGroups: getChannelGroups,
    getOneChannel: getOneChannel,
    updateChannel: updateChannel,
    removeFromChannels: removeFromChannels,
    deleteChannel: deleteChannel,

    createTextChannel: createTextChannel,
    getTextChannels: getTextChannels,
    getOneText: getOneText,
    updateTextChannel: updateTextChannel,

    createVoiceChannel: createVoiceChannel,
    getVoiceChannels: getVoiceChannels,
    getOneVoice: getOneVoice,
    updateVoiceChannel: updateVoiceChannel,

}