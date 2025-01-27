import mongoose from "mongoose";

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
        img: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)

const entryPositionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 1,
            max: 50
        }
    }
)

const entrySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            min: 6,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isFavourite: {
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
        }
    },
    {timestamps: true}
)

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Entry = mongoose.models?.Entry || mongoose.model("Entry", entrySchema)
export const EntryPosition = mongoose.models?.EntryPosition || mongoose.model("EntryPosition", entryPositionSchema)