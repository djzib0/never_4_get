import { Entry } from "@/lib/models";
import { connectToDb } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (request: NextRequest, {params} : {params: Promise<{userId: string}>}) => {

    const {userId} = await params;

    try {
        connectToDb();
        const entries = await Entry.find({userId: userId}).populate("comments");
        return NextResponse.json(entries);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("Failed to fetch entries!")
    }
}