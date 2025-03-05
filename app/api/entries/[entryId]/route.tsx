import { Entry } from "@/lib/models";
import { connectToDb } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (request: NextRequest, {params} : {params: {entryId: string}}) => {

    const {entryId} = params;
    console.log(entryId, " entry Id in route")
    try {
        connectToDb();
        const entry = await Entry.findById(entryId)
        .populate("positions");
        return NextResponse.json(entry);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("Failed to fetch entries!")
    }
}