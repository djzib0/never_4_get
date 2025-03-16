import { Entry } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, {params}: {params: Promise<{entryId: string}>}) => {
    'use client'
    const {entryId} = await params;
    const newProperties = await request.json();

    try {
        connectToDb();
        const entryToUpdate = await Entry.findById(newProperties.entryId)
    
        const updatedEntry = await Entry.findByIdAndUpdate(
            entryId,
            newProperties,
            {new: true, runValidators: true}
        )

        if (!updatedEntry) {
            return new Response(JSON.stringify({ error: "Request body cannot be empty" }), { status: 400 });
        }

        revalidatePath(`entries/${entryId}`)
        return NextResponse.json(entryToUpdate);

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Something went wrong during updating the entry" }), { status: 400 });
    }
}