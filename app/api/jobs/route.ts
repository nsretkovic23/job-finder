import dbConnect from "@/database/mongo-config";
import { Job, User } from "@/libs/interfaces";
import JobModel from "@/models/job-model";

// Get all jobs
export async function GET(request:Request) {
    try{
        await dbConnect();
        const jobs = await JobModel.find({}) satisfies Job[];
        return new Response(JSON.stringify(jobs), {status:201});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}

// Create a job
export async function POST(request:Request) {
    try {
        let userBody = await request.json() as Job;
        await dbConnect();
        await JobModel.create(userBody);

        return new Response(JSON.stringify({message:"Job created"}), {status:201});
    } catch(err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}