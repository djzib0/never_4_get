import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema(
    {
        isDarkModeOn: {
            type: Boolean,
            required: true,
            default: false,
        },
        imgUrl: {
            type: String,
            default: ""
        },
    }
)

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 20
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 6
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        settings: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserSettings"
        },
    },
    {timestamps: true}
)

const entryPositionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 1,
            max: 50,
            trim: true,
        },
        isFinished: {
            type: Boolean,
            default: false,
        },
        note: {
            type: String,
            min: 3,
            max: 100,
            default: "",
            trim: true,
        }
    },
    {timestamps: true}
)

const entryCommentSchema = mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
            min: 3,
            max: 300,
            trim: true,
        }
    },
    {timestamps: true}
)

const entrySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            min: 6,
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isFavorite: {
            type: Boolean,
            required: true,
            default: false,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: false
        },
        positions: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "EntryPosition"
                }
            ]
        },
        comments: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "EntryComment"
                }
            ]
        }
    },
    {timestamps: true}
) 

// middleware to clean up related positions and comment of deleted entry
entrySchema.pre("findOneAndDelete", async function (next) {
    const entry = await this.model.findOne(this.getQuery());

    if (entry) {
        await Promise.all([
            mongoose.model("EntryPosition").deleteMany({_id: { $in: entry.positions}}),
            mongoose.model("EntryComment").deleteMany({_id: { $in: entry.comments}}),

        ])
    }
        
    next();
})

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const UserSettings = mongoose.models?.UserSettings || mongoose.model("UserSettings", userSettingsSchema);
export const Entry = mongoose.models?.Entry || mongoose.model("Entry", entrySchema)
export const EntryPosition = mongoose.models?.EntryPosition || mongoose.model("EntryPosition", entryPositionSchema)
export const EntryComment = mongoose.models?.EntryComment || mongoose.model("EntryComment", entryCommentSchema)