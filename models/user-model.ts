import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String,
    description:String,
    isCompany: Boolean,
    rating: [Number],
    // For company
    postedJobs: [{
      jobId: mongoose.Schema.Types.ObjectId,
      jobTitle: String
    }],
    // For user
    jobsApplied: [{
      jobId: mongoose.Schema.Types.ObjectId,
      jobTitle: String
    }],
  }, {timestamps:true});

  const User = mongoose.models.User || mongoose.model('User', userSchema);
  const UserModel = User;
  export default UserModel;