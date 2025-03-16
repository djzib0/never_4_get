import { EntryPosition } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, {params}: {params: Promise<{positionId: string}>}) => {
    'use client'
    const {positionId} = await params;
    const newProperties = await request.json();

    try {
        connectToDb();
        const positionToUpdate = await EntryPosition.findById(newProperties.positionId)

        const updatedEntryPosition = await EntryPosition.findByIdAndUpdate(
            positionId,
            newProperties,
            {new: true, runValidators: true}
        )

        if (!updatedEntryPosition) {
            return new Response(JSON.stringify({ error: "Request body cannot be empty" }), { status: 400 });
        }

        
        return NextResponse.json(positionToUpdate);

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Something went wrong during updating the entry position" }), { status: 400 });
    }
}