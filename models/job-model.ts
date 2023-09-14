import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:String,
    seniority:String,
    companyInfo: [{
      companyId:mongoose.Schema.Types.ObjectId,
      companyName:String
    }], // Reference to the user who posted the job
    tagName:String, // References to tags
    description: String, // Description of the job
    lookingForDescription:String,
    companyOffersDescription:String,
    location:String,
    candidates: [{
      userId:String,
      username:String,
    }], // Shorter versions of users who applied
  }, {timestamps:true});

const Jobs = mongoose.models.Jobs || mongoose.model('Jobs', jobSchema);
const JobModel = Jobs;
export default JobModel;
