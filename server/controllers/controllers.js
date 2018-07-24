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

// Add friend/dm_channel/channel to User
function addAnything(req,res){
    if ('friend' in req.body){
        models.Users.findByIdAndUpdate({_id: req.params.id}, {$push: {friendsList: req.params.Fid}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
    if ('dm_channel' in req.body){
        models.Users.findByIdAndUpdate({_id: req.params.id}, {$push: {dm_channels: req.params.Fid}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
    if ('channel' in req.body){
        models.Users.findByIdAndUpdate({_id: req.params.id}, {$push: {channels: req.params.Fid}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
}

// Remove friend/dm_channel/channel to User
function removeAnything(req,res){
    if ('F_id' in req.body){
        models.Users.findByIdAndUpdate({_id: req.params.id}, {$pull: {friendsList: {_id: req.params.F_id}}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
    if ('DM_id' in req.body){
        models.Users.findByIdAndUpdate({_id: req.params.id}, {$pull: {dm_channels: {_id: req.params.DM_id}}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
    if ('C_id' in req.body){
        models.Users.findByIdAndUpdate({_id: req.params.id}, {$pull: {channels: {_id: req.params.C_id}}})
            .then(data=>res.json(data))
            .catch(errs=>res.json(errs))
    }
}

// Delete document
function removeUser(req,res) {
    models.Users.findByIdAndRemove({_id:req.params.id})
    .then(data=>res.json(data))
    .catch(errs=>res.json(errs));
}

// Create Channel with default user and general chat names.
function createChannel(req,res) {

    models.Users.findById(req.params.id)
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
        new_channel.users.push(data);
        new_channel.textChannels.push(text_default);
        new_channel.voiceChannels.push(voice_default);
        new_channel.save();
        res.json(new_channel);
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
        models.Channels.findByIdAndUpdate(req.params.id, {$push: {users: req.body }})
        .then(data => res.json(data))
        .catch(errs => res.json(errs));
    }
    if ('textChannel' in req.body){
        models.Channels.findByIdAndUpdate(req.params.id, {$push: {textChannels: req.body }})
        .then(data => res.json(data))
        .catch(errs => res.json(errs));
    }
    if ('voiceChannel' in req.body){
        models.Channels.findByIdAndUpdate(req.params.id, {$push: {voiceChannels: req.body }})
        .then(data => res.json(data))
        .catch(errs => res.json(errs));
    }
    if ('channelName' in req.body){
        models.Channels.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(errs => res.json(errs));
    }
    else {
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
                models.TextChannels.findByIdAndUpdate({_id: req.params.id})
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
    if ('M_id' in req.body){
        models.TextChannels.findByIdAndUpdate({_id: req.params.id}, {$pull: {messages: {_id: req.body.M_id}}})
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