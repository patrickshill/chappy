const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
mongoose.connect("mongodb://localhost:27017/chapp",{useNewUrlParser:true},(errs)=>console.log(errs));


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: [3,"Username must be atleast 3 characters long"]
    },
    first_name: {
        type: String,
        required: [true,"First name required"],
        minlength: [3,"First name must be atleast 3 characters long"]
    },
    last_name: {
        type: String,
        required: [true,"Last name required"],
        minlength: [3,"Last name must be atleast 3 characters long"]
    },
    email: {
        type: String,
        required: [true,"Email required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid"]
    },
    password: {
        type: String,
        required: [true,"Password required"],
        minlength: [8,"Passwords must contain atleast 8 charactesr"]
    },
    avatar: {
        type: String,
        default: ""
    },
    status: {
        type: Number,
        default: 0
    },
    channels: [],
    dm_channels: [],
    friendsList: []
}, {timestamps:true});

UserSchema.plugin(uniqueValidator, {message: '{PATH} {VALUE} is already taken'});

const MessageSchema = new mongoose.Schema({
    user: UserSchema,
    content: {
        type: String,
        minlength: 1,
        required: true
    },
    attachments: []
},{timestamps:true});

const TextChannelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        minlength: [3,"Channel name must contain atleast 3 characters"],
        required: true
    },
    port: {
        type: Number,
        required: [true, "Text channel requires a port"]
    },
    messages: [MessageSchema]
},{timestamps:true});

const VoiceChannelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        minlength: [3,"Channel name must contain atleast 3 characters"],
        required: true
    },
    port: {
        type: Number,
        required: [true, "Voice channel requires a port"]
    },
    connectedUesrs: [UserSchema]
},{timestamps:true});

const ChannelSchema = new mongoose.Schema({
    users: [UserSchema],
    textChannels: [TextChannelSchema],
    voiceChannels: [VoiceChannelSchema]
},{timestamps:true});

const Users         = mongoose.model("user",UserSchema);
const Messages      = mongoose.model("message",MessageSchema);
const TextChannels  = mongoose.model("textChannel",TextChannelSchema);
const VoiceChannels = mongoose.model("voiceChannel", VoiceChannelSchema);
const Channels      = mongoose.model("channel",ChannelSchema);

module.exports = {
    Users: Users,
    Messages: Messages,
    TextChannels: TextChannels,
    VoiceChannels: VoiceChannels,
    Channels: Channels
}