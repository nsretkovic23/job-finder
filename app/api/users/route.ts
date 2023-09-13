import dbConnect from "@/database/mongo-config";
import { User } from "@/libs/interfaces";
import UserModel from "@/models/user-model";

// Get all users
export async function GET(request:Request) {
    try{
        await dbConnect();
        const users = await UserModel.find({}) satisfies User[];
        return new Response(JSON.stringify(users), {status:201});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}

// Create a user
export async function POST(request:Request) {
    try {
        let userBody = await request.json() as User;
        await dbConnect();
        await UserModel.create(userBody);

        return new Response(JSON.stringify(userBody), {status:201});
    } catch(err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}