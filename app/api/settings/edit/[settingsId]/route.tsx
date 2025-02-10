import { UserSettings } from "@/lib/models";
import { UserSettingsType } from "@/lib/types";
import { connectToDb } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, {params}: {params: Promise<{settingsId: UserSettingsType}>}) => {

    const {settingsId} = await params;
    const newSettings = await request.json();

    console.log(newSettings, " request")

    try {
        connectToDb();
 
        const updatedSettings = await UserSettings.findByIdAndUpdate(
            settingsId,
            newSettings,
            {new: true, runValidators: true}
        )

        if (!updatedSettings) {
            return new Response(JSON.stringify({ error: "Request body cannot be empty" }), { status: 400 });
        }
        revalidatePath("/")
        return NextResponse.json(newSettings);
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Something went wrong during updating the settings" }), { status: 400 });
    }
}