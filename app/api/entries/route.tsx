import { Entry } from "@/lib/models";
import { connectToDb } from "@/lib/utils"
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const GET = async (request: NextApiRequest) => {
//     try {
//         connectToDb();
//         const entries = await Entry.find();
//         return NextResponse.json(entries);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//         throw new Error("Failed to fetch entries!")
//     }
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (request: NextApiRequest) => {
    try {
        connectToDb();
        const entries = await Entry.findById("6797ba57edf90b3dfa6f7af8").populate("positions");
        return NextResponse.json(entries);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("Failed to fetch entries!")
    }
}