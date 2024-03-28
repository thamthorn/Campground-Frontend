const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type: String,
        required:[true,'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    tel:{
        type: String,
        required:[true,'Please enter your telephone number'],
        unique: true,
        match:[
            /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)\d{4}$/,
            'Please add a valid telephone number'
        ]
    },
    role: {
        type:String,
        enum: ['user','vip','admin'],
        default: 'user'
    },
    password: {
        type:String,
        required:[true,'Please add a password']
        ,
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type: Date,
        default:Date.now
    }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User