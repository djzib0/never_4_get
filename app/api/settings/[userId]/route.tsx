import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, {params} : {params: Promise<{userId: string}>}) => {

    const {userId} = await params;

    try {
        connectToDb();
        const user = await User.findById(userId).populate("settings")
        return NextResponse.json(user.settings);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("Failed to fetch entries!")
    }
}

