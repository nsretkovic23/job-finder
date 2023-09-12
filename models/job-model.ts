import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:String,
    seniority:String,
    companyId: mongoose.Schema.Types.ObjectId, // Reference to the user who posted the job
    tag: mongoose.Schema.Types.ObjectId, // References to tags
    description: String, // Description of the job
    lookingForDescription:String,
    companyOffersDescription:String,
    location:String,
    candidates: [{
      userId:String,
      username:String,
      rating:Number
    }], // Shorter versions of users who applied
  }, {timestamps:true});

const JobModel = mongoose.models.JobModel || mongoose.model('Jobs', jobSchema);
export default JobModel;
