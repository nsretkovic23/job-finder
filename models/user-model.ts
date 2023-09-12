import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String,
    description:String,
    isCompany: Boolean,
    rating: Number,
    // For company
    postedJobs: [mongoose.Schema.Types.ObjectId],
    // For user
    jobsApplied: [mongoose.Schema.Types.ObjectId],
  }, {timestamps:true});

  const User = mongoose.models.User || mongoose.model('User', userSchema);
  const UserModel = User;
  export default UserModel;