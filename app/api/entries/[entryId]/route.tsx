import { Entry } from "@/lib/models";
import { connectToDb } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (request: NextRequest, {params} : {params: Promise<{entryId: string}>}) => {

    const {entryId} = await params;
    try {
        connectToDb();
        const entry = await Entry.findById(entryId)
        .populate("positions").populate("comments");
        return NextResponse.json(entry);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("Failed to fetch entries!")
    }
}