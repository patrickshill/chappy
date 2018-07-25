const bp = require("body-parser");
const api = require("../controllers/controllers");

function router(app) {
    app.use(bp.json());
    
    app.get("/",function(req,res) {

    });

    // Register user
    app.post("/api/users",api.createUser);

    //Login user
    app.post("/api/users/login",api.loginUser);

    // Get users
    app.get("/api/users",api.getAllUsers);

    // Get user by id
    app.get("/api/users/:id",api.getUser);

    // Update user
    app.post("/api/users/:id",api.updateUser);

    // Add friend/dm_channel/channel group
    app.post("/api/users/addTo", api.addAnything)

    // Remove friend/dm_channel/channel group
    app.post("/api/users/removeFrom", api.removeAnything)

    // Remove user
    app.delete("/api/users/:id",api.removeUser);


    //###### Channel Group Routes ######


    // Create Channel Group
    app.post("/api/channels/new", api.createChannel);

    // Get Channel Groups
    app.get("/api/channels", api.getChannelGroups);

    // Get One Channel Group
    app.get("/api/channels/:id", api.getOneChannel);

    // Get Update Channel Group (add users/subchannels)
    app.patch("/api/channels/update/:id", api.updateChannel);

    // Get Remove users/subchannels
    app.patch("/api/channels/remove/:id", api.removeFromChannels);

    // Delete Channel Group
    app.delete("/api/channels/delete/:id", api.deleteChannel);


    //###### Text Sub Channel Routes ######


    // Create new text channel
    app.post("/api/textchannels/new",api.createTextChannel);

    // Get all text channels
    app.get("/api/textchannels", api.getTextChannels);

    // Get One Text Channel
    app.get("/api/textchannels/:id", api.getOneText);

    // Update Text Channel (add or delete message, or update name or port)
    app.post("/api/textchannels/update/:id", api.updateTextChannel);


    //###### Voice Sub Channel Routes ######


    // Create new voice channel
    // app.post("/api/voicechannels/new",api.createVoiceChannel);

    // Get all voice channels
    // app.get("/api/voicechannels", api.getVoiceChannels);

    // Get One voice Channel
    // app.get("/api/voicechannels/:id", api.getOneVoice);

    // Update voice Channel (add or delete message, or update name or port)
    // app.patch("/api/voicechannels/update/:id", api.updateVoiceChannel);

}

module.exports = router;