import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: String, // The name of the tag
    jobs: [mongoose.Schema.Types.ObjectId], // References to jobs with this tag
});

const Tags = mongoose.models.Tags || mongoose.model('Tags', tagSchema);
const TagModel = Tags;
export default TagModel;
