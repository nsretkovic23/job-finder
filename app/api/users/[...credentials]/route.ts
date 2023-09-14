import dbConnect from "@/database/mongo-config";
import UserModel from "@/models/user-model";

export async function GET(request:Request, {params}:{params:any}) {
    const [username, password] = params.credentials;
    try{
        await dbConnect();
    } catch(err) {
        return new Response(JSON.stringify({errorMessage:`Can't connect to database`}), {status:500});
    }

    const user = await UserModel.findOne({username:username, password:password});
    if(user) {
        return new Response(JSON.stringify(user), {status:200});
    }

    return new Response(JSON.stringify({errorMessage:`User not found`}), {status:404});
}   