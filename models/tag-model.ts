import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: String, // The name of the tag
    jobs: [mongoose.Schema.Types.ObjectId], // References to jobs with this tag
});

const TagModel = mongoose.models.TagModel || mongoose.model('Tags', tagSchema);
export default TagModel;
