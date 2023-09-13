import dbConnect from "@/database/mongo-config";
import { Job, Tag } from "@/libs/interfaces";
import JobModel from "@/models/job-model";
import TagModel from "@/models/tag-model";
import mongoose from "mongoose";

// Get all jobs by tag id
export async function GET(request:Request, { params }:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        const tag = await TagModel.findById(id) as Tag;
        const jobIds = tag.jobs;
        const jobIdsObjectIdArray = jobIds.map(jobId => new mongoose.Types.ObjectId(jobId))

        const jobs = await JobModel.find({_id: {$in:jobIdsObjectIdArray}}) as Job[];
        
        // Returns [] if there are no jobs
        return new Response(JSON.stringify(jobs), {status:201});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}