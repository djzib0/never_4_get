import { UserSettings } from "@/lib/models";
import { UserSettingsType } from "@/lib/types";
import { connectToDb } from "@/lib/utils";
import { NextApiRequest } from "next";

export const PUT = async (request: NextApiRequest, {params}: {params: Promise<{settings: UserSettingsType}>}) => {

    const {settings} = await params;

    console.log(request, " request")

    // try {
    //     connectToDb();
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const updatedSettings = UserSettings.findByIdAndUpdate(
    //         settings._id,
    //         settings,
    //         {new: true, runValidators: true}
    //     )
        
    // } catch (error) {
    //     console.log(error)
    //     return {error: "Something went wrong during updating the settings"}
    // }
}