import dbConnect from "@/database/mongo-config";
import { Tag } from "@/libs/interfaces";
import TagModel from "@/models/tag-model";

// Get user by id
export async function GET(request:Request, { params }:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        const tag = await TagModel.findById(id) as Tag | null;

        if(tag) {
            return new Response(JSON.stringify(tag), {status:201});
        } 

        return new Response(JSON.stringify({errorMessage:`Tag with id: ${id} not found`}), {status:404});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}

// Update user by id
export async function PATCH(request:Request, {params}:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        let tagBody = await request.json() as Tag;
        const updatedTag = await TagModel.findByIdAndUpdate(id, tagBody, {new:true});

        return new Response(JSON.stringify(updatedTag), {status:200});
    } catch(err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}

export async function DELETE(request:Request, {params}:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        await TagModel.findByIdAndDelete(id);

        return new Response(JSON.stringify({message:`Deleted tag with id: ${id}`}), {status:200});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}