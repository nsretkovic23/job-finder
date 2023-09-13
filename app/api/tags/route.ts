import dbConnect from "@/database/mongo-config";
import { Tag } from "@/libs/interfaces";
import TagModel from "@/models/tag-model";

// Get all users
export async function GET(request:Request) {
    try{
        await dbConnect();
        const tags = await TagModel.find({}) satisfies Tag[];
        return new Response(JSON.stringify(tags), {status:201});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}

// Create a user
export async function POST(request:Request) {
    try {
        let tagBody = await request.json() as Tag;
        await dbConnect();
        await TagModel.create(tagBody);

        return new Response(JSON.stringify({message:"Tag created"}), {status:201});
    } catch(err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}