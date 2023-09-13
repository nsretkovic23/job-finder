import dbConnect from "@/database/mongo-config";
import { User } from "@/libs/interfaces";
import UserModel from "@/models/user-model";

// Get user by id
export async function GET(request:Request, { params }:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        const user = await UserModel.findById(id);

        if(user) {
            return new Response(JSON.stringify(user), {status:201});
        } 

        return new Response(JSON.stringify({errorMessage:`User with id: ${id} not found`}), {status:404});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}

// Update user by id
export async function PATCH(request:Request, {params}:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        let userBody = await request.json() as User;
        await UserModel.findByIdAndUpdate(id, userBody);

        return new Response(JSON.stringify({message:`Updated user with id: ${id}`}), {status:200});
    } catch(err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}

export async function DELETE(request:Request, {params}:{params:any}) {
    try{
        const {id} = params;
        await dbConnect();
        await UserModel.findByIdAndDelete(id);

        return new Response(JSON.stringify({message:`Deleted user with id: ${id}`}), {status:200});
    } catch (err) {
        return new Response(JSON.stringify({errorMessage:err}), {status:500});
    }
}