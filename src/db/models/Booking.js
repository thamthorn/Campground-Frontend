import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
    apptDate: {
        type : Date,
        required : true
    },
    user: {
        type:mongoose.Schema.ObjectId,
        
        ref: 'User',
        required : true
    },
    campground: {
        type:mongoose.Schema.ObjectId,
        
        ref : 'Campground',
        required : true
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
});

const Booking = mongoose.models.Campground || mongoose.model("Booking",BookingSchema)
export default Booking