import mongoose from "mongoose";


// Define the schema (database) for the tracker
const trackerSchema = new mongoose.Schema({

    vehicleId: {type:String, default:""},
    timestamp: {type:Date, default:Date.now},
    location: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    createdOn: {type:Date, default:Date.now},
    createdBy: {type:String, default:"Anupam Hore"}
});

// Add the geo-spatial index
trackerSchema.index({ location: '2dsphere' });
trackerSchema.index({  timestamp: 1 });
trackerSchema.index({ vehicleId: 1 });


export default mongoose.model("Tracker", trackerSchema);