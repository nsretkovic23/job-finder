import dbConnect from "@/database/mongo-config";
import { Job } from "@/libs/interfaces";
import JobModel from "@/models/job-model";

// Get job by id
export async function GET(request:Request, { params }:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        const job = await JobModel.findById(id);

        if(job) {
            return new Response(JSON.stringify(job), {status:201});
        } 

        return new Response(JSON.stringify({errorMessage:`Job with id: ${id} not found`}), {status:404});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}

// Update job by id
export async function PATCH(request:Request, {params}:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        let jobBody = await request.json() as Job;
        await JobModel.findByIdAndUpdate(id, jobBody);

        return new Response(JSON.stringify({message:`Updated job with id: ${id}`}), {status:200});
    } catch(err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}

// Delete job by id
export async function DELETE(request:Request, {params}:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        await JobModel.findByIdAndDelete(id);

        return new Response(JSON.stringify({message:`Deleted job with id: ${id}`}), {status:200});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}